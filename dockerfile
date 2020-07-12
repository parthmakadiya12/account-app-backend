FROM node:alpine as builder
LABEL stage=builder
RUN apk add --no-cache git
RUN apk add --no-cache openssh
WORKDIR /data
RUN git clone https://github.com/parthmakadiya12/account-app-test-frontend.git /data/app
WORKDIR /data/app
RUN npm install
RUN npm run build
COPY /build  ../../app/


FROM node:alpine
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
