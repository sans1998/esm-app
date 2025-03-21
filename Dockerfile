FROM node:23.8.0-alpine

ARG MODE
ARG RUN_MODE

WORKDIR /app

COPY . .
RUN npm install
ENV HOST=0.0.0.0
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "npm run start"]
