import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { user } = useAuthContext();
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={user ? <Home /> : <Navigate to="/lol" />} />
					<Route path="/signup" element={!user ? <Login /> : <Navigate to="/" />} />
					<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

