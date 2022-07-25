FROM node:14.16.0

COPY . .

RUN npm install
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]