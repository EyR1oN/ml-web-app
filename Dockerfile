FROM node:latest

WORKDIR /ml-web-app

COPY . /ml-web-app

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
