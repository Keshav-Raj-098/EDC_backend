
import connectDB from "./database/index.js"
import { app} from "./app.js"


connectDB()
.then(()=>{
  app.listen(3000,()=>{
    console.log(`server is running at : 3000`);
    
  })
})
.catch((err)=>{console.log(err);
})

