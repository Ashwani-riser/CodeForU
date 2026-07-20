import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    }],

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    isPublic: {
        type: Boolean,
        default: true
    },

    status: {
        type: String,
        enum: [
            "UPCOMING",
            "RUNNING",
            "ENDED"
        ],
        default: "UPCOMING"
    }

}, { timestamps: true });

export const Contest =
mongoose.model("Contest", contestSchema);