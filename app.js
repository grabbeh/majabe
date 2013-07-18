
var express = require('express')
, mongoose = require('mongoose')
, app = express()
, Thing = require('./models/thing.js')
, route = require('./routes/routes.js')
, db = require('./config/db.js')

mongoose.connect('mongodb://' + db.details.user + ':' + db.details.pass + '@' + db.details.host + ':' + db.details.port + '/' + db.details.name );

app.configure(function(){
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat'}));				  
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);

});

// Routes

app.get('/', function(req, res){
  res.render('index.html')
});

app.get('/things', route.getThings);

app.get('/things/:id', route.getThing);

app.post('/things/:id', route.postThing);

app.delete('/things/:id', route.deleteThing);

app.put('/things/:id', route.editThing);


app.listen(3000);
