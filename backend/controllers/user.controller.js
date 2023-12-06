import mongoose from "mongoose";
import User from "../models/userModel";
import { getToken } from "next-auth/jwt";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        if (error.code === 11000) {
            return res.status(400).json({ msg: "Duplicate Email Error" })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.query.user_id)
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const getUserFromSession = async (req, res) => {
    try {
        const token = await getToken({ req });
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const { email } = token;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.query.user_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        if (error.code === 11000) {
            return res.status(400).json({ msg: "Duplicate Email Error" })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.query.user_id)
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        return res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const getSuperUsersNotifications = async (req, res) => {
    try {
        const { email } = await getToken({ req });
        const user = await User.findOne({ email });

        if (user.superAdmin) {
            const requests = await User.find({ userStatus: 'pending' });
            return res.status(200).json({ user, result: requests.length, requests });
        }

        return res.status(200).json({ user, result: 0, requests: [] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const requestEdit = async (req, res) => {
    try {
        const { email } = await getToken({ req });
        const user = await User.findOne({ email });

        if (user.userStatus === 'pending') {
            return res.status(400).json({ msg: 'Request Already Sent' });
        } else if (user.userStatus === 'accepted') {
            return res.status(400).json({ msg: 'Already Accepted' });
        } else if (user.userStatus === 'rejected') {
            return res.status(400).json({ msg: 'Already Rejected' });
        }

        const updatedUser = await User.updateOne({ email }, { userStatus: 'pending' }, { new: true });
        return res.status(200).json({ msg: 'Request Sent', updatedUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const getPendingRequests = async (req, res) => {
    try {
        const { email } = await getToken({ req });
        const user = await User.findOne({ email });

        if (!user.role === 'admin') {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const requests = await User.find({ userStatus: 'pending' });
        return res.status(200).json({ results: requests.length, requests });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const updateRequest = async (req, res) => {
    try {
        const id = req.query.id;
        const access = req.query.access;

        if (access === 'true') {
            await User.findByIdAndUpdate(id, { userStatus: 'accepted' }, { new: true });
            return res.status(200).json({ msg: 'Request Accepted' });
        } else {
            await User.findByIdAndUpdate(id, { userStatus: 'rejected' }, { new: true });
            return res.status(200).json({ msg: 'Request Rejected' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}