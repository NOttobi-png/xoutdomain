const mongoose = require('mongoose');

// Import Mongoose models from separate files (each exports the model)
// For example, models/contactSchema.js might export:
//   module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const Contact = require('./models/contactSchema');
const Project = require('./models/projectSchema');

async function runTest() {
  try {
    // Connect to the local MongoDB database 'myDatabase'
    await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create and save a sample Contact
    const sampleContact = new Contact({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '555-1234'
    });
    const savedContact = await sampleContact.save();
    console.log('Saved contact:', savedContact);

    // Create and save a sample Project
    const sampleProject = new Project({
      title: 'Sample Project',
      description: 'This is a test project.'
      // Optionally, you could reference the contact by ID, e.g. owner: savedContact._id
    });
    const savedProject = await sampleProject.save();
    console.log('Saved project:', savedProject);

  } catch (error) {
    console.error('Error during operation:', error);
  } finally {
    // Close the Mongoose connection when done (recommended practice)
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the test script
runTest();
