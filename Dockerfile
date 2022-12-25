# run with vite - error  http://localhost:24678/wp-content/themes/logotype-ssr/vue-vite-ssr/dist/static/

FROM node:latest

WORKDIR /usr/src/app

# # COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

# COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]