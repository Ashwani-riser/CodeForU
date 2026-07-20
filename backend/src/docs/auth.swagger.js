/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User Authentication APIs
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: ashwani
 *               email:
 *                 type: string
 *                 example: ashwani@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation Error
 */