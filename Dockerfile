FROM node:8

EXPOSE 8080
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

ENV HOST 0.0.0.0
ENV PORT 8080

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
