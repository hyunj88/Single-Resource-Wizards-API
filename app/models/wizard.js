const mongoose = require('mongoose')

const wizardSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		house: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		alive: {
			type: Boolean,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
		// since we're adding virtuals to our wizard model
		// we need to tell express to include them when we want them
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

// virtuals go here
// remember these are virtual properties, that use existing data, to add a property whenever we retrieve these documents.
wizardSchema.virtual('fullTitle').get(function () {
	return `${this.name} the ${this.type}`
})

module.exports = mongoose.model('Wizard', wizardSchema)
