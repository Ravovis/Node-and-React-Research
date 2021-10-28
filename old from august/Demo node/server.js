const express = require('express');
const PDFDocument = require('pdfkit')
//const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const User = require('./signUpModel');
const { compress } = require('pdfkit');
const cors = require('cors');
var bodyParser = require('body-parser');
const Validator = require("validator");
const isEmpty = require("is-empty");
const passport = require("passport");
const bcrypt = require("bcryptjs");
// Passport config
require("./config/passport")(passport);



const app = express();
app.use(cors())
const port = 8000;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

mongoose.connect(require("./config/keys").mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: require("./config/keys").dbName });
mongoose.connection.on('error', err => debug('MongoDB connection error: ${err}'));

// Passport middleware
app.use(passport.initialize());




async function getAmountOfDocuments() {
  /*const client = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
  await client.connect();
  const col = client.db("TestDatabase").collection("MainCollection");
  const result = await col.countDocuments();
  client.close();
  return result;*/
}


app.get('/amount', async (req, res) => {
  getAmountOfDocuments()
    .then(result => {
      res.send(result.toString());
    });

});

app.post('/pdf', (req, res) => {
  const doc = new PDFDocument()
  let filename = "myPdf";
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  doc.text('TEXT PAGE 1');
  doc.addPage().text('Page 2 text');
  doc.pipe(res)
  doc.end()
});

app.get('/csv', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('take your csv')
});

app.post('/txt', (req, res) => {
  var text = "hello world";
  res.setHeader('Content-type', "application/octet-stream");
  res.setHeader('Content-disposition', 'attachment; filename=file.txt');
  res.send(text);
});












// @route POST api/users/signup
// @desc Register user
// @access Public
app.post("/signup", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); 
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
app.post("/login", (req, res) => { 
  // Form validation 
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});



function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.usrname = "Name username is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";

  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}





app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});