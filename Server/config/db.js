const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/myStore')
        .then((data, err) => {
            if (!err) {
                console.log('Database Connected Successfully!');
            } else {
                console.log('Database Connection Failed');
            }
        });
}

module.exports = connectDB;