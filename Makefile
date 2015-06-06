PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
REBAR := ./rebar

all: get-deps compile compile-app

get-deps:
	$(REBAR) get-deps
	npm install

build.css:
	mkdir -p priv/static/css
	lessc less/style.less priv/static/css/bundle.css
	autoprefixer priv/static/css/bundle.css

build.js:
	mkdir -p priv/static/js
#       browserify frontend/js/app.js -o public/javascripts/bundle.js
	cp js/* priv/static/js/

build: build.js build.css
	cp -rv img priv/static/

watch.css:
	nodemon -I -w less/ --ext less --exec 'make build.css'

watch.js:
	watchify js/app.js -o priv/static/js/bundle.js -v

watch: watch.css watch.js

jshint:
	jshint --reporter node_modules/jshint-stylish/stylish.js js/; true

run:
	./init-dev.sh

compile:
	$(REBAR) compile

compile-app:
	$(REBAR) boss c=compile

help:
	@echo 'Makefile for your chicagoboss app                                      '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make help                        displays this help text            '
	@echo '   make get-deps                    updates all dependencies           '
	@echo '   make compile                     compiles dependencies              '
	@echo '   make compile-app                 compiles only your app             '
	@echo '                                    (so you can reload via init.sh)    '
	@echo '   make all                         get-deps compile compile-app       '
	@echo '                                                                       '
	@echo 'DEFAULT:                                                               '
	@echo '   make all                                                            '
	@echo '                                                                       '

.PHONY: all get-deps compile compile-app help
