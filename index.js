
//http://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: 'MySecret',
    resave: true,
    saveUninitialized: true
}));
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "mandeep" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
 
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "mandeep" && req.query.password === "mandeep1") {
    req.session.user = "mandeep";
    req.session.admin = true;
    res.send("login success!");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can see this because you'r logged in.");
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");

