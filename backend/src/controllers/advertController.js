import { Advert } from "../models/advertModel"

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