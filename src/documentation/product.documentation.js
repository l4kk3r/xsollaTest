/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - sku
 *         - name
 *         - type
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *         sku:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         price:
 *           type: integer
 *       example:
 *         id: 20
 *         sku: fortnite-vbucks-10
 *         name: 10 Vbucks
 *         type: Gaming Currency
 *         price: 100
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The product managing API
 */

/**
 * @swagger
 * /product:
 *   get:
 *     tags: [Product]
 *     parameters:
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *         description: Products type (for filtering)
 *       - name: minPrice
 *         in: query
 *         schema:
 *           type: integer
 *         description: Products minimum price (for filtering)
 *       - name: maxPrice
 *         in: query
 *         schema:
 *           type: integer
 *         description: Products max price (for filtering)
 *     responses:
 *       200:
 *         description: All products
 */

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product deleted
 */

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product deleted
 */