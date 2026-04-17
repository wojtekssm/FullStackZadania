const dummy = (blogs) => {
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
  const maxRepeats = authors.reduce((max, u) => Math.max(max, u.repeats), 0);
  const topAuthor = authors.some(author => author.repeats = maxRepeats)
  return {author: topAuthor, blogs:maxRepeats}
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}