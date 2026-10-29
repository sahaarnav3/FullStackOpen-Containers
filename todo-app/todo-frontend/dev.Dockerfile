FROM node

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL="http://127.0.0.1:3000/"

RUN npm ci 

CMD ["npm", "run", "dev", "--", "--host"]