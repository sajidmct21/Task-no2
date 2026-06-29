import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
{
    vendorName:{
        type:String,
        required:true,
        trim:true
    },

    companyName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    contactNumber:{
        type:String,
        required:true
    },

    businessAddress:{
        type:String,
        required:true
    },

    taxNumber:{
        type:String
    },

    category:{
        type:String
    },

    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

export default mongoose.model("Vendor",vendorSchema);