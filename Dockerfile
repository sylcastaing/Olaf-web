FROM resin/raspberry-pi-alpine-node:7.10

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g @angular/cli @angular/compiler-cli

RUN npm install

COPY . /usr/src/app

RUN npm run build-prod

EXPOSE 4200

CMD ["npm", "run", "start-prod"]
