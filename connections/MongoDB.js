const mongoose = require("mongoose")
const autoIncrement = require('mongoose-auto-increment');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI)
autoIncrement.initialize(mongoose.connection)

mongoose.connection.on('connected', (connection) => console.log('MongoDB connected'))
mongoose.connection.on('error', () => console.log('Failed to connect MongoDB'))

require('../src/models/Product')