const asyncHandler = require("express-async-handler");
//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 200, message: "get all contactsssss cc" });
});

//@desc create contacts
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  res.status(201).json({ status: 200, message: "create contacts cc", name: req.body.name, email: req.body.email });
});

//@desc update contacts
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 200, message: `update contacts cc${req.params.id}` });
});

//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 200, message: `delete contacts cc${req.params.id}` });
});

//@desc Get Contact By Id
//@route GET /api/contacts/:id
//@access public

const getContactById = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 200, message: `get contacts cc ${req.params.id}` });
});

module.exports = { getContact, createContact, updateContact, deleteContact, getContactById };
