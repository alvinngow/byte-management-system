FROM node:16-bullseye

WORKDIR /app

COPY . .

RUN yarn install && \
  yarn add sharp && \
  yarn build

CMD ["yarn", "start"]

