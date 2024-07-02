import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { Blogs } from "../model/posts.model.js"
import { get } from "mongoose"


// Create Blog

const createBlog = asyncHandler(async (req, res) => {

    const { title, content, author } = req.body


    if (!title) { throw new ApiError(401, "title required") }
    if (!content) { throw new ApiError(401, "content required") }
    if (!author) { throw new ApiError(401, "author required") }


    let x = title.toLowerCase().replace(/ /g, '')

    const titleExist = await Blogs.findOne({ key: x })




    if (titleExist) { throw new ApiError(401, "Try different title") }

    const blogs = await Blogs.create({
        title, content, author,
        key: x
    })



    if (!blogs) { throw new ApiError(400, "Can't fetch blogs now") }


    return res.status(200).json(
        new Apiresponse(200, blogs, "post created,fetch with /posts")
    )
})







// Read all Blogs

const readBlog = asyncHandler(async (req, res) => {

    const allBlog = await Blogs.find().select("-_id")

    if (!allBlog) { throw new ApiError(401, "There is not Any Blog") }

    res.send(allBlog)

})



// Read specific Blogs

const readThis = asyncHandler(async (req, res) => {

    const { key } = req.params;



    if (!key) {
        throw new ApiError(400, "Title is missing")

    }

    let y = key.toLowerCase()

    const getBlog = await Blogs.findOne({ key: y });

    if (!getBlog) { throw new ApiError(401, "Blog does't Exist") }

    res.send(getBlog)



})













// Update Blog

const updateBlog = asyncHandler(async (req, res) => {


    const { oldtitle, newtitle, newcontent, newauthor } = req.body

    if (!oldtitle) { throw new ApiError(400, "please provide the title of the blog you want to update") }

    if ((!newtitle) && (newcontent) && (newauthor)) 
        { throw new ApiError(401, "Please prove the field you want to update") }

    let z = oldtitle.toLowerCase().replace(/ /g, '')
    console.log(z);


    const updateFields = {};

    if (newtitle) {
        updateFields.title = newtitle;
        updateFields.key = newtitle.toLowerCase().replace(/ /g, '')
    }

    if (newcontent) {
        updateFields.content = newcontent; // Correcting the typo from "contennt" to "content"
    }

    if (newauthor) {
        updateFields.author = newauthor;
    }

    console.log(updateFields);


    const getBlog = await Blogs.findOneAndUpdate({ key: z },
         { $set: updateFields }, { new: true })


    if (!getBlog) { throw new ApiError(400, "Blog not found") }


    res.status(200).json(
        new Apiresponse(200, getBlog, "updated Successfully")
    )

})




// Delete Blog

const deleteBlog = asyncHandler(async (req, res) => {

    
    const { key } = req.params;



    if (!key) {
        throw new ApiError(400, "Title is missing")

    }

    let a = key.toLowerCase()

    const getBlog = await Blogs.findOneAndDelete({key:a})

    if(!getBlog){throw new ApiError(400,"Unable to delete the blog")}

    res.status(200).json(new Apiresponse(200,{},"Deleted Successfully"))




})











export { createBlog, readBlog, readThis, updateBlog, deleteBlog }