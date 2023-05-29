const mongoose = require('mongoose');

const connect = async ()=>{
    try{
        const {connection} = await mongoose.connect(process.env.DB_URI);
        console.log('connected to database on' + connection.host);
    } catch(error) {
        console.log(error);
    }
};

module.exports = connect;
