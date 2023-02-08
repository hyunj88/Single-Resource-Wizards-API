// seed.js will be run by the script `npm run seed`

const mongoose = require('mongoose')
const Wizard = require('./wizard')
const db = require('../../config/db')

const startWizards = [
    { 
        name: 'Harry Potter', 
        house: 'gryffindor',
        age: 15, 
        alive: true
    },
    { 
        name: 'Hermione Granger', 
        house: 'gryffindor',
        age: 15, 
        alive: true
    },
    { 
        name: 'Cedric Diggory', 
        house: 'hufflepuff',
        age: 17, 
        alive: false
    },
    { 
        name: 'Severus Snape', 
        house: 'slytherin',
        age: 36, 
        alive: true
    },
    { 
        name: 'Luna Lovegood', 
        house: 'ravenclaw',
        age: 14, 
        alive: true
    },
]

// first we connect to the db
// then remove all wizards
// then add the start wizards
// and always close the connection, whether its a success or failure

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Wizard.deleteMany()
            .then(deletedWizards => {
                console.log('the deleted wizards:', deletedWizards)
                // now we add our pets to the db
                Wizard.create(startWizards)
                    .then(newWizards => {
                        console.log('the new wizards', newWizards)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })