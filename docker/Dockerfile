FROM node:16.13-alpine as base

RUN apk add --no-cache curl

ENV NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=100000"
USER node:node

RUN mkdir -p /home/node/star-wars
WORKDIR /home/node/star-wars

FROM base as dist

COPY --chown=node:node ./ ./

RUN npm install && npm run build


FROM base as development

COPY --chown=node:node --from=dist /home/node/star-wars ./

VOLUME /home/node/star-wars/node_modules /home/node/star-wars/dist
ENTRYPOINT ["docker/docker-entrypoint.sh"]

FROM base as production
COPY --chown=node:node --from=dist /home/node/star-wars ./

CMD ["/bin/sh", "-c", "npm run pre:start && node dist/main"]
