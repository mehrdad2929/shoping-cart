import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "ADD_ITEM":
            return { ...state, [action.payload.id]: (state[action.payload.id] || 0) + 1 };
        case "REMOVE_ITEM":
            const copy = { ...state };
            if (copy[action.payload.id] > 1) {
                copy[action.payload.id]--;
            } else {
                delete copy[action.payload.id];
            }
            return copy;
        case "SET":
            return action.payload;
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, {}, () => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : {};
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        // This will trigger 'storage' event in other tabs
    }, [cart]);

    // Sync cart from other tabs
    useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem("cart");
            if (saved) {
                dispatch({ type: "SET", payload: JSON.parse(saved) });
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const addToCart = (id) => dispatch({ type: "ADD_ITEM", payload: { id } });
    const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
    const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const getProductCount = (id) => cart[id] ? cart[id] : 0;

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getProductCount, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook for easy access
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
