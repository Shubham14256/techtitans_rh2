async function createWorkout(req, res) {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}