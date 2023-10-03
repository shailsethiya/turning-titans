###### Development environment ######
FROM docker.indianic.com/library/node:18.15.0-alpine3.16 as build
# FROM docker.indianic.com/library/node:16.14.0-alpine3.14 as build
WORKDIR /usr/src
ENV PATH /usr/src/node_modules/.bin:$PATH
COPY package.json ./package.json
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

FROM docker.indianic.com/library/nginx:reactjs-v1
COPY --from=build /usr/src/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 80

###### Production environment ######
# Stage 1: build stage
# FROM docker.indianic.com/library/node:18.15.0-alpine3.16 as builder
# RUN mkdir /app
# WORKDIR /app
# COPY ./package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Production deployment
# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# WORKDIR /app
# COPY ./package.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]