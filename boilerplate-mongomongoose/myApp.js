require('dotenv').config();

//conectar mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

//crear Schema/model
const personSchema = new Schema({
    name: String,
    age:  Number,
    favoriteFoods: [String]
});

//asociar Schema con el modelo
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    let person = new Person({
        name: "Pepe",
        age: 26,
        favoriteFoods: ["Pizza"]
    });

    person.save((err, data) => {
        if (err) {
            console.error(err);
        } 
        done(null, data);
    });
};

//crear registros con model.create()
const createManyPeople = (arrayOfPeople, done) => {

    Person.create(arrayOfPeople, (err, data) => {
        if (err) {
            console.log(err);
        }
        done(null, data);
    });
};
//model.find()  
const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (err, data) => {
        if (err) {
            console.log(err);
        }
        done(null, data);
    });
};
  
const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, data) => {
        if (err) {
            console.log(err);
        }
        done(null, data);
    });
};
  
const findPersonById = (personId, done) => {
    done(null /*, data*/);
  };
  
  const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
  
    done(null /*, data*/);
  };
  
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  
    done(null /*, data*/);
  };
  
  const removeById = (personId, done) => {
    done(null /*, data*/);
  };
  
  const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
  
    done(null /*, data*/);
  };
  
  const queryChain = (done) => {
    const foodToSearch = "burrito";
  
    done(null /*, data*/);
  };
  
  /** **Well Done !!**
  /* You completed these challenges, let's go celebrate !
   */
  
  //----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
  
  exports.PersonModel = Person;
  exports.createAndSavePerson = createAndSavePerson;
  exports.findPeopleByName = findPeopleByName;
  exports.findOneByFood = findOneByFood;
  exports.findPersonById = findPersonById;
  exports.findEditThenSave = findEditThenSave;
  exports.findAndUpdate = findAndUpdate;
  exports.createManyPeople = createManyPeople;
  exports.removeById = removeById;
  exports.removeManyPeople = removeManyPeople;
  exports.queryChain = queryChain;