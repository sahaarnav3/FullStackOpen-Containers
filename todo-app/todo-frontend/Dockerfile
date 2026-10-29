# Base Stage - Installing Dependencies
FROM node AS base-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Test Stage
FROM base-stage AS test-stage
COPY . .
RUN npm test

# Build Stage
FROM test-stage AS build-stage
ENV VITE_BACKEND_URL=/api
RUN npm run build

# Final 
FROM nginx:1.29-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html