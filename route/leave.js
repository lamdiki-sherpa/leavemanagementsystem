const express = require("express");
const router = express.Router();
const {
  getAllLeaves,
  getLeave,
  approveLeave,
  rejectLeave,
  deleteLeave,
  createLeave,
} = require("../controller/leave");

router.route("/").post(createLeave).get(getAllLeaves);
router
  .route("/:id")
  .get(getLeave)
  .delete(deleteLeave)
  .patch(approveLeave)
  .patch(rejectLeave);

module.exports = router;
