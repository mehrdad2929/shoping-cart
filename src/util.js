import { redirect } from "react-router"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    //TODO:use fakeapi auth
    const isLoggedIn = locallocalStorage.getItem("loggedin") === "true" || false

    if (!isLoggedIn) {
        const response = redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
        // response.body = true
        throw response
    }
}

// Auth utilities (normally would use locallocalStorage directly)
export const AuthManager = {
    login: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isLoggedIn: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
};

// Cart utilities
export const CartManager = {
    saveCart: (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
    },

    loadCart: () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },

    clearCart: () => {
        localStorage.removeItem('cart');
    }
};

export async function getProducts(id) {
    const url = id ? `https://fakestoreapi.com/products/${id}` : 'https://fakestoreapi.com/products';
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch products",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function getHostProducts(id) {
    const url = id ? "https://fakestoreapi.com/products/${id}" : 'https://fakestoreapi.com/products';
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch products",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
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
