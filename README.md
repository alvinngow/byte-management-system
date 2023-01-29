# byte-integrated-management-system

[![Playwright Tests](https://github.com/kr-pokectr/byte-integrated-management-system/actions/workflows/test.yml/badge.svg)](https://github.com/kr-pokectr/byte-integrated-management-system/actions/workflows/test.yml)
[![Build and Push Docker Image](https://github.com/kr-pokectr/byte-integrated-management-system/actions/workflows/build-docker-image.yml/badge.svg)](https://github.com/kr-pokectr/byte-integrated-management-system/actions/workflows/build-docker-image.yml)

> The Byte Integrated Management System (BIMS) is a central source of information for the organisation to manage all information pertaining to its classes.

## Getting Started
First, install dependencies:
```bash
yarn install
```

Then, run this - it will start Next.js, Docker Compose and the GraphQL Codegen utility:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> To get started with the database, you can run `yarn db:migrate` and `yarn db:seed`.

<details>
<summary>Development</summary>

You can start editing the page by modifying `pages/index.tsx`. It auto-updates as you edit the file.

There is currently one main [API route](https://nextjs.org/docs/api-routes/introduction) at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `pages/api/graphql.ts`. Visiting it in a browser will reach the GraphQL Playground (which is similar to Postman but for GraphQL)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

</details>

## Documentation Central
- [Prisma Procedures](./prisma/PRISMA.md)
- [Playwright UI Tests](./tests/ui/UI.md)
- [Jest Unit Tests](./tests/unit/UNIT.md)

## Learn More
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/) - learn about Apollo GraphQL
- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm#) - learn about GraphQL Connections pattern
