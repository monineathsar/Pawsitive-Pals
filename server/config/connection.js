const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://pawsitivepals:dVbyUdwwD1lBUHSx@cluster0.ynyfnh2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'pawsitive-pals'
});

module.exports = mongoose.connection;
