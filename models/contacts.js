const {Schema, model} = require('mongoose');

const contactSchema = Schema({
  name: String,
  link: String,
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
