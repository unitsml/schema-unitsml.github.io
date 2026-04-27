SHELL := /bin/bash

CONFIGS   := $(wildcard configs/*.yml)
LXR_FILES := $(patsubst configs/%.yml,build/%.lxr,$(CONFIGS))
SPA_FILES := $(patsubst configs/%.yml,site/%.html,$(CONFIGS))

all: site/index.html site/logo-unitsml.svg $(SPA_FILES)

# Generate per-schema config files and index JSON
configs: generate_configs.rb
	ruby generate_configs.rb

# Build a single LXR package from a config
build/%.lxr: configs/%.yml
	mkdir -p build
	bundle exec lutaml-xsd build from-config $< \
		--output $@ \
		--xsd-mode include_all \
		--resolution-mode resolved \
		--serialization-format marshal

# Generate a single SPA HTML from an LXR package
site/%.html: build/%.lxr
	mkdir -p site
	bundle exec lutaml-xsd spa $< \
		--mode inlined \
		--output $@

# Build the custom index page (Vite + Tailwind)
site/index.html: frontend/src/main.js frontend/src/style.css frontend/index.html frontend/package.json
	cd frontend && npm install --silent && npm run build

# Copy logo to site
site/logo-unitsml.svg: source/assets/logo-unitsml-noninverted.svg
	mkdir -p site
	cp $< $@

serve: all
	cd site && python3 -m http.server 4000

stop:
	lsof -ti:4000 | xargs kill -9 2>/dev/null || true

clean:
	rm -rf build site schemas_index.json

clean-spa:
	rm -f site/unitsml-*.html site/unitsmllite-*.html

update-init:
	git submodule update --init

update-modules:
	git submodule foreach git checkout main; \
	git submodule foreach git pull origin main

.PHONY: all configs clean clean-spa serve stop update-init update-modules
