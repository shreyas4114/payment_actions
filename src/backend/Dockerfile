FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

# Copy source code
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
