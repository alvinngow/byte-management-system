# Prisma

### Useful Prisma/Database commands
| Description                                                   | Command                |
|---------------------------------------------------------------|------------------------|
| Seed the database                                             | `yarn db:seed`         |
| Run database migrations                                       | `yarn db:migrate`      |
| Open Prisma Studio (similar to phpMyAdmin for MySQL)          | `yarn prisma studio`   |
| Check database status                                         | `yarn db:status`       |
| Generate Prisma Client                                        | `yarn prisma generate` |
| Reset database (deletes data!) without running any migrations | `yarn db:reset`        |

### Useful Procedures

<details>
<summary>Creating a migration</summary>

1. Update `schema.prisma` with new tables/columns/etc.
2. Run `yarn db:migrate`
3. The CLI should prompt to enter a name. This name will be used for a `.sql` file that is generated under `prisma/migrations/`.

</details>

<details>
<summary>Undo a botched migration</summary>

Unfortunately, undoing isn't possible. What you'll have to do instead is to:

1. Delete the `.sql` files (under `prisma/migrate/`) belonging to the botched migration
2. Do `yarn db:reset`

The database will be erased, migrations re-run (those `.sql` files that remain) and then re-seeded.

</details>