import mongoose from "mongoose";

import { Contest } from "../models/contest.model.js";

import { ApiError } from "../utils/ApiError.js";

export const validateContest =
async (req,res,next)=>{

    const { contestId } = req.params;

    if(
        !mongoose.Types.ObjectId
        .isValid(contestId)
    ){
        throw new ApiError(
            400,
            "Invalid contest id"
        );
    }

    const contest =
    await Contest.findById(contestId);

    if(!contest){
        throw new ApiError(
            404,
            "Contest not found"
        );
    }

    req.contest = contest;

    next();
}