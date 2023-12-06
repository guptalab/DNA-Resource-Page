import mongoose from "mongoose";

export const getAllData = async (Model, req, res) => {
    try {
        const data = await Model.find({})
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const createData = async (Model, req, res) => {
    try {
        const data = await Model.create(req.body)
        return res.status(201).json(data);
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const getData = async (Model, req, res) => {
    try {
        const data = await Model.findById(req.query.data_id)
        if (!data) {
            return res.status(404).json({ msg: `${Model.modelName} Not Found` })
        }
        return res.status(200).json(data);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const updateData = async (Model, req, res) => {
    try {
        const data = await Model.findByIdAndUpdate(req.query.data_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!data) {
            return res.status(404).json({ msg: `${Model.modelName} Not Found` })
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deleteData = async (Model, req, res) => {
    try {
        const data = await Model.findByIdAndDelete(req.query.data_id)
        if (!data) {
            return res.status(404).json({ msg: `${Model.modelName} Not Found` })
        }
        return res.status(200).json({ msg: `${Model.modelName} deleted` });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}