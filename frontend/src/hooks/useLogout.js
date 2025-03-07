import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: WorkoutDispatch } = useWorkoutsContext();

	const logout = () => {
		localStorage.setItem("user");

		dispatch({ type: "LOGOUT" });
		WorkoutDispatch({ type: "SET_WORKOUTS", payload: null });
	};
	return { logout };
};
