var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://needsclosure:needsclosure1@ds021289.mlab.com:21289/needsclosure');

var taskSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date,
  dueDate: Date,
  completed: Boolean, 
  group: [{type: Schema.Types.ObjectId, ref: 'Group'}] 
});


var Task = mongoose.model('Task', taskSchema);

//User schema 
var UserSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
	token: String, 
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}], 
	groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
}); 

//User group schema 
var groupSchema = new Schema({
  users:[{type: Schema.Types.ObjectId, ref: 'User'}], 
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});
// contains an array of user ids along with an array of task ids
var Group = mongoose.model('Group', groupSchema); 

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});

});


var User = mongoose.model('User', UserSchema);

// var GroupSchema = new Schema({
//   name: String,
//   members: [type: Schema.Types.ObjectId, ref: 'User'],
//   tasks: [type: Schema.Types.ObjectID, ref: 'Task']

// })

// var Group = mongoose.model('Group', GroupSchema);


module.exports = {user: User, task: Task, group: Group}; 