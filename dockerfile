FROM node:alpine
WORKDIR /app/frontend
RUN apk add --no-cache git
RUN apk add --no-cache openssh
RUN git clone https://github.com/parthmakadiya12/account-app-test-frontend.git /app/frontend
RUN npm install
RUN npm run build
COPY /build  ../app/
RUN rm -rf app
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
