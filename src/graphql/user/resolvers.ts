import userService, { CreateUserPayload } from "../../services/userService";

const queries = {};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await userService.createUser(payload);
    return res.id;
  },
};

export const resolvers = {
  queries,
  mutations,
};
