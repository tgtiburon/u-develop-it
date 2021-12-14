// Central hub to pull all api ROUTES together
const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));

router.use(require('./partyRoutes'));



module.exports = router;