import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Logo from "@mui/icons-material/FitnessCenter"
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				outlined: {
					color: "white",
					borderColor: "white",
					"&:hover": {
						backgroundColor: "white",
						color: "black",
						borderColor: "white",
					},
				},
			},
		},
	},
})

function ResponsiveAppBar() {
	const { logout } = useLogout()
	const { user } = useAuthContext()

	const handleClick = () => {
		logout()
	}

	return (
		<AppBar position="sticky" sx={{ bgcolor: "black" }}>
			<Toolbar disableGutters>
				<Logo sx={{ display: { xs: "none", md: "flex" }, mr: 2, ml: 2 }} />
				<Link to="/" style={{ textDecoration: "none" }}>
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
						}}
					>
						EasyFit
					</Typography>
				</Link>

				<Logo sx={{ display: { xs: "flex", md: "none" }, mr: 1, ml: 1 }} />
				<Typography
					variant="h5"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: "flex", md: "none" },
						flexGrow: 1,
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					EasyFit
				</Typography>
				<Box sx={{ flexGrow: 1 }} />

				<ThemeProvider theme={theme}>
					{!user ? (
						<Button
							type="submit"
							variant="outlined"
							sx={{
								mr: 2,
								borderRadius: "24px",
								fontSize: { xs: "0.8rem", sm: "1rem" },
								padding: { xs: "6px 8px", sm: "6px 12px" },
							}}
							onClick={handleClick}
						>
							Logout
						</Button>
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								gap: 2,
								alignItems: "center",
							}}
						>
							<Link to="/login" style={{ textDecoration: "none" }}>
								<Button
									type="submit"
									sx={{
										color: "white",
										"&:hover": {
											backgroundColor: "white",
											color: "black",
										},

										borderRadius: "24px",
										fontSize: { xs: "0.8rem", sm: "1rem" },
										padding: { xs: "8px 8px", sm: "8px 12px" },
									}}
								>
									Login
								</Button>
							</Link>
							<Link to="/signup" style={{ textDecoration: "none" }}>
								<Button
									type="submit"
									variant="outlined"
									sx={{
										mr: 2,
										borderRadius: "24px",
										fontSize: { xs: "0.8rem", sm: "1rem" },
										padding: { xs: "6px 8px", sm: "6px 12px" },
									}}
								>
									Sign Up
								</Button>
							</Link>
						</Box>
					)}
				</ThemeProvider>
			</Toolbar>
		</AppBar>
	)
}

export default ResponsiveAppBar
