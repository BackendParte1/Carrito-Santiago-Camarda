import {Schema,model} from "mongoose";

const productSchema=new Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String}
});

export default model("Prouct",productSchema);