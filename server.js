const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://artydabomb:artydabomb@cluster0-shard-00-00.vf2vj.mongodb.net:27017,cluster0-shard-00-01.vf2vj.mongodb.net:27017,cluster0-shard-00-02.vf2vj.mongodb.net:27017/WorkoutsDB?ssl=true&replicaSet=atlas-xo9nbh-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true });

// var exercises = [{
//   day: new Date().setDate(new Date().getDate() - 10),
//   exercises: [
//     {
//       _id: "sld;foj2498fj3284",
//       type: "resistance",
//       name: "Bicep Curl",
//       duration: 20,
//       weight: 100,
//       reps: 10,
//       sets: 4
//     }
//   ]
// }]

app.get("/api/workouts", (req, res) => {
  db.Workout.find().then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  })
    .catch(err => {
      res.json(err);
    })
});

app.put("/api/workouts/:id", (req, res) => {
  // console.log(req);
  db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true }).then(dbExercise => {
    console.log(dbExercise);
    res.json(dbExercise);
  })
    .catch(err => {
      res.json(err);
    })
});

app.post("/api/workouts/", (req, res) => {
  db.Exercise.insertOne().then(dbExercise => {
    console.log(dbExercise);
    res.json(dbExercise);
  })
    .catch(err => {
      res.json(err);
    })
});

//Code to render HTML pages

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
})

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});