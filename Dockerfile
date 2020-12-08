FROM node

ENV APP_ROOT /src

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm ci

ENV HOST 0.0.0.0