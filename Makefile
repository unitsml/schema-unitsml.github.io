SHELL := /bin/bash

all: _site

clean:
	rm -rf _site build_source

distclean: clean
	$(MAKE) -C schemas distclean

docs/unitsml/unitsml-v1.0/index.html:
	$(MAKE) -C schemas

build_source: docs/unitsml/unitsml-v1.0/index.html
	mkdir -p $@; \
	cp -a source/* build_source; \
	cp -a schemas/* build_source;

_site: build_source
	bundle exec jekyll build

serve: _site
	bundle exec jekyll serve --trace

update-init:
	git submodule update --init

update-modules:
	git submodule foreach git checkout main; \
	git submodule foreach git pull origin main

.PHONY: all clean distclean serve update-init update-modules
