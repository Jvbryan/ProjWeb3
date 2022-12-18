const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/cottonman';

module.exports = {
  connect() {
    return mongoose.connect(url, {
      useNewUrlParser: true,
    });
  },
  disconnect() {
    return mongoose.disconnect();
  }
};