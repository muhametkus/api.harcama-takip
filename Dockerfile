FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS build
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
