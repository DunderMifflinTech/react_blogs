FROM node:18.4.0-alpine 

RUN mkdir /work

WORKDIR /work

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "preview" ]

