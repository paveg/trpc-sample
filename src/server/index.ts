import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { virtualDB } from './virtualDB';
import { publicProcedure, router } from "./trpc";
import { z } from 'zod';

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await virtualDB.user.findMany();
    return users;
  }),
  userFindById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await virtualDB.user.findById(input);
    return user;
  }),
  userFindBy: publicProcedure.input(z.object({ name: z.string().optional(), id: z.string().optional() })).query(async (opts) => {
    const { input } = opts;
    const user = await virtualDB.user.findBy(input);
    return user;
  }),
  userWhere: publicProcedure.input(z.object({ name: z.string().optional() })).query(async (opts) => {
    const { input } = opts;
    const users = await virtualDB.user.findWhere(input);
    return users;
  }),
  userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation(async (opts) => {
    const { input } = opts;
    const user = await virtualDB.user.create(input);
    return user;
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
