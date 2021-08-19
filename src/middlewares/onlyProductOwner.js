const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const jwt = require('jsonwebtoken')

const config = require('@root/config.json')

module.exports = async (req, res, next) => {
    const productId = req.params._id
    const product = await Product.findById(productId)
    const sellerId = product.seller_id

    const userId = req.userId

    if (userId !== sellerId) return res.status(403).json({ message: 'У вас нет права редактировать или удалять данный продукт' })
    
    next()
}