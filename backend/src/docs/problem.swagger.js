/**
 * @swagger
 * tags:
 *   - name: Problems
 *     description: Problem Management APIs
 */

/**
 * @swagger
 * /problems:
 *   post:
 *     summary: Create a new problem
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - statement
 *               - difficulty
 *             properties:
 *               title:
 *                 type: string
 *                 example: Two Sum
 *               statement:
 *                 type: string
 *                 example: Find the sum of two numbers.
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *                 example: Easy
 *     responses:
 *       201:
 *         description: Problem created successfully
 */

/**
 * @swagger
 * /problems:
 *   get:
 *     summary: Get all problems
 *     tags: [Problems]
 *     responses:
 *       200:
 *         description: Problems fetched successfully
 */

/**
 * @swagger
 * /problems/{problemId}:
 *   get:
 *     summary: Get problem by ID
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a3e0269b1b69f65a5fe2e75
 *     responses:
 *       200:
 *         description: Problem fetched successfully
 *       404:
 *         description: Problem not found
 */

/**
 * @swagger
 * /problems/{problemId}:
 *   patch:
 *     summary: Update a problem
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Problem updated successfully
 */

/**
 * @swagger
 * /problems/{problemId}:
 *   delete:
 *     summary: Delete a problem
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Problem deleted successfully
 */