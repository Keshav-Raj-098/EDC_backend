class ApiError extends Error{
    constructor(statuscode,message="Something Went Wrong",errors = [])
        
        {

            super(message)
            this.statusCode=statuscode  
            this.data = null
            this.message = message
            this.success = false;
            this.errors = errors

           
        }

    
}

export {ApiError}