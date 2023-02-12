import mongoose from "mongoose";

async function connDB () {
    mongoose.set('strictQuery', false)
    return await mongoose.connect(process.env.USER_DB_URI)
}

export default connDB