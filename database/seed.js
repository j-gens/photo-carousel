const db = require('./index.js');
const dummyData = require('../data.json');


db.save(dummyData, console.log);
