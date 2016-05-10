var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    session = require('express-session'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    keys = require('./keys.js'),
    io = require('socket.io')(http), //initialize a new instance of socket.io by passing the http (the HTTP server) object.
    port = 3000;


app.use(express.static(__dirname + '/public')); // NOTE: tells it to host this static page for us Local through Nodemon.
app.use(session({secret: "random stringz"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: keys.appId,
    clientSecret: keys.appSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function(token, refreshtoken, profile, done) {
    return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#/me',
    failureRedirect: '/login'
}));

passport.serializeUser(function(dataToSerialize, done) {
    done(null, dataToSerialize);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.get('/#/me', function(req, res) {
    console.log(req.user);
    res.send(req.user);
});

// app.get('/username', function(req, res) {
//     console.log(req.user);
//     res.send(req.user);
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function() {
    console.log('listening on ', port);
});
