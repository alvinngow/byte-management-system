#!/bin/sh

yarn build
DATABASE_URL=$DATABASE_NONPOOL_URL yarn prod:db:migrate
