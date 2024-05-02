const asyncHandler = require("express-async-handler");
const noteList = require("../models/notesListModel");
//@desc get all notesList
//@route GET /api/noteslist
//@access private

const getNotesList = asyncHandler(async (req, res) => {
  console.log("GET in prog");
  const notesList = await noteList.find({ user_id: req.user.id });
  res.status(200).json({ status: 200, data: notesList });
});

//@desc create notesList
//@route POST /api/noteslist
//@access private

const createNotesList = asyncHandler(async (req, res) => {
  const { noteTitle, note } = req.body;
  if (!noteTitle || !note) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  try {
    const Today = new Date();
    const noteDetails = await noteList.create({
      noteTitle,
      note,
      createdAt: Today,
      user_id: req.user.id,
    });
    res.status(201).json({ status: 200, message: " note added create ", data: noteDetails });
  } catch (error) {
    console.log(error);
  }
});

//@desc update notesList
//@route PUT /api/noteslist/:id
//@access private

const updateNotesList = asyncHandler(async (req, res) => {
  const notesList = await noteList.findById(req.params.id);
  if (!notesList) {
    res.status(404);
    throw new Error("note id not found");
  }
  try {
    if (notesList.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update other users note");
    }

    const updatedNote = await noteList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: 200, message: `update notesList ${req.params.id}`, data: updatedNote });
  } catch (error) {
    console.log(error);
  }
});

//@desc add note to bin
//@route PUT /api/noteslist/bin/:id
//@access private

const addToBin = asyncHandler(async (req, res) => {
  const notesList = await noteList.findById(req.params.id);
  if (!notesList) {
    res.status(404);
    throw new Error("Note ID not found");
  }

  if (notesList.user_id.toString() !== req.user.id) {
    res.status(403).json({ status: 403, message: "You are not authorized to perform this action" });
    return;
  }

  try {
    const noteAddedToBin = await noteList.findByIdAndUpdate(req.params.id, { deletedNote: 1 }, { new: true });
    if (!noteAddedToBin) {
      res.status(404);
      throw new Error("Note ID not found");
    }
    res.status(200).json({ status: 200, message: `Note added to bin ${req.params.id}`, data: noteAddedToBin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

//@desc add note to bin
//@route PUT /api/noteslist/restoredfrombin/:id
//@access private

const restoredFromBin = asyncHandler(async (req, res) => {
  const notesList = await noteList.findById(req.params.id);
  if (!notesList) {
    res.status(404);
    throw new Error("Note ID not found");
  }

  if (notesList.user_id.toString() !== req.user.id) {
    res.status(403).json({ status: 403, message: "You are not authorized to perform this action" });
    return;
  }

  try {
    const noteAddedToBin = await noteList.findByIdAndUpdate(req.params.id, { deletedNote: 0 }, { new: true });
    if (!noteAddedToBin) {
      res.status(404);
      throw new Error("Note ID not found");
    }
    res.status(200).json({ status: 200, message: `Note restored from bin ${req.params.id}`, data: noteAddedToBin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

//@desc delete notesList
//@route DELETE /api/noteslist/:id
//@access private

const deleteNotesList = asyncHandler(async (req, res) => {
  const notesList = await noteList.findById(req.params.id);
  if (!notesList) {
    res.status(404);
    throw new Error("Note not found");
  }
  try {
    if (notesList.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update other users note");
    }

    await notesList.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: 200, message: `Note deleted ${req.params.id}`, data: notesList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

//@desc Get NotesList By Id
//@route GET /api/noteslist/:id
//@access private

const getNotesListById = asyncHandler(async (req, res) => {
  const notesList = await noteList.findById(req.params.id);
  if (!notesList) {
    res.status(404);
    throw new Error("note id not found");
  }
  try {
    res.status(200).json({ status: 200, message: ` notesList updated`, data: notesList });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { getNotesList, createNotesList, updateNotesList, deleteNotesList, getNotesListById, addToBin, restoredFromBin };
