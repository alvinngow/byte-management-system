FROM node:16-bullseye

WORKDIR /app

COPY . .

RUN yarn install && \
  yarn build

CMD ["yarn", "start"]

