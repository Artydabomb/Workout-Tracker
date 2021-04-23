//Actions: Track name, type, duration, weight, reps, sets of exercise

const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    // This attribute is only meaningful when the type is: "cardio"
    distance: Number,
});

// const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = ExerciseSchema;
