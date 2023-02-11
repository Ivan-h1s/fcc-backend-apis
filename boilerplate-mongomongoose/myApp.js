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
    Person.findById({_id: personId}, (err, data) => {
        if (err) {
            console.log(err);
        } 
        done(null, data);
    });
};
//buscamos por _id asignando a personId  
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data) => {
        if (err) {
            console.log(err);
        }
        //pusheamos foodToAdd
        data.favoriteFoods.push(foodToAdd);
        //en el callback actualizamos
        data.save((err, updatedData) => {
            if (err) {
                console.log(err);
            }
            done(null, updatedData);
        })        
    })
};
  
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, updatedData) => {
        if (err) {
            console.log(err);
        }
        done(null, updatedData);
    })
};
  
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, deleteData) => {
        if (err) {
            console.log(err);
        }
        done(null, deleteData);
    });
};
  
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, (err, removeData) => {
        if (err) {
            console.log(err);
        }
        done(null, removeData);
    })
};
  
const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({favoriteFoods: foodToSearch})
            .sort({name: 1})
            .limit(2)
            .select({age: 0})
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                }
                done(null, data);
            }
        )
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