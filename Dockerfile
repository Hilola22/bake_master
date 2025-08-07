FROM node:alpine as builder
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npx prisma migrate
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ] 
