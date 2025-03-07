import React, { useState } from "react"
import { Typography } from "@mui/material"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { createTheme, ThemeProvider } from "@mui/material/styles"
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

function EditForm({ workout, setIsEditFormVisible }) {
	const [title, setTitle] = useState(workout.title)
	const [reps, setReps] = useState(workout.reps)
	const [load, setLoad] = useState(workout.load)
	const [error, setError] = useState("")
	const [isEmpty, setIsEmpty] = useState(false)

	const { dispatch } = useWorkoutsContext()
	const { user } = useAuthContext()

	const handleSubmit = async (e) => {
		if (1) {
			return
		}

		e.preventDefault()
		if (!user || !user.token) {
			setError("You must be logged in first")
			return
		}

		const SubmitWorkout = { title, reps, load }

		if (!title || !reps || !load) {
			setIsEmpty(true)
			return
		}
		console.log(SubmitWorkout)
		const response = await fetch(`${baseURL}/api/workouts/${workout._id}`, {
			method: "PATCH",
			body: JSON.stringify(SubmitWorkout),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		})

		const data = await response.json()

		if (!response.ok) {
			setError(data.err.message)
		}

		console.log(data.workout)
		if (response.ok) {
			dispatch({ type: "EDIT_WORKOUT", payload: data.workout })

			setTitle("")
			setLoad("")
			setReps("")
			setError(null)
			setIsEmpty(false)
			setIsEditFormVisible(false)
			console.log("workout edited")
		}
	}

	return (
		<div className="bg-white w-full h-[500px] rounded-md p-4">
			<ThemeProvider theme={theme}>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col my-">
						<Typography variant="h4">
							<Box sx={{ fontStyle: "italic", mb: 2 }}>Edit Workout</Box>
						</Typography>
						<TextField
							id="outlined-basic"
							label="Exercise"
							variant="outlined"
							sx={{ my: 2 }}
							onChange={(e) => {
								setTitle(e.target.value)
							}}
							value={title}
							error={isEmpty && !title}
						/>
						<TextField
							id="outlined-basic"
							label="Reps"
							variant="outlined"
							type="number"
							sx={{ my: 2 }}
							onChange={(e) => {
								setReps(e.target.value)
							}}
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
							onChange={(e) => {
								setLoad(e.target.value)
							}}
							value={load}
							error={isEmpty && !load}
						/>
					</div>
					<Button type="submit" variant="outlined">
						Add Workout
					</Button>
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
								You must be logged in first
							</Alert>
						</div>
					)}
				</form>
			</ThemeProvider>
		</div>
	)
}

export default EditForm
