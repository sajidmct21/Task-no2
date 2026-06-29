import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
{
    action:{
        type:String,
        required:true
    },

    performedBy:{
        type:String
    },

    module:{
        type:String
    },

    referenceId:{
        type:mongoose.Schema.Types.ObjectId
    }
},
{
    timestamps:true
});

export default mongoose.model(
    "ActivityLog",
    activityLogSchema
);