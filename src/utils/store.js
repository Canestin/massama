import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import supabase from "./supabase";

const loggedUserId = localStorage.getItem("userId");

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = (props) => {
	const [channels, setChannels] = useState([]);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState(null);
	const [newChannel, setNewChannel] = useState(null);
	const [deletedChannel, handleDeletedChannel] = useState(null);

	const location = useLocation();

	// Load initial data and set up listeners
	useEffect(() => {
		// Get All Channels
		fetchChannels(setChannels);

		// Listen for new messages
		const messageListener = supabase
			.channel("public:messages")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					filter: `receiver_id=eq.${loggedUserId}`,
					table: "messages",
				},

				(payload) => setNewMessage(payload.new)
			)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					filter: `sender_id=eq.${loggedUserId}`,
					table: "messages",
				},
				(payload) => setNewMessage(payload.new)
			)
			.subscribe();

		// Listen for new and deleted channels
		const channelListener = supabase
			.channel("public:channels")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					filter: `user1=eq.${loggedUserId}`,
					table: "channels",
				},
				(payload) => {
					if (payload.eventType === "INSERT") {
						const channelInfos = getChannelsInfos([payload.new])[0];
						setNewChannel(channelInfos);
					} else if (payload.eventType === "UPDATE") {
						const updatedChannels = channels.sort(function (a, b) {
							return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
						});
						setChannels(updatedChannels);
					}
				}
			)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					filter: `user2=eq.${loggedUserId}`,
					table: "channels",
				},
				(payload) => {
					handeChannelsChanges(
						payload,
						location.state,
						setNewChannel,
						setChannels
					);
				}
			)
			// .on(
			// 	"postgres_changes",
			// 	{ event: "DELETE", schema: "public", table: "channels" },
			// 	(payload) => handleDeletedChannel(payload.old)
			// )
			.subscribe();

		return () => {
			supabase.removeChannel(messageListener);
			supabase.removeChannel(channelListener);
		};
	}, []);

	useEffect(() => {
		if (props?.channelId === "new-channel") {
			const existingChannel = channels.find(
				(channel) => channel.speaker.id === location.state.id
			);

			if (existingChannel) fetchMessages(existingChannel.id, setMessages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channels]);

	// Update when the route changes
	useEffect(() => {
		if (!!props?.channelId && props?.channelId !== "new-channel") {
			fetchMessages(props.channelId, setMessages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props?.channelId]);

	// New message received from Postgres
	useEffect(() => {
		if (!!props?.channelId && !!newMessage) {
			setMessages(messages.concat(newMessage));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMessage]);

	// New channel received from Postgres
	useEffect(() => {
		if (newChannel) {
			setChannels([newChannel].concat(channels));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newChannel]);

	// Deleted channel received from postgres
	useEffect(() => {
		if (deletedChannel)
			setChannels(
				channels.filter((channel) => channel.id !== deletedChannel.id)
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deletedChannel]);

	return {
		messages,
		channels:
			channels !== null
				? channels.sort(
						(a, b) =>
							new Date(a.last_message_sent_at) -
							new Date(b.last_message_sent_at)
				  )
				: [],
	};
};

/**
 * Fetch all profiles - OKAY -
 */
export const fetchProfiles = async (setState) => {
	try {
		const { data: profiles } = await supabase
			.from("profiles")
			.select(`*`)
			.eq("gender", "woman");
		if (setState) setState(profiles);
	} catch (error) {
		console.log("error", error);
		return [];
	}
};

/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchChannels = async (setState) => {
	try {
		const { data } = await supabase
			.from("channels")
			.select("*, user1(*), user2(*)")
			.or(`user1.eq.${loggedUserId}, user2.eq.${loggedUserId}`)
			.order("last_message_sent_at", { ascending: false });

		const channels = getChannelsInfos(data);

		if (setState) setState(channels);
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * Update  channel when a message is sent
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const updateChannel = async (channel_id, last_message) => {
	try {
		await supabase
			.from("channels")
			.update({ last_message_sent_at: new Date(), last_message })
			.eq("id", channel_id);
	} catch (error) {
		alert("Erreur lors de la mise à jour du channel !");
		console.log("error", error);
	}
};

/**
 * Fetch a single user - OKAY -
 * @param {string} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserById = async (userId, setState) => {
	try {
		let { data } = await supabase
			.from("profiles")
			.select(`*`)
			.eq("id", userId)
			.single();
		if (setState) setState(data);
		else return data;
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * Fetch a single user - OKAY -
 * @param {string[]} channels
 * @param {string} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const getUserFromChannels = (channels, channelId, setState) => {
	if (!!channels && !!channelId) {
		const channel = channels.find((c) => c.id === channelId);
		setState(channel?.speaker);
	}
};

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (channelId, setState) => {
	try {
		let { data } = await supabase
			.from("messages")
			.select(`*`)
			.eq("channel_id", channelId)
			.order("sent_at", { ascending: true });

		if (setState) setState(data);
	} catch (error) {
		console.log("error", error);
	}
};
/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
export const addChannel = async (user1, last_message) => {
	try {
		const { data } = await supabase
			.from("channels")
			.insert([{ user1, user2: loggedUserId, last_message }])
			.select("id");
		return data[0].id;
	} catch (error) {
		alert("Erreur lors de la creation du channel !");
	}
};

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id The receiver
 * @param {number} author_id The author
 */
export const addMessage = async (
	content,
	sender_id,
	receiver_id,
	channel_id
) => {
	try {
		await supabase
			.from("messages")
			.insert([{ content, sender_id, receiver_id, channel_id }]);
	} catch (error) {
		alert("Erreur lors de l'envoi du message !");
	}
};

/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */
export const deleteChannel = async (channel_id) => {
	try {
		let { data } = await supabase
			.from("channels")
			.delete()
			.match({ id: channel_id });
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * Fetch all roles for the current user
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserRoles = async (setState) => {
	try {
		let { data } = await supabase.from("user_roles").select(`*`);
		if (setState) setState(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * Retrieve well-organized list of channels
 * @param {object[]} data Pass the list of confused channel objects
 */
export const getChannelsInfos = (data) => {
	return data.map((channel) => {
		return {
			id: channel.id,
			lastMessage: channel.last_message,
			lastMessageDate: channel.last_message_sent_at,
			speaker: getSpeaker("user1", "user2", channel),
		};
	});
};

export const handeChannelsChanges = (
	payload,
	speaker,
	setNewChannel,
	setChannels
) => {
	if (payload.eventType === "INSERT") {
		const newChannel = getChannelsInfos([payload.new])[0];
		setNewChannel({ ...newChannel, speaker });
	} else if (payload.eventType === "UPDATE") {
		const updatedChannel = getChannelsInfos([payload.new])[0];

		setChannels((channels) => {
			const updatedChannelUserInfos = channels.find(
				(c) => c.id === updatedChannel.id
			).speaker;
			const channelsWithoutUpdatedChannel = channels.filter(
				(c) => c.id !== updatedChannel.id
			);

			return [
				{ ...updatedChannel, speaker: updatedChannelUserInfos },
				...channelsWithoutUpdatedChannel,
			];
		});
	}
};

const getSpeaker = (column1, column2, object) => {
	const speaker = Object.values({
		user1: object[column1],
		user2: object[column2],
	}).find((user) => user.id !== loggedUserId);
	return speaker;
};
