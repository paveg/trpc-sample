import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  const users = await trpc.userList.query()
  console.info('Users: ', users);

  const createdUser = await trpc.userCreate.mutate({
    name: 'test'
  });
  console.log('Created User: ', createdUser);


  const knownUsers = await trpc.userList.query()
  console.info('Users: ', knownUsers)
}

main().catch(console.error);
