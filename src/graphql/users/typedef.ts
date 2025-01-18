export const typeDefs = `#graphql
type User {
  id:ID!
  firstName:String!
  lastName:String
  email:String!
  profileImageUrl:String
}
type Blog {
  id:ID!
  userId:ID!
  blogTitle:String!
  bodyThread:String!
  blogImageUrl:String
}
`;
