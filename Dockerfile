# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# add app
COPY . .

EXPOSE 3030

# start app
CMD ["npm", "start"]
