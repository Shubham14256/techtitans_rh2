import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { baseURL } from "../url"

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
})

function WorkoutForm() {
	const [title, setTitle] = useState("")
	const [reps, setReps] = useState("")
	const [load, setLoad] = useState("")
	const [error, setError] = useState("")
	const [isEmpty, setIsEmpty] = useState(true)

	const { dispatch } = useWorkoutsContext()
	const { user } = useAuthContext()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!user || !user.token) {
			setError("You must be logged in first")
			return
		}

		const workout = { title, reps, load }

		if (!title || !reps || !load) {
			setIsEmpty(true)
		}

		const response = await fetch(`${baseURL}/api/workouts`, {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
			},
		})

		const data = await response.json()

		if (!response.ok) {
			// setError(data.err.message);
			return
		}

		if (response.ok) {
			dispatch({ type: "CREATE_WORKOUT", payload: data.workout })
			// Reset form fields
			setTitle("")
			setLoad("")
			setReps("")
			setError(null)
			setIsEmpty(false)
			console.log("New workout added")
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<form onSubmit={handleSubmit}>
				<Box className="flex flex-col my-8 max-lg:w-3/4 max-lg:mx-auto">
					<Typography variant="h4">
						<Box sx={{ fontStyle: "italic" }}>Add Workout</Box>
					</Typography>
					<TextField
						id="outlined-basic"
						label="Exercise"
						variant="outlined"
						sx={{ my: 2 }}
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						error={isEmpty && !title}
					/>
					<TextField
						id="outlined-basic"
						label="Reps"
						variant="outlined"
						type="number"
						sx={{ my: 2 }}
						onChange={(e) => setReps(e.target.value)}
						value={reps}
						error={isEmpty && !reps}
					/>
					<TextField
						id="outlined-basic"
						label="Load"
						variant="outlined"
						type="number"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">kg</InputAdornment>
							),
						}}
						sx={{ my: 2 }}
						onChange={(e) => setLoad(e.target.value)}
						value={load}
						error={isEmpty && !load}
					/>
					<Buton
						type="submit"
						variant="outlined"
						sx={{ my: 2, alignSelf: "flex-start" }}
					>
						Add Workout
					</Buton>

					{isEmpty && (
						<div className="mt-4">
							<Alert variant="outlined" severity="error">
								Please fill in all the details
							</Alert>
						</div>
					)}
					{error && (
						<div className="mt-4">
							<Alert variant="outlined" severity="error">
								{error}
							</Alert>
						</div>
					)}
				</Box>
			</form>
		</ThemeProvider>
	)
}

export default WorkoutForm
