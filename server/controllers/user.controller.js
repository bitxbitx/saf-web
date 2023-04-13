const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);
    res.json({ user });
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.json({ user });
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'User removed' });
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json({ users });
});

const createUser = asyncHandler(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ user });
});

module.exports = { getUser, updateUser, deleteUser, getUsers, createUser };