const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CNN);

    console.log('DB correcta');
  } catch (error) {
    console.log(error);
    throw new Error('Error DB');
  }
};

module.exports = dbConnection;
