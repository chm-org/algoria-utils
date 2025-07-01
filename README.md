# Algoria Utils

A tiny helper library that ships:

* JSON Schema definitions describing the core entities of our application.
* TypeScript type declarations automatically generated from those schemas.
* A small set of utility classes (see [`src/utility`](./src/utility)) that make
  it easier to work with the entities at runtime.

The schemas can be fetched over HTTP and used for **runtime validation** (via
[AJV](https://ajv.js.org/)) or **static type-checking** (via
[`json-schema-to-typescript`](https://github.com/bcherny/json-schema-to-typescript)).
The build script in this repository takes care of converting raw schemas to
typings and bundles a ready-to-consume `dist` folder.

> **Note**  
> There is currently no convenient way to build JSON Schema compositions that
> can be understood by **both** `json-schema-to-typescript` **and** AJV at the
> same time.  
> Because of this limitation the challenge-related schemas in this repo are
> intentionally *denormalised yet self-sufficient* – every schema contains
> everything it needs to validate or instantiate the corresponding entity
> without external `$ref`s.

---

## Installation
### With npm

```bash
pnpm install algoria-utils
```
### Or use the repository directly for development

```bash
git clone <repo-url>
cd algoria-utils
pnpm install
```

## Available npm scripts

| Command             | Description                                                                                 |
|---------------------|---------------------------------------------------------------------------------------------|
| `npm run dev`       | Starts Vite's dev server to host schema files while working with other project repositories |
| `npm run get-types` | Regenerates `.d.ts` files from JSON Schema                                                  |
| `npm run build`     | Calls `get-types` script and compiles TypeScript sources to `dist/`                         |

The project uses **TypeScript 5.8** and is built with **Vite 6**.

---
### Utility classes

All runtime helpers live in `src/utility`. Typical examples include:

* `DefaultLoggerFactory` – a factory for creating a logger that shares a log level across all the logger instances, and
  supports context in logs, e.g. `[File name]: log text`
* `HTTPChallengesLoader` – convenient way to load challenges and expectations over HTTP
  *(names may change; check the folder for the latest API)*

---

## Contributing

1. Fork the repo and create your branch:  
   `git checkout -b feat/my-awesome-feature`
2. Commit your changes: `git commit -am "feat: add my feature"`
3. Push to the branch: `git push origin feat/my-awesome-feature`
4. Open a pull request.

## Licensing

Released under **Creative Commons BY-NC-SA 4.0**.  
Commercial use is **not** permitted without the author’s explicit consent.
