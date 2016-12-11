var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
  task: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  priority: {type: String, default: "Low"},
  completed: { type: Boolean, required: true, default: false},
  dueEntered: { type: Date, default: Date.now },
  dueDate: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Todos', TodoSchema);
