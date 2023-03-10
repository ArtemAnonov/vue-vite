# run with vite - error  http://localhost:24678/wp-content/themes/logotype-ssg/vue-vite-ssg/dist/static/

FROM node:latest

WORKDIR /usr/src/app

# # COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

# COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]