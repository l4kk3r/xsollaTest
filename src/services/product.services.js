const { Product } = require('../models')
const { Op } = require("sequelize");
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
        return res.status(500).json({ success: false, message: 'Iternal Server Error' })
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg })
        }

        const { id } = req.params
        const { name, sku, type, price } = req.body
        const newFields = { name, sku, type, price }
        Object.keys(newFields).forEach(key => !key ? delete filters.key : null)

        await Product.update({
            ...newFields
        },
            {
                where: {
                    id
                }
        })

        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Iternal Server Error' })
    }
}

module.exports.createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg })
        }

        const { name, sku, type, price } = req.body

        const productWithSameSKU = await Product.findOne({
            where: {
                sku
            }
        })

        if (productWithSameSKU) return res.status(400).json({ success: false, message: 'Продукт с данным SKU уже существует'  })

        await Product.create({ name, sku, type, price })
        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Iternal Server Error' })
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg })
        }

        const { name, sku, type, price } = req.body

        if (productWithSameSKU) return res.status(400).json({ success: false, message: 'Продукт с данным SKU уже существует'  })

        await Product.create({ name, sku, type, price })
        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Iternal Server Error' })
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!isNumeric(id)) return res.status(404).json({ success: false, message: 'Продукт с таким id не существует ;(' })

        const result = await Product.destroy({
            where: {
                id
            }
        })

        if (!result) return res.status(404).json({ success: false, message: 'Продукт с таким id не существует ;(' })

        res.json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Iternal Server Error' })
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!isNumeric(id)) return res.status(404).json({ success: false, message: 'Продукт с таким id не существует ;(' })

        const product = await Product.findOne({
            where: {
                id
            }
        })

        if (!product) return res.status(404).json({ success: false, message: 'Продукт с таким id не существует ;(' })

        res.json({ product })
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Iternal Server Error' })
    }
}