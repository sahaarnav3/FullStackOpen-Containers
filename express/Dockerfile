FROM node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=express:*

USER node

CMD ["npm", "start"]