const testdata = require('../../ingest/service/pushOps');
const express = require('express');
const router = express.Router();

router
  .get('/', async (req, res) => {
    res.send('Yeet');
  });

module.exports = router;
