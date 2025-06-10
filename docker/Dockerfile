FROM node:24-alpine

COPY . /app
WORKDIR /app


RUN chown -R node:node /app && \
    npm install -g pnpm@latest && \
    pnpm install --frozen-lockfile

USER node