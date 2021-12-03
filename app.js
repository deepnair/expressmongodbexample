const express = require('express');
const app = express();
const router = require('./routes/tasks')
const connectDb = require('./db/tasks');
require('dotenv').config();
const {createCustomError} = require('./errors/error')
const notFound = require('./middleware/not-found')
const errorhandler = require('./middleware/error-handler')

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', router);

app.use(notFound);
app.use(errorhandler);

const port = process.env.PORT || 5000

const start = async() => {
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Database has connected, server is running on port ${port}`)
        })
    }catch(error){
        createCustomError(`The server was unable to start due to: ${error}`, 500);
    }
}

start();
