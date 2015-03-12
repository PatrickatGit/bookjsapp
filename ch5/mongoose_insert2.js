var mongoose = require('mongoose');

var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/node_test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  function validAge(v) {
    return v >= 0 && v <= 120;
  }

  var contactSchema = mongoose.Schema({
    name: String,
    email: String,
    age: {type: Number, validate: [validAge, 'Age should be 0 to 130']},
    phone: {'home': [String], 'work': [String], 'mobile': [String]}
  })
  var Contact = mongoose.model('Contact', contactSchema);

  var sabrina = Contact({name: 'Sabrina', email:'sabrina@abc.com', age:130, phone: {'mobile': ['656-1234']}});
  sabrina.save(function (err, sabrina) {
    if (err) console.log(err);
    else console.log(sabrina);
    db.close();
  });
});
