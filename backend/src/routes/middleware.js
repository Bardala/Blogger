const asyncHandler = require("express-async-handler");

const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { requestLogger } = require("../middleware/loggerMiddleware");

const router = express.Router();

router.use(asyncHandler(requestLogger));
router.use(asyncHandler(requireAuth));

module.exports = router;
