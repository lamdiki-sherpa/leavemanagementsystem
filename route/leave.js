const express = require("express");
const router = express.Router();
const {
  getAllLeaves,
  getLeave,
  approveLeave,
  rejectLeave,
  deleteLeave,
  createLeave,
  checkLeave
} = require("../controller/leave");

router.route("/").post(createLeave).get(getAllLeaves);
router.route("/check").get(checkLeave)
router.route("/:id/approve").put(approveLeave)

router.route("/:id/reject").put(rejectLeave)
router
  .route("/:id")
  .get(getLeave)
  .delete(deleteLeave)
 

module.exports = router;
