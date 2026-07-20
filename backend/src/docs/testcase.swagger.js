/**
 * @swagger
 * tags:
 *   - name: TestCases
 *     description: Test Case APIs
 */

/**
 * @swagger
 * /testcases:
 *   post:
 *     summary: Create a test case
 *     tags: [TestCases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Test case created successfully
 */

/**
 * @swagger
 * /testcases/problem/{problemId}:
 *   get:
 *     summary: Get all test cases of a problem
 *     tags: [TestCases]
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
 *         description: Test cases fetched successfully
 */