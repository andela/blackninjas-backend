FROM node:10.16.3

WORKDIR /usr/src/index

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
