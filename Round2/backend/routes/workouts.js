const express = require("express");
const { createWorkout, getWorkouts, getSingleWorkout, updateWorkout, deleteWorkout } = require("../controllers/workoutController");
const { requireAuth } = require("../middlewares/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
