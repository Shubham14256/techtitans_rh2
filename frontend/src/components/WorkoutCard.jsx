import { useState } from "react";
import { Paper } from "@mui/material";
import DustBin from "@mui/icons-material/DeleteOutline";
import EditForm from "./EditForm";
import EditIcon from "@mui/icons-material/EditOutlined";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseURL } from "../url";

const capitalizeFirstLetter = (string) => {
	if (!string) return "";
	return string.charAt(0).toUpperCase() + string.slice(1);
};

function WorkoutCard({ workout }) {
	const [isEditFormVisible, setIsEditFormVisible] = useState(false);

	const { dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	const handleClick = async () => {
		if (!user || !user.token) {
			return;
		}

		const response = await fetch(`${baseURL}/api/workouts/${workout._id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		const data = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: data.workout });
		}
	};

	const handleEdit = () => {
		setIsEditFormVisible((prev) => !prev);
	};

	return (
		<>
			<div className="lg:hover:translate-x-5 transition-all duration-300  lg:ml-32 ">
				<Paper className="my-4 py-2 px-4 w-3/4 mx-auto lg:w-full " elevation={3} sx={{ borderRadius: "4px" }}>
					<div className="flex flex-row justify-between">
						<div>
							<p className="font-bold mb-4 text-2xl">{capitalizeFirstLetter(workout.title)}</p>
							<p className="font-light mb-1 text-lg">Reps: {workout.reps}</p>
							<p className="font-light text-lg">Load: {workout.load}kg</p>
						</div>
						<div>
							<button onClick={handleEdit}>
								<EditIcon sx={{ display: { xs: "flex", md: "flex" }, mt: 0.5, ml: 0.5 }} />
							</button>
							<button onClick={handleClick}>
								<DustBin sx={{ display: { xs: "flex", md: "flex" }, mt: 0.5, ml: 0.5 }} />
							</button>
						</div>
					</div>
				</Paper>
				{isEditFormVisible && (
					<div
						className={`lg:hover:translate-x-5 transition-all duration-300 ${
							isEditFormVisible ? "opacity-100" : "opacity-0"
						} w-3/4 mx-auto lg:w-full`}
					>
						<Paper elevation={3} sx={{ borderRadius: "4px" }}>
							<EditForm workout={workout} setIsEditFormVisible={setIsEditFormVisible} />
						</Paper>
					</div>
				)}
			</div>
		</>
	);
}

export default WorkoutCard;
