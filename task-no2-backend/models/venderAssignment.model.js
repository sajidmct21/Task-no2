import mongoose from "mongoose";

const vendorAssignmentSchema = new mongoose.Schema(
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

    assignedDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:[
            "Assigned",
            "Viewed",
            "Responded"
        ],
        default:"Assigned"
    }
},
{
    timestamps:true
});

export default mongoose.model(
    "VendorAssignment",
    vendorAssignmentSchema
);