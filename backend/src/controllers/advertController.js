import { Advert } from "../models/advertModel"
import createHttpError from 'http-errors'

export const createAdvert = async (req, res, next ) => {
    try {
        const {name, description, price, image, tags} = req.body
        const owner = req.user.id

        const newAdvert = new Advert({
            name,
            description,
            price,
            image,
            tags,
            owner
        })

        const savedAdvert = await newAdvert.save()

        res.status(201).json({message: 'Advert created', advert: savedAdvert})
    } catch (error) {
        next(error)
    }
}

export const getAdvert = async (req, res, next) => {
    try {
        const { id } = req.params

        const advert = await Advert.findById(id)

        if (!advert) {
            return next(createHttpError(404, 'Advert not found'))
        }

        res.json({ advert })
    } catch (error) {
        next(error)
    }
}