/**
 * @swagger
 * tags:
 *   - name: Submissions
 *     description: Submission APIs
 */

/**
 * @swagger
 * /submissions:
 *   post:
 *     summary: Submit solution
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Submission judged successfully
 */

/**
 * @swagger
 * /submissions:
 *   get:
 *     summary: Get all submissions
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Submissions fetched successfully
 */

/**
 * @swagger
 * /submissions/my:
 *   get:
 *     summary: Get current user's submissions
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My submissions fetched successfully
 */

/**
 * @swagger
 * /submissions/{submissionId}:
 *   get:
 *     summary: Get submission by ID
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission fetched successfully
 */