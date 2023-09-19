import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  const name = "name";

  const users = await trpc.userList.query();
  console.info("Users: ", users);

  const createdUser = await trpc.userCreate.mutate({
    name,
  });
  console.log("Created User: ", createdUser);

  const user = await trpc.userFindBy.query({ name });
  console.info("User: ", user);

  const searchedUsers = await trpc.userWhere.query({ name });
  console.info("SearchedUsers: ", searchedUsers);
}

main().catch(console.error);
