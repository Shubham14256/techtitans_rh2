import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		// Validate the user object
		if (user && typeof user === 'object' && user !== null) {
			dispatch({ type: "LOGIN", payload: user });
		}
	}, []);

	console.log("Auth context state:", state);

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

