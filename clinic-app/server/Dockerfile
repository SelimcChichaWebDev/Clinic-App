FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

ENV PORT=3200

EXPOSE ${PORT}

CMD [ "bun", "dev" ]