/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest APIs
 */

/**
 * @swagger
 * /contests:
 *   post:
 *     summary: Create contest
 *     tags: [Contests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Contest created successfully
 */

/**
 * @swagger
 * /contests:
 *   get:
 *     summary: Get all contests
 *     tags: [Contests]
 *     responses:
 *       200:
 *         description: Contests fetched successfully
 */

/**
 * @swagger
 * /contests/{contestId}:
 *   get:
 *     summary: Get contest by ID
 *     tags: [Contests]
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest fetched successfully
 */

/**
 * @swagger
 * /contests/{contestId}/register:
 *   post:
 *     summary: Register for contest
 *     tags: [Contests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registered successfully
 */

/**
 * @swagger
 * /contests/{contestId}/leaderboard:
 *   get:
 *     summary: Get contest leaderboard
 *     tags: [Contests]
 *     responses:
 *       200:
 *         description: Leaderboard fetched successfully
 */

/**
 * @swagger
 * /contests/{contestId}/problems/{problemId}/submit:
 *   post:
 *     summary: Submit contest solution
 *     tags: [Contests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Contest submission judged successfully
 */