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

<ThemeProvider theme={theme}>
    {user ? ( // Change made here
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
