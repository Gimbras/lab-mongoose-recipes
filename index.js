const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let newRecipe ={
      title: 'Manish Curry',
      level: 'UltraPro Chef',
      ingredients: ['chiken','curry','rice'],
      cuisine: 'Indian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg', // couldnt figure this out put this shit instead
      duration: 20,
      creator: 'Manish',
      created: new Date("1992-11-23"),

    }
    return Recipe.create(newRecipe)
  })
  .then((manyRecipes)=>{
    console.log(manyRecipes.title)
    return Recipe.insertMany(data)
  })
  .then((updateRecipe)=>{
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration:100}) 
  })
  .then((remove)=>{
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then((closeData) => {
    mongoose.connection.close()
  })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
