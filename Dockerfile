# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm i -g pnpm
RUN pnpm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]