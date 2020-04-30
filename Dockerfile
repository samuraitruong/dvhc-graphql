FROM node:14.0-slim
WORKDIR /usr/app
COPY . .
RUN npm install --production
RUN npm build
ENV  PORT=8080
EXPOSE 8080
CMD node ./dist
