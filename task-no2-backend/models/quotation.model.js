import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
{
    quotationRequest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"QuotationRequest",
        required:true
    },

    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    quotationAmount:{
        type:Number,
        required:true
    },

    remarks:{
        type:String
    },

    submissionDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Submitted",
            "Approved",
            "Rejected"
        ],
        default:"Submitted"
    }
},
{
    timestamps:true
});

export default mongoose.model(
    "Quotation",
    quotationSchema
);