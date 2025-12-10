FROM node:20-alpine AS base

RUN npm install -g pnpm turbo
WORKDIR /app


FROM base as pruner

ARG PACKAGE_NAME

COPY . .
RUN turbo prune --scope=${PACKAGE_NAME} --docker


FROM base AS builder

ARG PACKAGE_NAME

COPY --from=pruner /app/tsconfig.json ./tsconfig.json
COPY --from=pruner /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/eslint.config.js ./eslint.config.js

COPY --from=pruner /app/out/json/ .

RUN pnpm install

COPY --from=pruner /app/out/full/ .

RUN pnpm --filter "${PACKAGE_NAME}..." run build
RUN pnpm --filter ${PACKAGE_NAME} --prod deploy ./deploy


FROM base AS runner

COPY --from=builder /app/deploy .

EXPOSE 3001

CMD ["node", "dist/main.js"]