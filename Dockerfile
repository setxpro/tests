# Stage 1 - Instalação node_modules apenas dos pacotes de produção
FROM node:16-alpine as prodmodules
LABEL stage="production-modules"
WORKDIR /app
COPY ./package.json /app
RUN npm install --omit=dev

# Stage 2 - Instalação completa para build da aplicação
FROM prodmodules AS buildstage
LABEL stage="builder"
RUN npm install
COPY . /app
RUN npm run build

# Stage 3 - Container final para deploy
FROM node:16-alpine
ARG BUILD_DATE=today
RUN apk update \
    && apk add chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      python3 \
      make \
      g++ \
      bash \
      tzdata \
    && rm -rf /var/cache/apt/*
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm install -g puppeteer@16.2.0
ENV TZ=America/Sao_Paulo
ENV TimeZone=America/Sao_Paulo
ENV BUILD_DATE=${BUILD_DATE}
ENV PORT=from_compose
ENV SMTP_HOST=from_compose
ENV SMTP_PORT=from_compose
ENV SMTP_USER=from_compose
ENV SMTP_PASS=from_compose

WORKDIR /app
COPY --from=buildstage /app/dist/ /app/
COPY --from=prodmodules /app/node_modules /app/node_modules
COPY ./package.json /app
RUN echo $BUILD_DATE
CMD [ "npm", "run", "start:docker" ]

