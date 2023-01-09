# byte-integrated-management-system

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:
```bash
yarn install
```

Then, run this - it will start Next.js, Docker Compose and the GraphQL Codegen utility:

```bash
yarn dev
```

##### Useful Prisma/Database commands
| Description | Command |
| -- | -- |
| Seed the database | `yarn db:seed` |
| Run database migrations | `yarn db:migrate` |
| Open Prisma Studio (similar to phpMyAdmin for MySQL) | `yarn prisma studio` |
| Check database status | `yarn db:status` |
| Generate Prisma Client | `yarn prisma generate` |
| Reset database (deletes data!) without running any migrations | `yarn db:reset` |

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

There is currently one main [API route](https://nextjs.org/docs/api-routes/introduction) at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `pages/api/graphql.ts`. Visiting it in a browser will reach the GraphQL Playground (which is similar to Postman but for GraphQL)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/) - learn about Apollo GraphQL
- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm#) - learn about GraphQL Connections pattern
