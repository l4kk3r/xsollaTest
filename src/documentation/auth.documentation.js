/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - email
 *         - password
 *         - role
 *       properties:
 *         _id:
 *           type: integer
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         _id: 10
 *         email: tomtom@yandex.ru
 *         role: seller
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  email:       
 *                    type: string
 *                  password: 
 *                    type: string
 *                  role:
 *                    type: string
 *                  required:
 *                  - email
 *                  - password
 *                  - role
 *                example:
 *                  email: myemail@gmail.com
 *                  password: StrongPass54321
 *                  role: seller
 *     responses:
 *       200:
 *         description: Signup route
 */

/**
 * @swagger
 * /auth/client/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  email:       
 *                    type: string
 *                  password: 
 *                    type: string
 *                  required:
 *                  - email
 *                  - password
 *                example:
 *                  email: myemail@gmail.com
 *                  password: StrongPass54321
 *     responses:
 *       200:
 *         description: Client login (via sessions)
 */

/**
 * @swagger
 * /auth/server/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  email:       
 *                    type: string
 *                  password: 
 *                    type: string
 *                  required:
 *                  - email
 *                  - password
 *                example:
 *                  email: myemail@gmail.com
 *                  password: StrongPass54321
 *     responses:
 *       200:
 *         description: Client login (via access + refresh tokens)
 */

/**
 * @swagger
 * /auth/renewToken:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  refreshToken:       
 *                    type: string
 *                  required:
 *                  - refreshToken
 *                example:
 *                  refreshToken: refreshToken
 *     responses:
 *       200:
 *         description: Get new access token
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout route for clients (sessions)
 */
