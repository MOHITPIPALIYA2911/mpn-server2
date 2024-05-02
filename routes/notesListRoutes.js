const express = require("express");
const router = express.Router();
const { getNotesList, createNotesList, updateNotesList, deleteNotesList, getNotesListById, addToBin, restoredFromBin } = require("../controllers/notesListController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getNotesList).post(createNotesList);
router.route("/:id").put(updateNotesList).get(getNotesListById).delete(deleteNotesList);
router.route("/bin/:id").put(addToBin);
router.route("/restoredfrombin/:id").put(restoredFromBin);

module.exports = router;
