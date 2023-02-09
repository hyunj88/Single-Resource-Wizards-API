// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for wizard
const Wizard = require('../models/wizard')

// custom middleware
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// ROUTES

// POST -> create a wand(and give that wand to a wizard)
// POST /wands/:petId
// anybody should be able to give a wizard a wand
// so we wont requireToken
// our wand schema, has some non-required fields, so let's use removeBlanks
router.post('/wands/:petId', removeBlanks, (req, res, next) => {
    // isolate our wand from the request, and save to variable
    const wand = req.body.wand
    // isolate and save our pet's id for easy reference
    const wizardId = req.params.wizardId
    // find the wizard and push the new wand into the wizard's array
    Wizard.findById(wizardId)
        // first step is to use our custom 404 middleware
        .then(handle404)
        // handle adding toy to pet
        .then(wizard => {
            console.log('the wizard: ', wizard)
            console.log('the wand: ', wand)
            // add toy to toys array
            wizard.wands.push(wand)

            // save the pet
            return wizard.save()
        })
        // send info after updating the wizard
        .then(wizard => res.status(201).json({ wizard: wizard }))
        // pass errors along to our error handler
        .catch(next)
})

// PATCH -> update a wand
// PATCH /wands/:wizardId/:wandId
router.patch('/wands/:wizardId/:wandId', requireToken, removeBlanks, (req, res, next) => {
    // get and save the id's to variables
    const wizardId = req.params.wizardId
    const wandId = req.params.wandId

    // find our wizard
    Wizard.findById(wizardId)
        .then(handle404)
        .then(wizard => {
            // single out the wand
            const theWand = wizard.wands.id(wandId)
            // make sure the user is the wizard's owner
            requireOwnership(req, wizard)
            // update accordingly
            theWand.set(req.body.wand)

            return wizard.save()
        })
        // send a status
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE -> destroy a wand
// DELETE /wands/:wizardId/:wandId
router.delete('/wands/:wizardId/:wandId', requireToken, (req, res, next) => {
    const wizardId = req.params.wizardId
    const wandId = req.params.wandId

    // find the wizard
    Wizard.findById(wizardId)
        .then(handle404)
        // grab the specific wand using it's id
        .then(wizard => {
            // isolate the wand
            const theWand = wizard.wands.id(wandId)
            // make sure the user is the owner of the wizard
            requireOwnership(req, pet)
            // call remove on our wand subdoc
            theWand.remove()
            // return the saved wizard
            return wizard.save()
        })
        // send a response
        .then(() => res.sendStatus(204))
        // pass errors to our error handler (using next)
        .catch(next)
})

// export our router
module.exports = router