const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  )
}

const mostBlogs = (blogs) => {
  let authors = []
  blogs.forEach(element => {
    let author = authors.find(author => author.name === element.author)
    if(author){
      author.repeats++
    }else{
      authors.push({name: element.author, repeats: 1})
    }
  })
  const maxRepeats = authors.reduce((max, u) => Math.max(max, u.repeats), 0)
  let topAuthor = ''
  authors.forEach(author => {
    if(author.repeats == maxRepeats){
      topAuthor = author.name
    }
  })
  return {author: topAuthor, blogs:maxRepeats}
}

const mostLikes = (blogs) =>{
  let authors = []
  blogs.forEach(blog => {
    let author = authors.find(author => author.name === blog.author)
    if(author){
      author.likes += blog.likes
    }else{
      authors.push({name: blog.author, likes: blog.likes})
    }
  })
  const maxLikes = authors.reduce((max, element) => Math.max(max, element.likes), 0)
  let topAuthor = ''
  authors.forEach(author => {
    if(author.likes == maxLikes){
      topAuthor = author.name
    }
  })

  return{author: topAuthor, likes:maxLikes}
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}