FROM node:14.17.1-buster-slim as builder
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/
RUN mkdir node_modules && npm install

FROM node:14.17.1-buster-slim
RUN npm install -g gatsby-cli
RUN mkdir -p /srv/node_modules
COPY --from=builder /app/node_modules /srv/node_modules
