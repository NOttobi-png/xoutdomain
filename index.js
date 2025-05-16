const mongoose = require('mongoose');
const contact = require(',/models/contactSchema');

mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



const newContact = new Contact({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello! I have a question.'
});

newContact.save()
  .then(doc => {
    console.log('Contact saved:', doc);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));



  
const Project = require('./models/projectSchema');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  github: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
