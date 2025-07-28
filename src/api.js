import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDocs,
	getDoc,
	query,
	where
} from "firebase/firestore";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCZeKjTi8u9XfZuF9u6T9Y9eRPsjSWK5mQ",
	authDomain: "vanlife-e974c.firebaseapp.com",
	projectId: "vanlife-e974c",
	storageBucket: "vanlife-e974c.firebasestorage.app",
	messagingSenderId: "362701924968",
	appId: "1:362701924968:web:ad25a298badc03f699a9dd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

// Seed function to import your data (run this once)
export async function seedDatabase() {
	const vans = [
		{ id: "1", name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" },
		{ id: "2", name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" },
		{ id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "123" },
		{ id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "123" },
		{ id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "123" },
		{ id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" }
	];

	const user = {
		id: "123",
		email: "b@b.com",
		password: "p123",
		name: "Bob"
	};

	try {
		// Add vans to Firestore
		for (const van of vans) {
			await setDoc(doc(db, "vans", van.id), van);
			console.log(`Van ${van.id} added successfully`);
		}

		// Add user to Firestore
		await setDoc(doc(db, "users", user.id), user);
		console.log("User added successfully");

		return "Database seeded successfully!";
	} catch (e) {
		console.error("Error adding document: ", e);
		throw e;
	}
}

// Get all vans or a specific van by ID
export async function getVans(id) {
	try {
		if (id) {
			// Get specific van
			const vanDoc = await getDoc(doc(db, "vans", id));
			if (vanDoc.exists()) {
				return { id: vanDoc.id, ...vanDoc.data() };
			} else {
				throw {
					message: "Van not found",
					status: 404
				};
			}
		} else {
			// Get all vans
			const querySnapshot = await getDocs(collection(db, "vans"));
			const vans = [];
			querySnapshot.forEach((doc) => {
				vans.push({ id: doc.id, ...doc.data() });
			});
			return vans;
		}
	} catch (error) {
		throw {
			message: "Failed to fetch vans",
			status: error.status || 500
		};
	}
}

// Get host vans (filtered by hostId)
export async function getHostVans(id) {
	try {
		if (id) {
			// Get specific host van
			const vanDoc = await getDoc(doc(db, "vans", id));
			if (vanDoc.exists()) {
				const vanData = { id: vanDoc.id, ...vanDoc.data() };
				// Check if this van belongs to the host
				if (vanData.hostId === "123") {
					return vanData;
				} else {
					throw {
						message: "Van not found or not owned by host",
						status: 404
					};
				}
			} else {
				throw {
					message: "Van not found",
					status: 404
				};
			}
		} else {
			// Get all vans for specific host
			const q = query(collection(db, "vans"), where("hostId", "==", "123"));
			const querySnapshot = await getDocs(q);
			const vans = [];
			querySnapshot.forEach((doc) => {
				vans.push({ id: doc.id, ...doc.data() });
			});
			return vans;
		}
	} catch (error) {
		throw {
			message: "Failed to fetch host vans",
			status: error.status || 500
		};
	}
}

// Login user
export async function loginUser(creds) {
	try {
		const { email, password } = creds;

		// Get all users and find the one with matching email and password
		const usersSnapshot = await getDocs(collection(db, "users"));
		let foundUser = null;

		usersSnapshot.forEach((doc) => {
			const userData = doc.data();
			if (userData.email === email && userData.password === password) {
				foundUser = { id: doc.id, ...userData };
			}
		});

		if (!foundUser) {
			throw {
				message: "No user with those credentials found!",
				status: 401
			};
		}

		// Don't send password back to client
		const { password: _, ...userWithoutPassword } = foundUser;

		return {
			user: userWithoutPassword,
			token: "Enjoy your pizza, here's your tokens."
		};
	} catch (error) {
		throw {
			message: error.message || "Login failed",
			status: error.status || 500
		};
	}
}
