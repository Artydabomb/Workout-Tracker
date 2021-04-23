//Actions: View, Create, Track Daily, Log Daily


const mongoose = require("mongoose");
const ExerciseSchema = require("./exercise");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: String,
        unique: true
    },
    //Array of exercise schema
    exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
