import { promiseHooks } from "v8";
import { prismaClient } from "../lib/db";

export interface payloadBlog {
  blogTitle: string;
  bodyThread: string;
  blogImageUrl?: string;
}

class BlogService {
  public static async createBlog(payload: payloadBlog, id: string) {
    const { blogTitle, bodyThread, blogImageUrl } = payload;
    const blog = await prismaClient.blog.create({
      data: {
        blogTitle,
        bodyThread,
        blogImageUrl,
        userId: id,
      },
    });
    return blog;
  }
  public static async getAllBlogs() {
    return await prismaClient.blog.findMany();
  }

  public static async deleteBlog(id: string) {
    return await prismaClient.blog.delete({ where: { id } });
  }

  public static async updateBlog(payload: payloadBlog, id: string) {
    const { blogTitle, bodyThread, blogImageUrl } = payload;
    const updatedBlog = await prismaClient.blog.update({
      where: { id },
      data: {
        blogTitle,
        bodyThread,
        blogImageUrl,
      },
    });
    return updatedBlog;
  }
}

export default BlogService;
