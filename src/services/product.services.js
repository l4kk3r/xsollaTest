const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const { validationResult } = require('express-validator')

let mqChannel = null
const rabbitMQ = require('@src/connections/RabbitMQ').then(ans => mqChannel = ans)

const isNumeric = require('@src/helpers/isNumeric')

module.exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const data = {...req.body}
        const { sku, landing } = data

        data.seller_id = req.userId
        data.landing = {
            url: landing,
            confirmed: false
        }

        const productWithSameSKU = await Product.findOne({ sku })

        if (productWithSameSKU) return res.status(400).json({ message: 'Продукт с данным SKU уже существует'  })

        const product = new Product(data)
        await product.save()

        const queueMessage = Buffer.from(JSON.stringify(product))
        await mqChannel.publish('newProduct', 'np1', queueMessage)

        res.status(201).send()
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.listAll = async (req, res) => {
    try {
        const { type, minPrice, maxPrice } = req.query

        const filters = { type }
        Object.keys(filters).forEach(key => !filters[key] ? delete filters[key] : null)

        const products = await Product.find({ price: { $gte: minPrice || 0, $lte: maxPrice || Infinity }, ...filters })
    
        res.json(products)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const { _id } = req.params
        const { name, sku, type, price } = req.body
        let newFields = { name, sku, type, price }
        newFields = JSON.parse(JSON.stringify(newFields))

        await Product.updateOne({ _id }, { $set: newFields })

        res.status(204).send()
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const { _id } = req.params

        if (!isNumeric(_id)) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        const result = await Product.findByIdAndDelete(_id)

        if (!result) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        res.status(204).send()
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.get = async (req, res) => {
    try {
        const { _id } = req.params

        if (!isNumeric(_id)) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        const product = await Product.findById(_id)

        if (!product) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        res.json(product)
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}