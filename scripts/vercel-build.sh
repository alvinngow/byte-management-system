#!/bin/sh

yarn build

if [[ "$VERCEL_GIT_COMMIT_REF" == "production" ]] ; then
  echo "[VERCEL BUILD] Performing production database migration"
  DATABASE_URL=$DATABASE_NONPOOL_URL yarn prod:db:migrate
elif [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  echo "[VERCEL BUILD] Performing staging database migration"
  DATABASE_URL=$DATABASE_NONPOOL_URL yarn prod:db:migrate
else
  echo "[VERCEL BUILD] Performing preview database reset (incl. migration and seed)"
  DATABASE_URL=$DATABASE_NONPOOL_URL yarn db:reset --force
  DATABASE_URL=$DATABASE_NONPOOL_URL yarn db:seed
fi
