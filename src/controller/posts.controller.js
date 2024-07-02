import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/Apierror.js"
import { Blogshtml } from "../utils/sendhtml.utils.js"
import { Blogs } from "../model/posts.model.js"


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

  let bloghtml = Blogshtml(blogs)
  res.status(200).send(bloghtml)
})







// Read all Blogs

const readBlog = asyncHandler(async (req, res) => {

    const allBlog = await Blogs.find().select("-_id")

    if (!allBlog) { throw new ApiError(401, "There is not Any Blog") }
   
    const allHtml = allBlog.map(blog => Blogshtml(blog)).join('');

    res.status(200).send(allHtml)


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

    let bloghtml = Blogshtml(getBlog)
    res.status(200).send(bloghtml)
})



// Update Blog

const updateBlog = asyncHandler(async (req, res) => {


    const { oldtitle, newtitle, newcontent, newauthor } = req.body

    if (!oldtitle) { throw new ApiError(400, "please provide the title of the blog you want to update") }

    if ((!newtitle) && (newcontent) && (newauthor)) { throw new ApiError(401, "Please prove the field you want to update") }

    let z = oldtitle.toLowerCase().replace(/ /g, '')


    const updateFields = {};

    if (newtitle) {
        updateFields.title = newtitle;
        updateFields.key = newtitle.toLowerCase().replace(/ /g, '')
    }

    if (newcontent) {
        updateFields.content = newcontent;
    }

    if (newauthor) {
        updateFields.author = newauthor;
    }

    const getBlog = await Blogs.findOneAndUpdate({ key: z },
        { $set: updateFields }, { new: true })


    if (!getBlog) { throw new ApiError(400, "Blog not found") }


    let bloghtml = Blogshtml(getBlog)
  res.status(200).send(bloghtml)

})




// Delete Blog

const deleteBlog = asyncHandler(async (req, res) => {


    const { key } = req.params;

   console.log(key);
   

    if (!key) {
        throw new ApiError(400, "Title is missing")

    }

    let a = key.toLowerCase()

    const getBlog = await Blogs.findOneAndDelete({ key: a })

    if (!getBlog) { throw new ApiError(400, "Blog not Found") }

    res.status(200).send("Deleted Successfully")




})



export { createBlog, readBlog, readThis, updateBlog, deleteBlog }