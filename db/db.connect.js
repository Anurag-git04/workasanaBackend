
const mongoose = require('mongoose')
require('dotenv').config()
const MongoDb = process.env.MONGODB

const connectDb = ()=>{
    mongoose.connect(MongoDb).then(()=>{
        console.log('Mongo DB is Connected')
    }).catch((error)=>{
        console.log('Error while connecting db', error)
    } )
}

module.exports =  connectDb;
