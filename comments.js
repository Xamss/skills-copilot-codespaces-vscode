//Create web server
const express = require('express');
const app = express();

//Get the data from the json file
const data = require('./data.json');

//Set the view engine to pug
app.set('view engine', 'pug');

//Set the static route
app.use('/static', express.static('public'));

//Import the routes
const mainRoutes = require('./routes');
const projectRoutes = require('./routes/projects');

//Use the routes
app.use(mainRoutes);
app.use('/projects', projectRoutes);

//Set the error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log('Sorry, we could not find the page you were looking for.');
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  console.log('Sorry, we could not find the page you were looking for.');
  res.render('error');
});

//Listen on port 3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});