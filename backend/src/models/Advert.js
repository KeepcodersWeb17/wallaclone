import mongoose from 'mongoose'

const advertSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true},
    description: {type: String},
    price: {type: Number, required: true, index: true},
    image: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    tags: {type: [String], index: true}
}, {
    timestamps: true
})

export const Advert = mongoose.model('Advert', advertSchema)