import './style.css'

const schemas = [
  {
    name: "UnitsML 1.0",
    version: "1.0",
    status: "current",
    namespace: "https://schema.unitsml.org/unitsml/1.0",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v1.0.xsd",
    browser_path: "unitsml-v1.0.html",
    description: "Current release of the UnitsML schema for representing units of measure, dimensions, and quantities in XML."
  },
  {
    name: "UnitsML 1.0 CSD04",
    version: "1.0-csd04",
    status: "draft",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-1.0",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v1.0-csd04.xsd",
    browser_path: "unitsml-v1.0-csd04.html",
    description: "Committee Specification Draft 04 — a pre-release draft of UnitsML 1.0."
  },
  {
    name: "UnitsML 0.9.19",
    version: "0.9.19",
    status: "historical",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.19",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v0.9.19.xsd",
    browser_path: "unitsml-v0.9.19.html",
    description: "Historical release of the UnitsML 0.9.x schema series."
  },
  {
    name: "UnitsML 0.9.12",
    version: "0.9.12",
    status: "historical",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.12",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v0.9.12.xsd",
    browser_path: "unitsml-v0.9.12.html",
    description: "Historical release of the UnitsML 0.9.x schema series."
  },
  {
    name: "UnitsML 0.9.10",
    version: "0.9.10",
    status: "historical",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.10",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v0.9.10.xsd",
    browser_path: "unitsml-v0.9.10.html",
    description: "Historical release of the UnitsML 0.9.x schema series."
  },
  {
    name: "UnitsML 0.9.7",
    version: "0.9.7",
    status: "historical",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.7",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v0.9.7.xsd",
    browser_path: "unitsml-v0.9.7.html",
    description: "Historical release of the UnitsML 0.9.x schema series."
  },
  {
    name: "UnitsML 0.9.2",
    version: "0.9.2",
    status: "historical",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9.2",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v0.9.2.xsd",
    browser_path: "unitsml-v0.9.2.html",
    description: "Historical release of the UnitsML 0.9.x schema series."
  },
  {
    name: "UnitsML 0.9",
    version: "0.9",
    status: "historical",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema-0.9",
    xsd_url: "https://schema.unitsml.org/unitsml/unitsml-v0.9.xsd",
    browser_path: "unitsml-v0.9.html",
    description: "Original 0.9 release of the UnitsML schema."
  },
  {
    name: "UnitsML-Lite 0.9.18",
    version: "0.9.18",
    status: "deprecated",
    namespace: "urn:oasis:names:tc:unitsml:schema:xsd:UnitsMLSchema_lite-0.9.18",
    xsd_url: "https://schema.unitsml.org/unitsmllite/unitsmllite-v0.9.18.xsd",
    browser_path: "unitsmllite-v0.9.18.html",
    description: "Deprecated lightweight variant of the UnitsML schema. Use UnitsML 1.0 instead."
  }
]

const statusConfig = {
  current:    { label: 'Current',    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  draft:      { label: 'Draft',      badge: 'bg-amber-50 text-amber-700 border border-amber-200' },
  historical: { label: 'Historical', badge: 'bg-slate-100 text-slate-600 border border-slate-200' },
  deprecated: { label: 'Deprecated',  badge: 'bg-red-50 text-red-600 border border-red-200' },
}

function renderCard(schema, index) {
  const s = statusConfig[schema.status]
  const isCurrent = schema.status === 'current'
  const isDeprecated = schema.status === 'deprecated'

  const cardClass = [
    'group block relative rounded-xl border transition-all duration-300 animate-fade-in-up',
    isCurrent
      ? 'border-navy-200 bg-white shadow-lg hover:shadow-xl hover:border-navy-300'
      : isDeprecated
        ? 'border-slate-200 bg-slate-50 opacity-70 hover:opacity-100 hover:shadow-md hover:border-slate-300'
        : 'border-slate-200 bg-white hover:shadow-md hover:border-slate-300',
  ].join(' ')

  return `
    <div class="${cardClass} cursor-pointer" style="animation-delay: ${index * 60}ms" onclick="window.location='${schema.browser_path}'">
      ${isCurrent ? '<div class="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500"></div>' : ''}
      <div class="p-6">
        <div class="flex items-center justify-between gap-3 mb-3">
          <h3 class="text-lg font-semibold text-navy-900">${schema.name}</h3>
          <span class="inline-flex items-center shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.badge}">
            ${s.label}
          </span>
        </div>
        <p class="text-sm text-slate-500 mb-4">${schema.description}</p>
        <div class="space-y-1.5 mb-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium uppercase tracking-wider text-slate-400 w-20 shrink-0">Version</span>
            <code class="text-sm font-mono text-navy-800 bg-navy-50 px-1.5 py-0.5 rounded">${schema.version}</code>
          </div>
          <div>
            <span class="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1">Namespace</span>
            <code class="text-xs font-mono text-slate-600 break-all leading-relaxed">${schema.namespace}</code>
          </div>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <span class="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 group-hover:text-teal-500">
            Browse schema
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
          <span class="ml-auto">
            <a href="${schema.xsd_url}"
               class="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-navy-700"
               title="Download XSD">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              XSD
            </a>
          </span>
        </div>
      </div>
    </div>
  `
}

const app = document.getElementById('app')
app.innerHTML = `
  <div class="min-h-screen bg-[#fafbfd]">
    <div class="fixed inset-0 pointer-events-none opacity-30"
         style="background-image: linear-gradient(rgba(45,44,105,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,44,105,0.04) 1px, transparent 1px); background-size: 60px 60px;">
    </div>

    <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-3">
            <a href="https://www.unitsml.org" class="block" title="UnitsML Home">
              <img src="logo-unitsml.svg" alt="UnitsML" class="h-9 w-auto">
            </a>
            <div class="hidden sm:block h-6 w-px bg-slate-200"></div>
            <span class="hidden sm:block text-sm text-slate-500 font-medium">Schema Repository</span>
          </div>
          <nav class="flex items-center gap-4">
            <a href="https://github.com/unitsml/schemas"
               class="text-sm text-slate-500 hover:text-navy-700 flex items-center gap-1.5"
               title="GitHub Repository">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span class="hidden md:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>

    <section class="relative pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl animate-fade-in">
          <p class="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-4">UnitsML Standard</p>
          <h1 class="text-4xl sm:text-5xl font-bold text-navy-900 tracking-tight leading-tight mb-5"
              style="font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;">
            UnitsML XML Schemas
          </h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-2xl">
            This site provides the authoritative schema repository for the
            <a href="https://www.unitsml.org" class="text-teal-600 hover:text-teal-500 underline underline-offset-2">UnitsML standard</a>
            — machine-readable representations of units of measure, quantities, and dimensions in XML.
            Browse each schema's interactive documentation, or download the XSD files directly.
          </p>
        </div>

        <div class="mt-8 space-y-3 animate-fade-in" style="animation-delay: 200ms">
          <div class="p-4 rounded-lg bg-navy-900 text-white max-w-2xl">
            <p class="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Schema location URL pattern</p>
            <code class="text-sm font-mono text-teal-300">https://schema.unitsml.org/<span class="text-white/60">{schema}</span>/<span class="text-white/60">{version}</span>.xsd</code>
          </div>
          <div class="p-4 rounded-lg bg-white border border-slate-200 max-w-2xl">
            <p class="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">UnitsML 1.0 — schemaLocation</p>
            <code class="text-xs font-mono text-navy-700 break-all">https://schema.unitsml.org/unitsml/unitsml-v1.0.xsd</code>
            <p class="text-xs text-slate-500 mt-2">Use this value in your <code class="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">xsi:schemaLocation</code> attribute when validating UnitsML 1.0 documents.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-semibold text-navy-900">Available Schemas</h2>
          <span class="text-sm text-slate-500">${schemas.length} versions</span>
        </div>

        <div class="mb-10">
          ${renderCard(schemas[0], 0)}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${schemas.slice(1).map((s, i) => renderCard(s, i + 1)).join('')}
        </div>
      </div>
    </section>

    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <img src="logo-unitsml.svg" alt="UnitsML" class="h-7 w-auto opacity-60">
            <span class="text-sm text-slate-400">
              <a href="https://www.unitsml.org" class="hover:text-navy-600">UnitsML Group</a>
              &middot;
              <a href="https://www.unitsml.org" class="hover:text-navy-600">UnitsML Schemas</a>
            </span>
          </div>
          <p class="text-xs text-slate-400">
            Schema browser powered by <a href="https://github.com/lutaml/lutaml-xsd" class="hover:text-navy-600">LutaML XSD</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
`
