import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { useSignup } from "../hooks/useSignup";

const theme = createTheme({
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						color: "black",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				outlined: {
					color: "black",
					borderColor: "black",
					"&:hover": {
						backgroundColor: "black",
						color: "white",
						borderColor: "white",
					},
				},
			},
		},
	},
});

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { error, isLoading, signup } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(email, password);
	};

	return (
		<div className="flex flex-grow justify-center h-screen my-24 ">
			<ThemeProvider theme={theme}>
				<Paper className="max-md:w-3/4 md:w-[500px] h-[400px] bg-white p-4" elevation={3} sx={{ borderRadius: "8px" }}>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col mt-3">
							<Typography variant="h4">
								<Box sx={{ fontStyle: "italic", mb: 2 }}>Sign Up</Box>
							</Typography>
							<TextField
								label="Email"
								variant="outlined"
								sx={{ my: 2 }}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								value={email}
							/>
							<TextField
								label="Password"
								variant="outlined"
								type="password"
								sx={{ mt: 2, mb: 4 }}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								value={password}
							/>
						</div>
						<Button type="submit" variant="outlined" disabled={isLoading}>
							Sign Up
						</Button>
						{error && (
							<div className="mt-4">
								<Alert variant="outlined" severity="error">
									{error}
								</Alert>
							</div>
						)}
					</form>
				</Paper>
			</ThemeProvider>
		</div>
	);
}

export default Signup;
