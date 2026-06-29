import mongoose from "mongoose";

const quotationRequestSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    requiredDate:{
        type:Date
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requied:true
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Published",
            "Closed"
        ],
        default:"Draft"
    }
},
{
    timestamps:true
});

export default mongoose.model(
    "QuotationRequest",
    quotationRequestSchema
);