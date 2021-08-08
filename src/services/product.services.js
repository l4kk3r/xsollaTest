const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const { validationResult } = require('express-validator');

const isNumeric = require('../helpers/isNumeric')

module.exports.listProducts = async (req, res) => {
    try {
        const { type, minPrice, maxPrice } = req.query

        const filters = { type }
        Object.keys(filters).forEach(key => !filters[key] ? delete filters[key] : null)
    
        const products = await Product.findAll({
            where: {
                price: {
                    [Op.gte]: minPrice || 0,
                    [Op.lte]: maxPrice || 10 ** 9
                },
                ...filters
            }
        })
    
        res.json({ success: true, products })
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
        }

        const { id } = req.params
        const { name, sku, type, price } = req.body
        const newFields = { name, sku, type, price }
        Object.keys(newFields).forEach(key => !key ? delete filters.key : null)

        await Product.findByIdAndUpdate(id, newFields)

        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const { name, sku, type, price } = req.body

        const productWithSameSKU = await Product.findOne({ sku })

        if (productWithSameSKU) return res.status(400).json({ message: 'Продукт с данным SKU уже существует'  })

        await Product.create({ name, sku, type, price })
        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
        }

        const { name, sku, type, price } = req.body

        const productWithSameSKU = await Product.findOne({ sku })
        if (productWithSameSKU) return res.status(400).json({ message: 'Продукт с данным SKU уже существует'  })

        await Product.create({ name, sku, type, price })
        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!isNumeric(id)) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        const result = await Product.findByIdAndDelete(id)

        if (!result) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!isNumeric(id)) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: 'Продукт с таким id не существует ;(' })

        res.json({ product })
    } catch (e) {
        return res.status(500).json({ message: 'Iternal Server Error' })
    }
}