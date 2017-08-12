FROM resin/raspberry-pi-alpine-node:7.10

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

ENV NODE_ENV production

RUN npm run build-prod

EXPOSE 4200

CMD ["npm", "run", "start-prod"]
