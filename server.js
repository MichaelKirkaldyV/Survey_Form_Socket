const express = require('express');
const app = express();
app.use(express.static(__dirname + "/views"));
const server = app.listen(1337);
const io = require('socket.io')(server);
const path = require("path");

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var counter = 0;

//------------routing-------------------------------//

app.get('/', function(req, res) {	 
 res.render("index");
})

//2
io.on('connection', function (socket) {  
  //2 1/2 listens for emit "posting_form"
  socket.on('posting_form', function(data) {
  		//3 emits back to client a message with the data from the posting_form submittion.
  		//4 also emits a random number between 1 and 1000.
        socket.emit('new_message', {msg: data});
        socket.emit('rand_num', {number: Math.floor(Math.random() * 1000)})
    });
    
});