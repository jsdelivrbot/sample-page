var express = require('express');
var app = express();
var fs = require('fs');
var db = require('anti-db')().obj(`${__dirname}/db/mydb2.json`, []);
var format = require('string-template');
app.use(express.static('views'));

app.get("/insert", function (r, s) {
  r.query.id = +new Date()+Math.random().toString().slice(1,3);
  db.push(r.query);
  s.end(JSON.stringify(db));
});

app.get('/q', (r, s)=>{
  var a = db.filter((k)=>{
    for(i in r.query){
      if(!k[i] || (k[i] != r.query[i])) 
        return false;
    }
    return true;
  });
  s.end(JSON.stringify(db));
});

app.get("/update", function(r, s){
  if(!db[r.query.id]) return s.end('{error:"doesnt exist"}');
  db[r.query.id] = r.query;
  s.end(JSON.stringify(db));
});

app.get("/delete", function(r, s){
  var a = db.filter((k)=>{
    for(i in r.query){
      if(!k[i] || (k[i] != r.query[i])) 
        return true;
    }
    return false;
  });
  db = a;
  s.end(JSON.stringify(db));
});

/*
app.get("/", function (r, s) {
  var template = fs.readFileSync(`${__dirname}/views/index.html`).toString();
  s.end(template);
  //s.end(require("string-template")(template, {name:'bob'}));
});
*/
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
