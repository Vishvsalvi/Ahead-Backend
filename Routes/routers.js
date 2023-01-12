const express = require('express');
const router = express.Router();
const { getAll, create, update, deleteAnnouncement } = require('../Controllers/controllers')


router.route("/").get(getAll).post(create);
router.route("/:id").patch(update).delete(deleteAnnouncement);

module.exports = router
