SHELL := /bin/bash

all: _site

clean:
	rm -rf _site build_source

doc/unitsml/unitsml-v1.0-csd04/index.html:
	$(MAKE) -C schemas

build_source: doc/unitsml/unitsml-v1.0-csd04/index.html
	mkdir -p $@; \
	cp -a source/* build_source; \
	rm -rf schemas/xsl schemas/xsdvi; \
	cp -a schemas/* build_source;

_site: build_source
	bundle exec jekyll build

serve: _site
	bundle exec jekyll serve --trace


update-init:
	git submodule update --init

update-modules:
	git submodule foreach git checkout master; \
	git submodule foreach git pull origin master

.PHONY: all clean serve update-init update-modules
