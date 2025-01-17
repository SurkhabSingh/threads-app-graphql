import UserService, {
  CreateUserPayload,
  getUserTokenPayload,
} from "../../service/user";

const queries = {
  getUserToken: async (_: any, payload: getUserTokenPayload) => {
    const token = UserService.getUserToken(payload);
    return token;
  },
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};

export const resolvers = { queries, mutations };
