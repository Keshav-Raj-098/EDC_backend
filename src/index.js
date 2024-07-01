
import connectDB from "./database/index.js"
import { app} from "./app.js"


// dotenv.config({
//   path:'./.env'
// })

connectDB()
.then(()=>{
  app.listen(3000,()=>{
    console.log(`server is running at : 3000`);
    
  })
})
.catch((err)=>{console.log(err);
})

