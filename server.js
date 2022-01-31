const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const appConf = require('./config/app.conf');
const Auth = require('./auth');
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

app.set('views', __dirname + '/frontend');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname+'/frontend'))
// mendefinisikan router
app.get('/', (req, res) => {
    return res.render('login.html')
});
app.get('/login', (req, res) => {
    const token = jwt.sign({ id: 7, role: "captain" }, "NA_KEY");
    return res
        .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
});
app.get('/logout',Auth, (req, res) => {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

app.get("/protected", Auth, (req, res) => {
    return res.json({ user: { id: req.userId, role: req.userRole } });
  });

// listen for requests
app.listen(appConf.PORT, () => {
    console.log(`Server is listening on port ${appConf.PORT}`);
});