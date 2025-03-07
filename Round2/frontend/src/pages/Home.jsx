import { useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutCard from "../components/WorkoutCard";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseURL } from "../url";

function Home() {
	const { workouts, dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await fetch(`${baseURL}/api/workouts`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});

				if (!response.ok) {
					if (response.status === 401) {
						throw new Error("Unauthorized: Invalid token or user session has expired");
					} else {
						throw new Error(`Error: ${response.status}`);
					}
				}

				const data = await response.json();

				dispatch({ type: "SET_WORKOUTS", payload: data.workouts });
			} catch (err) {
				console.error("Error fetching workouts:", err);
			}
		};
		if (!user || !user.token) {
			return;
		}

		fetchWorkouts();
	}, [user, dispatch]);

	return (
		<div className="lg:w-screen lg:flex lg:flex-row lg:justify-between">
			<div className="lg:flex lg:flex-col lg:w-1/2">
				<Typography variant="h4">
					<Box sx={{ fontStyle: "italic", mt: 4, ml: [0, 16], textAlign: ["center", "left"] }}>Workouts</Box>
				</Typography>
				{workouts && workouts.length > 0 ? (
					workouts.map((workout) => <WorkoutCard key={workout._id} workout={workout} />)
				) : (
					<Typography
						variant="h5"
						sx={{
							fontStyle: "italic",
							mt: 4,
							ml: [0, 16],
							textAlign: ["center", "left"],
						}}
					>
						No workouts available
					</Typography>
				)}
			</div>
			<div className="lg:w-1/3 lg:mr-32 ">
				<WorkoutForm />
			</div>
		</div>
	);
}

export default Home;
