// const express = require("express");
// const mongoose = require("mongoose");
// const signModel = require("./models");
// mongoose
//   .connect(
//     "mongodb+srv://mabenblal:0z2Cdm5TiWGzKf9K@cluster0.auxy0zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then((result) => {
//     console.log("ca marche");
//   })
//   .catch((err) => {
//     console.log("ca marche pas");
//   });

// const app = express();

// app.use(express.static("Html"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get("/sign_up", (req, res) => {
//   return res.redirect("pager.html");
// });

// app.post("/sign_up", (req, res) => {
//   const data = new signModel({
//     user: req.body.user,
//     Email: req.body.Email,
//     Password: req.body.Password,
//     Title: req.body.Title,
//     selectedCategory: req.body.selectedCategory,
//     idNumber: req.body.idNumber,
//     nCCP: req.body.nCCP,
//     amount: req.body.amount,
//     description: req.body.description,
//     image: req.body.image,
//   });
//   data
//     .save()
//     .then(console.log("enregistreer dans la base"))
//     .catch((err) => {
//     console.log(err);
//     });

//   return res.redirect("login.html");
// });

// app.listen(3000, () => {
//   console.log(`App running on port 3000...`);
// });

// app.get("/login", (req, res) => {
//   return res.redirect("login.html");
// });
// app.post("/login", async (req, res) => {
//   try {
//     const check = await signModel.findOne({
//       Email: req.body.email,
//     });
//     if (check.Password === req.body.password) {
//       res.send("SUCCES!!!");
//     } else {
//       res.send("WRONG PASSWORD !!");
//     }
//   } catch {
//     res.send("WRONG DETAILS !!");
//   }
//   });
