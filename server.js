var express = require('express');
var app = express();
var fs = require('fs');
var db = require('anti-db')().obj(`${__dirname}/db/mydb2.json`, []);
var format = require('string-template');
app.use(express.static('views'));
 
app.get("/db", function (r, s) {
  if(r.query.name)
    db.push({"id": +new Date()+Math.random().toString().slice(1,3),
    "name": r.query.name});
    
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
