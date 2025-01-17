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
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};

export const resolvers = { queries, mutations };
