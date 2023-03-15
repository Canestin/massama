import { useState, useEffect } from "react";
import supabase from "./supabase";

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = (props) => {
	const [channels, setChannels] = useState([]);
	const [messages, setMessages] = useState([]);
	const [users] = useState(new Map());
	const [newMessage, setNewMessage] = useState(null);
	const [newChannel, setNewChannel] = useState(null);
	const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null);
	const [deletedChannel, handleDeletedChannel] = useState(null);

	const loggedUserId = localStorage.getItem("userId");

	// Load initial data and set up listeners
	useEffect(() => {
		// Get Channels
		fetchChannels(loggedUserId, setChannels);

		// Listen for new messages
		const messageListener = supabase
			.channel("public:messages")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				(payload) => setNewMessage(payload.new)
			)
			.subscribe();

		// Listen for changes to our users
		const userListener = supabase
			.channel("public:users")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "users" },
				(payload) => handleNewOrUpdatedUser(payload.new)
			)
			.subscribe();

		// Listen for new and deleted channels
		const channelListener = supabase
			.channel("public:channels")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "channels" },
				(payload) => setNewChannel(payload.new)
			)
			.on(
				"postgres_changes",
				{ event: "DELETE", schema: "public", table: "channels" },
				(payload) => handleDeletedChannel(payload.old)
			)
			.subscribe();
		// Cleanup on unmount
		return () => {
			supabase.removeChannel(messageListener);
			supabase.removeChannel(userListener);
			supabase.removeChannel(channelListener);
		};
	}, []);

	// Update when the route changes
	useEffect(() => {
		if (!!props?.channelId) {
			// fetchMessages(props.channelId, (messages) => {
			// 	messages.forEach((x) => users.set(x.user_id, x.author));
			// 	setMessages(messages);
			// 	alert("messages " + messages)
			// });
			fetchMessages(props.channelId, setMessages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.channelId]);

	// New message received from Postgres
	useEffect(() => {
		// if (newMessage && newMessage.channel_id === Number(props.channelId)) {
		// 	const handleAsync = async () => {
		// 		let authorId = newMessage.user_id;
		// 		if (!users.get(authorId))
		// 			await fetchUserById(authorId, (user) => handleNewOrUpdatedUser(user));
		// 		setMessages(messages.concat(newMessage));
		// 	};
		// 	handleAsync();
		// }

		if (!!props?.channelId) {
			// fetchMessages(props.channelId, (messages) => {
			// 	messages.forEach((x) => users.set(x.user_id, x.author));
			// 	setMessages(messages);
			// 	alert("messages " + messages)
			// });
			fetchMessages(props.channelId, setMessages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMessage]);

	// New channel received from Postgres
	useEffect(() => {
		if (newChannel) setChannels(channels.concat(newChannel));
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

	// New or updated user received from Postgres
	useEffect(() => {
		if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newOrUpdatedUser]);

	return {
		// We can export computed values here to map the authors to each message
		// messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
		messages: messages,
		channels:
			channels !== null
				? channels.sort((a, b) => a.slug.localeCompare(b.slug))
				: [],
		users,
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
export const fetchChannels = async (userId, setState) => {
	try {
		let { data } = await supabase
			.from("channels")
			.select(
				`user1(id, username, avatar, city, age), user2(id, username, avatar, city, age)`
			)
			.overlaps("users", [userId]);
		if (setState) setState(data);
		// return data;
	} catch (error) {
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
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * Fetch a single user - OKAY -
 * @param {string} username
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserByUsername = async (username, setState) => {
	try {
		let { data } = await supabase
			.from("profiles")
			.select(`*`)
			.eq("username", username)
			.single();
		if (setState) setState(data);
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
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (channelId, setState) => {
	try {
		let { data } = await supabase
			.from("messages")
			.select(`*, author:author_id(*)`)
			.eq("channel_id", 1)
			.order("created_at", true);
		if (setState) setState(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};
/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
export const addChannel = async (userId1, userId2) => {
	try {
		let { data } = await supabase
			.from("channels")
			.insert([{ users: [userId1, userId2] }])
			.select();
		// console.log("channels de chez channels", data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (message, channel_id, author_id) => {
	console.log("Infos avant envoi ::: ");
	console.log("message : ", message);
	console.log("channel_id : ", channel_id);
	console.log("author_id : ", author_id);
	try {
		let { data } = await supabase
			.from("messages")
			.insert([{ message, channel_id: 1, author_id }])
			.select()
			.single();
		// return data;
		console.log("New message sent : ", data);
	} catch (error) {
		console.log("error", error);
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
