import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/Apierror.js"
import { Comment } from "../model/comments.model.js"
import { Commenthtml } from "../utils/sendhtml.utils.js"



// key should be a single word/letter/number
const createComments = asyncHandler(async (req, res) => {

    const { content, author, key } = req.body

    if (!content) { throw new ApiError(400, "Content missing") }
    if (!author) { throw new ApiError(400, "author missing") }
    if (!key) { throw new ApiError(400, "key missing") }


    const existingKey = await Comment.findOne({ key })

    if (existingKey) { throw new ApiError(402, "Try a different key") }


    const comment = await Comment.create({content,author,key})

    if (!comment) { throw new ApiError(400, "Unable to Create comment now") }

    let result = Commenthtml(comment)
    res.status(200).send(result)

})


// read all comments


const readComments = asyncHandler(async (req, res) => {

    const allComments = await Comment.find().select("-_id")

    console.log(allComments);

    if (!allComments[0]) { throw new ApiError(401, "There is not any comment ") }

    const allHtml = allComments.map(comment => Commenthtml(comment)).join('');

    res.status(200).send(allHtml)

})

// read a specific comment


const readThis = asyncHandler(async (req, res) => {

    const { key } = req.params

    const comment = await Comment.findOne({ key: key }).select("-_id")

    if (!comment) { throw new ApiError(403, `key ${key} not found `) }


    let result = Commenthtml(comment)
    res.status(200).send(result)


})



// update Comment

const updateComments = asyncHandler(async (req, res) => {

    const { key, newcontent, newauthor } = req.body

    if (!key) { throw new ApiError(401, "Please provide the key to find comment") }

    if ((!newauthor) && (!newcontent)) { throw new ApiError(405, "Either give newcontent or new Author to update") }


    const updateFields = {}

    if (newcontent) {
        updateFields.content = newcontent;
    }

    if (newauthor) {
        updateFields.author = newauthor;
    }

    const comment = await Comment.findOneAndUpdate({ key },
        { $set: updateFields }, { new: true }).select("-_id")

    if (!comment) { throw new ApiError(403, `Comment with ${key} not found `) }


    let result = Commenthtml(comment)
    res.status(200).send(result)

})

// delete comment

const deleteComments = asyncHandler(async (req, res) => {
    const { key } = req.params

    if (!key) { throw new ApiError(400, "`Comment with ${key} not found `") }

    const deletedComment = await Comment.findOneAndDelete({ key: key })

    if (!deletedComment) { throw new ApiError(200, "Unable to findd and delte the comment") }

    res.status(200).send("Deleted Successfully")

})



export { createComments, readComments, readThis, updateComments, deleteComments }