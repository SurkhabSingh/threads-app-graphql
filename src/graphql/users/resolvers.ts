import BlogService, { payloadBlog } from "../../service/blog";
import UserService, {
  CreateUserPayload,
  getUserTokenPayload,
} from "../../service/user";

const queries = {
  getUserToken: async (_: any, payload: getUserTokenPayload) => {
    const token = UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = UserService.getUserById(id);
      return user;
    }
    throw new Error("not working");
  },
  getAllBlogs: async (_: any, parameters: any) => {
    const allBlogs = await BlogService.getAllBlogs();
    // console.log(allBlogs);
    return allBlogs;
  },
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
  createBlog: async (_: any, payload: payloadBlog, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const blog = await BlogService.createBlog(payload, id);

      const data = {
        blogTitle: blog.blogTitle,
        userID: blog.userId,
        blogID: blog.id,
      };
      return JSON.stringify(data);
    }
    throw new Error("not working - blogs");
  },
  deleteBlog: async (_: any, { id }: any, context: any) => {
    // console.log(id);
    const result = await BlogService.deleteBlog(id);
    return result;
  },
  updateBlog: async (
    _: any,
    { id, blogTitle, bodyThread, blogImageUrl }: any,
    context: any
  ) => {
    const updatedBlog = await BlogService.updateBlog(
      { blogTitle, bodyThread, blogImageUrl },
      id
    );
    return updatedBlog;
  },
};

export const resolvers = { queries, mutations };
