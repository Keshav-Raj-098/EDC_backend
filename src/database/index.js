import mongoose from "mongoose";

const connectDB = async()=>{
    try {
       const connectionInstance =  await mongoose.connect("mongodb+srv://keshavraj09898:keshavraj098@cluster0.8aczbs8.mongodb.net/videotube")
      
       
       console.log(`\n MONGODB CONNECTED !! DB HOST : ${connectionInstance.connection.host}`);
       
    } catch (error) {

        console.log("MONGODB CONNECTION ERROR msg",error);
        process.exit(1)                
        
        
    }
}

export default connectDB;