FROM python:3.7.0

MAINTAINER Kristoffer Dalby


ENV NAME=aspargesgaarden

ENV DIR=/srv/app

RUN mkdir $DIR
WORKDIR $DIR

# Install requirements
COPY ./requirements $DIR/requirements
RUN pip install -r requirements/production.txt --upgrade

# Copy project files
COPY . $DIR

RUN mkdir -p static media
ENV DJANGO_SETTINGS_MODULE=$NAME.settings.base
RUN python manage.py collectstatic --noinput --clear
ENV DJANGO_SETTINGS_MODULE=$NAME.settings.production

EXPOSE 8080
EXPOSE 8081

CMD ["sh", "docker-entrypoint.sh"]
