FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .


RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

ENV PORT 3000

EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
