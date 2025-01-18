export const mutations = `#graphql
createUser(firstName: String!,lastName: String,email: String!,password: String!):String
createBlog(blogTitle:String!,bodyThread:String!,blogImageUrl:String):String
deleteBlog(id:ID!):Blog
updateBlog(id:ID!,blogTitle:String!,bodyThread:String!,blogImageUrl:String):Blog
`;
