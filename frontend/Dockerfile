FROM node:alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npm run build


FROM node:alpine

RUN npm install -g serve

COPY --from=builder /app/build /app/serve

CMD ["serve", "-s", "-p", "3000", "/app/serve"]