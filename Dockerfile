FROM node:12.2.0

EXPOSE 4000

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
RUN npm install -g prisma

CMD ["npm", "run", "start"]