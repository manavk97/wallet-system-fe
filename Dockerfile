# Base image
FROM node:21-alpine As production

ENV NODE_ENV=development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build
# Bundle app source

EXPOSE 3000
# Start the server using the production build
CMD [ "npm", "run", "start" ]