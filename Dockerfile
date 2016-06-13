FROM alpine:3.4

MAINTAINER Kristoffer Dalby

EXPOSE 8080

ENV NAME=aspargesgaarden
ENV DIR=/srv/app

RUN apk update
RUN apk add postgresql-dev \
        mailcap \
        build-base \
        python3-dev \
        jpeg-dev \
        zlib-dev \
        python3 \
        linux-headers \
        pcre-dev

ENV LIBRARY_PATH=/lib:/usr/lib

WORKDIR $DIR

COPY . $DIR

RUN mkdir static media

RUN python3 -m pip install pip -U

RUN pip3 install -r requirements/production.txt --upgrade

ENV DJANGO_SETTINGS_MODULE=$NAME.settings.dev
RUN python3 manage.py collectstatic --noinput --clear

RUN apk del build-base \
        python3-dev

ENV DJANGO_SETTINGS_MODULE=$NAME.settings.prod

ENTRYPOINT ["/srv/app/docker-entrypoint.sh"]
