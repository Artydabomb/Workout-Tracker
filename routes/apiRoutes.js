const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://artydabomb:artydabomb@cluster0-shard-00-00.vf2vj.mongodb.net:27017,cluster0-shard-00-01.vf2vj.mongodb.net:27017,cluster0-shard-00-02.vf2vj.mongodb.net:27017/WorkoutsDB?ssl=true&replicaSet=atlas-xo9nbh-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true });
const db = require("../models");

//Route to get completed workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find().then(dbWorkout => {
        // console.log(dbWorkout);
        res.json(dbWorkout);
    })
        .catch(err => {
            res.json(err);
        })
});

// Route to find and add exercise by ID, then pushes it to the list of exercises in workouts
router.put("/api/workouts/:id", (req, res) => {
    // console.log(req);
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true }).then(dbExercise => {
        console.log(dbExercise);
        res.json(dbExercise);
    })
        .catch(err => {
            res.json(err);
        })
});

//Route to create new workout 
router.post("/api/workouts", (req, res) => {
    // var obj = req.body;
    // obj.day = new Date();
    // console.log(obj);
    console.log(req.body);

    db.Workout.create(req.body).then(dbExercise => {
        res.json(dbExercise);
    })
        .catch(err => {
            res.json(err);
        })
});

// Making route to workout/range page
//Route to get completed workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find().then(dbWorkout => {
        // console.log(dbWorkout);
        res.json(dbWorkout);
    })
        .catch(err => {
            res.json(err);
        })
});

// db.Library.create({ name: "Campus Library" })
//   .then(dbLibrary => {
//     console.log(dbLibrary);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// app.post("/submit", ({body}, res) => {
//   db.Book.create(body)
//     .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/books", (req, res) => {
//   db.Book.find({})
//     .then(dbBook => {
//       res.json(dbBook);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/library", (req, res) => {
//   db.Library.find({})
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populated", (req, res) => {
//   db.Library.find({})
//     .populate("books")
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

module.exports = router;