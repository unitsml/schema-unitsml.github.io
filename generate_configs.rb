#!/usr/bin/env ruby
# frozen_string_literal: true

# Generate per-schema lutaml-xsd config files for each UnitsML XSD schema

require "yaml"
require "json"

SCHEMAS = [
  { file: "schemas/unitsml/unitsml-v1.0.xsd",
    name: "UnitsML 1.0",
    version: "1.0",
    status: "current",
    prefix: "unitsml",
    namespace: "https://schema.unitsml.org/unitsml/1.0" },
  { file: "schemas/unitsml/unitsml-v1.0-csd04.xsd",
    name: "UnitsML 1.0 CSD04",
    version: "1.0-csd04",
    status: "draft",
    prefix: "unitsml-csd",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-1.0" },
  { file: "schemas/unitsml/unitsml-v0.9.19.xsd",
    name: "UnitsML 0.9.19",
    version: "0.9.19",
    status: "historical",
    prefix: "unitsml-0919",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.19" },
  { file: "schemas/unitsml/unitsml-v0.9.12.xsd",
    name: "UnitsML 0.9.12",
    version: "0.9.12",
    status: "historical",
    prefix: "unitsml-0912",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.12" },
  { file: "schemas/unitsml/unitsml-v0.9.10.xsd",
    name: "UnitsML 0.9.10",
    version: "0.9.10",
    status: "historical",
    prefix: "unitsml-0910",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.10" },
  { file: "schemas/unitsml/unitsml-v0.9.7.xsd",
    name: "UnitsML 0.9.7",
    version: "0.9.7",
    status: "historical",
    prefix: "unitsml-097",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.7" },
  { file: "schemas/unitsml/unitsml-v0.9.2.xsd",
    name: "UnitsML 0.9.2",
    version: "0.9.2",
    status: "historical",
    prefix: "unitsml-092",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.2" },
  { file: "schemas/unitsml/unitsml-v0.9.xsd",
    name: "UnitsML 0.9",
    version: "0.9",
    status: "historical",
    prefix: "unitsml-09",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9" },
  { file: "schemas/unitsmllite/unitsmllite-v0.9.18.xsd",
    name: "UnitsML-Lite 0.9.18",
    version: "0.9.18",
    status: "deprecated",
    prefix: "unitsml-lite",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema_lite-0.9.18" },
].freeze

config_dir = File.join(__dir__, "configs")
Dir.mkdir(config_dir) unless Dir.exist?(config_dir)

# Generate per-schema config YAML files
SCHEMAS.each do |schema|
  slug = File.basename(schema[:file], ".xsd")
  config = {
    "metadata" => {
      "name" => schema[:name],
      "version" => schema[:version],
      "title" => "#{schema[:name]} Schema Browser",
      "description" => "Interactive documentation for the #{schema[:name]} XML schema.",
      "license" => "OASIS",
    },
    "build" => {
      "xsd_mode" => "include_all",
      "resolution_mode" => "resolved",
      "serialization_format" => "marshal",
    },
    "files" => ["../#{schema[:file]}"],
    "namespace_mappings" => [
      { "prefix" => "xs", "uri" => "http://www.w3.org/2001/XMLSchema" },
      { "prefix" => schema[:prefix], "uri" => schema[:namespace] },
    ],
    "appearance" => {
      "logos" => {
        "long" => {
          "light" => { "path" => "../images/logo-unitsml.svg" },
          "dark" => { "path" => "../images/logo-unitsml.svg" },
        },
        "lutaml_logo" => {
          "light" => { "url" => "https://raw.githubusercontent.com/lutaml/branding/main/svg/lutaml-logo_logo-full-light.svg" },
          "dark" => { "url" => "https://raw.githubusercontent.com/lutaml/branding/main/svg/lutaml-logo_logo-full-dark.svg" },
        },
      },
      "colors" => {
        "primary" => "#2d2c69",
        "primary_light" => "#57a0fe",
        "primary_dark" => "#1a1950",
        "accent" => "#30dfc0",
        "background_primary" => "#ffffff",
        "background_secondary" => "#f8fafc",
      },
    },
  }

  path = File.join(config_dir, "#{slug}.yml")
  File.write(path, YAML.dump(config).gsub("---", "# #{schema[:name]}\n---"))
  puts "Generated: #{path}"
end

# Generate schema index JSON for the index page
index = SCHEMAS.map do |schema|
  slug = File.basename(schema[:file], ".xsd")
  {
    "name" => schema[:name],
    "version" => schema[:version],
    "status" => schema[:status],
    "namespace" => schema[:namespace],
    "xsd_path" => schema[:file],
    "browser_path" => "#{slug}.html",
  }
end

index_path = File.join(__dir__, "schemas_index.json")
File.write(index_path, JSON.pretty_generate(index))
puts "Generated: #{index_path}"
