const listHelper = require('./utils/list_helper')

const blogs = [
  { author: "John", likes: 3 },
  { author: "Anna", likes: 5 },
  { author: "John", likes: 7 }
]

console.log(listHelper.mostLikes(blogs))