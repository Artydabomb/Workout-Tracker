//Actions: View, Create, Track Daily, Log Daily


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: String,
        unique: true
    },
    //Array of exercise schema
    exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Exercise", WorkoutSchema);

module.exports = Workout;
