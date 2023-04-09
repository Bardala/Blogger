const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { requestLogger } = require("../middleware/loggerMiddleware");

const router = express.Router();

router.use(requestLogger);
router.use(requireAuth);

module.exports = router;
