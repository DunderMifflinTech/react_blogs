FROM node:18.4.0-alpine 

RUN mkdir /work

WORKDIR /work

COPY . ./work

RUN npm install

RUN npm run build

RUN npm run preview

