# pull official base image
FROM node:16 AS builder

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# add app
COPY . .

# Build the project and copy the files
RUN npm run build

EXPOSE 3030

# start app
CMD ["npm", "start"]