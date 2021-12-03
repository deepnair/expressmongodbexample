## Node, Express, MongoDB Todo App
This is done on the basis of a tutorial by John Smilga on FreeCodeCamp called [Node.js / Express course- Build 4 projects ](https://www.youtube.com/watch?v=qwfE7fSVaZM&t=3823s).

## Warning

1. This code will not work without your own .env file which you will need to create. You will need to put in a variable called MONGO_URI. You'll need to set it equal to the connection string you get from your MongoDB Atlas account's connect button without any apostrophes. (If you don't have one sign-up for an account for free. Create a new cluster, put in a username, password in the database access bit that you'll remember. Then in network access, use connect from anywhere. Then connect, copy the connection string). Change the password in the connection to the first string. And if you want you can change the name of your database from myFirstDatabase to whatever you wish to name it. 

### Approach

1. Outline the things that you want your backend to do.
1. Create the folder by doing mkdir.
1. Then npm init -y to create a package.json.
1. npm install mongoose dotenv express
1. npm install nodemon -D
1. touch app.js
1. In the app.js require express and make cont app = express()
1. Add the inbuilt express.json() and express.static('./public') middleware with app.use(). This allows it to process json from javascript forms and it also makes the folders in the public folder available at the root to clients.
1. Create a routes folder and in it mention the routes and methods relevant to each route.
1. Create a controllers folder, name all the functions that will be used in the routes, then module.exports all of them in an object.
1. Create a folder called middleWare and create a file called async.js where you can put in the asyncWrapper.
1. The async wrapper is to be used in the controllers to avoid repeated try catch boilerplate in the controllers. It will be as follows: 
    ```
    const asyncWrapper = async (fn) => {
        return (req, res, next) => {
            try{
                await fn (req, res, next)
            }catch{
                next(err)
            }
        }
    }
    ```
1. Use these to wrap the functions that are written in controller to avoid the try catch statement boilerplate each time. You still have to use async in the try catch statements. You need to await the model.
1. Create a folder called db with a tasks.js in it. const mongoose = require('mongoose').
1. Create a function const connectDb which takes a url and returns mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}). Even though the new version of mongoose is out and these options are no longer required, it still yells at us saying that the old url parser is deprecated so do the options. Se what subsequent versions say about the options. Then module.expors = connectDb.
1. Bring this into the app.js via a require. Also require('dontenv').config(). This allows you to use variables in the .env file. Create a .env file with touch. In it copy the code you get from the connect button inside MongoDB Atlas. (If you don't have an account refer to the warning notes above an create an account and get one).
1. Create a port const and set it equal to a process.env.PORT || 5000. The process.env.PORT variable will come from the .env file.
1. Create a start function in the app.js. This will be an async function with a try catch in it. First await conenctDb with process.env.MONGO_URI. Then listen on port and console.log if it is working. Also console.log any errors.
1. Create a folder called models with a tasks.js in it for connecting the database to the controllers.
1. In it require mongoose. Then create a const TaskSchema and set it equal to a new mongoose.Schema(). This takes an object with each parameter. The parameters further take objects which may have type, required, trim, maxlength, default etc. The required and maxlength can take arrays that allow you to give a message if it fails for example required: [true, 'you need to give a name'].
1. Once the schema is written module.exports = mongoose.model('Task', TaskSchema). The 'Task' here is the name of a single 'object' of the collection. Mongodb automatically turns this into lower case in plural for the collection.
1. Require this and set it equal to task to be used in the controller task.js.
1. Create  a folder called error with a error.js in it. In this create a new class called CustomAPIError which extends Error. Have a constructor with message, and statusCode parameters. In the function super(message) and this.statusCode = statusCode. 
1. Create a function called createCustomError that takes a message and statusCode and returns a new CustomAPIError which takes the message and statusCode. Then module.exports both the CustomAPIError and the createCustomError function in an object.
1. Require the createCustomError function only in the controller.
1. In the controllers where an id may not exist for example in the getOne, or updateOne, deleteOne create a if (!task) and return a createCustomError along with a message like this id was not found and a status code of 404 since the id was not found.
1. In the middleware folder create a file called error-handler.js. To handle errors the way we want them to.
1. Set module.exports equal to a function which takes err, req, res, and next. Require CustomAPIError from the errors folder error.js. If err instanceof CustomAPIError then res.status(err.statusCode).json(err.message). Else res.status(500).json('There was an internal server error. Please try again later.')
1. Then in middleware create a final file called not-found.js. Set module.exports = a function which takes a req, res and gives a res.status(404).send('The page you were looking for doesn't exist').
1. In the app.js make sure to app.use the routes with the correct address (/api/v1/tasks) and route (which was required from './routes/tasks') first. Then and ONLY THEN use not-found and error-handler which are required from the middleware folder.
1. Be sure to touch .gitignore and put in /node_modules and .env so others don't see your credentials.
1. Be sure to periodically test each function from thunder client or postman. One you complete developing the backend, also test it on the frontend with integration and end to end tests to ensure that the front-end and back-end work in sync. 