
const Commenthtml = function(comment) {

    let myhtml =  `

    <div style="border: 1px solid black; margin-bottom:10px;">
    <ol>
    
    <li>Author :- ${comment.author}</li>
    <li>Content :- ${comment.content}</li>
    <li>key :- ${comment.key}</li>
    <li>CreatedAt :- ${comment.createdAt}</li>
    <li>UpdatedAt :- ${comment.updatedAt}</li>    
    </ol></div>`

    return myhtml

}

const Blogshtml = function(blog) {

    let myhtml =  `

    <div style="border: 1px solid black; margin-bottom:10px;">
    <ol>
    
    <li>Title :- ${blog.title}</li>
    <li>Content :- ${blog.content}</li>
    <li>Author :- ${blog.author}</li>
    <li>key :- ${blog.key}</li>
    <li>CreatedAt :- ${blog.createdAt}</li>
    <li>UpdatedAt :- ${blog.updatedAt}</li>    
    </ol></div>`

    return myhtml

}

const userhtml = function(user,msg) {

    let myhtml =  `

    <div style="border: 1px solid black;">
    <ol>
    <li>Message :- ${msg}</li>    
    <li>Full Name :- ${user.fullname}</li>
    <li>Username :- ${user.username}</li>
    <li>Email :- ${user.email}</li>
    <li>CreatedAt :- ${user.createdAt}</li>
    <li>UpdatedAt :- ${user.updatedAt}</li>    
    </ol></div>`

    return myhtml

}




export {Commenthtml,Blogshtml,userhtml}