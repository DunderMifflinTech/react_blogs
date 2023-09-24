FROM node:18.4.0-alpine as build 

RUN mkdir /work

WORKDIR /work

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /work/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

