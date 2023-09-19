type User = { id: string; name: string };

const users: User[] = [];

export const virtualDB = {
  user: {
    findMany: async () => users,
    findBy: async (query: { name?: string, id?: string }) => users.find((user) => query?.name && user.name === query.name || query?.id && user.id === query.id),
    findById: async (id: string) => users.find((user) => user.id === id),
    findWhere: async (query: { name?: string }) => users.filter((user) => query?.name && user.name === query.name),
    create: async (data: { name: string }) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};
