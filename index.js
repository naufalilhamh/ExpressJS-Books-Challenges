// const express = require("express");
// const app = express();
// app.listen(3000, () => {
//   console.log("Server is listening on port: 3000");
// });

// const express = require("express");

// const PORT = 3000;
// const app = express();

// app.get("/", function(req, res) {
//   res.send("Hello World!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });

// const express = require("express");

// var birds = require("./app/routes/birds");

// const PORT = 3000;
// const app = express();

// require("./app/routes/routes.js")(app);
// app.use("/birds", birds);

// //validasi
// app.use(express.json());
// app.post("/user", (req, res) => {
//   User.create({
//     username: req.body.username,
//     password: req.body.password
//   }).then(user => res.json(user));
// });
// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
const express = require("express");
var morgan = require("morgan");
const PORT = 3000;
const app = express();

app.use(express.json());
const { check, validationResult } = require("express-validator");

app
  .post(
    "/user",
    [
      // username must be an email
      check("username").isEmail(),
      // password must be at least 5 chars long
      check("password")
        .isLength({ min: 5 })
        .withMessage("Harus 5 huruf")
    ],
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const user = {
        username: req.body.username,
        password: req.body.password
      };
      res.status(200).json(user);
      // User.create({
      //   username: req.body.username,
      //   password: req.body.password
      // }).then(user => res.json(user));
    }
  )
  .post(
    "/register",
    [
      check("username_regis").isString(),
      check("email_regis").isEmail(),
      check("password_regis").isLength({ min: 5 }),
      check("passwordconfirm_regis").isLength({ min: 5 })
      // check("confirm_password")
      //   .matches("password")
      //   .isLength({ min: 5 })
    ],
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions;
      const errors2 = validationResult(req);

      if (req.body.password_regis != req.body.passwordconfirm_regis) {
        return res.status(422).json({ Kesalahan: "Password Ga Sama" });
      }
      if (!errors2.isEmpty()) {
        return res.status(422).json({ errors2: errors2.array() });
      }
      const register = {
        username_regis: req.body.username_regis,
        email_regis: req.body.email_regis,
        password_regis: req.body.password_regis,
        passwordconfirm_regis: req.body.passwordconfirm_regis
        // confirm_password: req.body.confirm_password
      };
      res.status(200).json(register);
    }
  );

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
