const imageMap = {
	0: require("../images/others/no-profile-man.png"),
	1: require("../images/profiles/1.jpeg"),
	2: require("../images/profiles/2.jpeg"),
	3: require("../images/profiles/3.jpeg"),
	4: require("../images/profiles/4.jpeg"),
	5: require("../images/profiles/5.jpeg"),
	6: require("../images/profiles/6.jpeg"),
	7: require("../images/profiles/7.jpeg"),
	8: require("../images/profiles/8.jpeg"),
	9: require("../images/profiles/9.jpeg"),
	10: require("../images/profiles/10.jpeg"),
	11: require("../images/profiles/11.jpeg"),
	12: require("../images/profiles/12.jpeg"),
	13: require("../images/profiles/13.jpeg"),
	14: require("../images/profiles/14.jpeg"),
	15: require("../images/profiles/15.jpeg"),
	16: require("../images/profiles/16.jpeg"),
	17: require("../images/profiles/17.jpeg"),
	18: require("../images/profiles/18.jpeg"),
	19: require("../images/profiles/19.jpeg"),
	20: require("../images/profiles/20.jpeg"),
	21: require("../images/profiles/21.jpeg"),
	22: require("../images/profiles/22.jpeg"),
	23: require("../images/profiles/23.jpeg"),
	24: require("../images/profiles/24.jpeg"),
	25: require("../images/profiles/25.jpeg"),
	26: require("../images/profiles/26.jpeg"),
	27: require("../images/profiles/27.jpeg"),
	28: require("../images/profiles/28.jpeg"),
	29: require("../images/profiles/29.jpeg"),
	30: require("../images/profiles/30.jpeg"),
	31: require("../images/profiles/31.jpeg"),
	32: require("../images/profiles/32.jpeg"),
	33: require("../images/profiles/33.jpeg"),
	34: require("../images/profiles/34.jpeg"),
	35: require("../images/profiles/35.jpeg"),
	36: require("../images/profiles/36.jpeg"),
	37: require("../images/profiles/37.jpeg"),
	38: require("../images/profiles/38.jpeg"),
	39: require("../images/profiles/39.jpeg"),
	40: require("../images/profiles/40.jpeg"),
	41: require("../images/profiles/41.jpeg"),
	42: require("../images/profiles/42.jpeg"),
	43: require("../images/profiles/43.jpeg"),
	44: require("../images/profiles/44.jpeg"),
	45: require("../images/profiles/45.jpeg"),
	46: require("../images/profiles/46.jpeg"),
	47: require("../images/profiles/47.jpeg"),
	48: require("../images/profiles/48.jpeg"),
	49: require("../images/profiles/49.jpeg"),
	50: require("../images/profiles/50.jpeg"),
};

// const addILike = () => {
// 	useEffect(() => {

// 		const updateUser = async (userId) => {
// 			let iLikeList = [];

// 			const array = [...iLike];
// 			for (let i = 0; i < 5; i++) {
// 				let randomIndex = Math.floor(Math.random() * array.length);
// 				console.log("randomIndex", randomIndex);
// 				let randomElement = array.splice(randomIndex, 1)[0];
// 				iLikeList.push(randomElement);
// 			}

// 			if (iLikeList.length === 5) {
// 				console.log("iLikeList", iLikeList);
// 				try {
// 					await supabase
// 						.from("profiles")
// 						.update({ ilike: iLikeList })
// 						.eq("id", userId);
// 				} catch (error) {
// 					alert("Erreur lors de la mise à jour des users !");
// 					console.log("error", error);
// 				}
// 			}
// 		};

// 		const fetchUsers = async () => {
// 			try {
// 				const { data } = await supabase
// 					.from("profiles")
// 					.select("id")
// 					.eq("gender", "woman");

// 				if (!!data) {
// 					for (let i = 0; i < data.length; i++) {
// 						await updateUser(data[i].id);
// 					}
// 					console.log("data", data);
// 				}
// 			} catch (error) {
// 				alert("Erreur lors du fetch des users !");
// 				console.log("error", error);
// 			}
// 		};

// 		// eslint-disable-next-line no-unused-expressions
// 		fetchUsers();

// 	}, [])
// };

function getCookie(name) {
	if (document.cookie.length === 0) return null;

	const regCookie = new RegExp("(; )", "g");
	const cookies = document.cookie.split(regCookie);

	for (var i = 0; i < cookies.length; i++) {
		const regInfo = new RegExp("=", "g");
		const infos = cookies[i].split(regInfo);
		if (infos[0] === name) {
			return decodeURI(infos[1]);
		}
	}
	return null;
}

// amount: coins
const coinsMap = new Map();

coinsMap.set(500, 200);
coinsMap.set(1000, 500);
coinsMap.set(2000, 1500);
coinsMap.set(5000, 6000);

const welcomeMessages = [
	"Bonjour mon chou ça va ?",
	"Salut, je recherche un mec pour me satisfaire, c'est quoi ton prénom préféré ?",
	"Hey, ça va ?",
	"Tu me laisserais une chance d'essayer de te surprendre ou je suis pas du tout le genre de personne avec qui tu veux échanger ?",
	"Coucou, tu te portes bien ?",
	"Salut, tu cherches quoi sur ce site ? Moi j'avoue que j'ai fait quelques rencontres mais rien qui me plait vraiment pour le moment.",
	"Coucou, qu'est-ce que tu fais en ce moment ? Je pense que tu recherches toujours, non?",
	"Salut chéri, tu cherches aussi un coup d'un soir ?",
	"Coucou et si on faisait connaissance",
	"Dis moi, tu es célibataire ?",
	"Hello, comment est ce que tu vas? ",
	"Salut, tu recherches une personne de quelle tranche d'âge ?",
	"Coucou, je me permets de t'écrire, je pense que nous voulons tous les deux la même chose. Que dirais-tu de faire connaissance ?",
	"Hey, tu vas bien ?",
	"Salut ! Tu vas bien? Tu cherches quoi comme relation sur le site? ",
	"Saaluut, tu as un peu de temps?",
	"On dit qu'il faut parfois savoir saisir sa chance, alors je me lance. Tu es libre ce soir ?",
	"Je fais le premier pas, je te laisse jeter un oeil à mon profil et me dire ce que tu en penses... j'attends.",
	"Salut, tout est ok pour toi ?",
	"Bonjour, est-ce que tout va bien ?",
	"Coucou ça va ? Tu cherches une partenaire uniquement pour quelque chose de coquin? Tu veux rompre ton stress quotidien, c'est ça?",
	"Je peux voir que tu es en ligne aussi, si le cœur t'en dit, on papote un petit peu et on fait connaissance de suite ? 🙃",
	"Qu'est-ce que tu fais en ce moment? Partant pour faire connaissance ?",
	"Salut ! Comment est-ce que tu vas?Je vois que tu es nouveau ici, est-ce que cela te dérange de présenter un petit peu et pourquoi pas me dire ce que tu cherches ici? 🥰",
	"Salut, je recherche un mec pour me satisfaire, c'est quoi ton prénom préféré ?",
	"Bonjour, comment vas-tu ?",
	"Coucou, tu te portes bien ?",
	"Salut chéri, tu cherches aussi un coup d'un soir ?",
	"Coucou, ça va bien ?",
	"Hello, y a la forme ?",
	"Dis moi, tu es célibataire ?",
	"Coucou le mysterieux, comment tu t'appelles ?",
	"Hey, tu vas bien ?",
	"Bonjour mon chou ça va ?",
	"Salut, comment s'est passée ta matinée ?",
	"Hey, tu vas bien ?",
	"Salut, tout est ok pour toi ?",
	"Bonjour, est-ce que tout va bien ?",
];

export { imageMap, coinsMap, welcomeMessages, getCookie };
