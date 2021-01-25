FROM node:12.2.0

EXPOSE 4000

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
RUN npm install -g prisma1
RUN npm install -g graphql
RUN npm install -g graphql-codegen

CMD ["npm", "run", "start"]
