FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /user/src/app

COPY package.json /user/src/app

RUN npm install --production

COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 4200

CMD ["npm", "start"]