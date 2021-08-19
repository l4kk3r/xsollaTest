const mongoose = require("mongoose")
const autoIncrement = require('mongoose-auto-increment')

const config = require('@root/config.json')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.MONGODB_URI)
autoIncrement.initialize(mongoose.connection)

mongoose.connection.on('connected', () => console.log('🎉 MongoDB connected'))
mongoose.connection.on('error', () => console.log('❌ MongoDB connection failed'))

require('@src/models/db/Product')
require('@src/models/db/User')