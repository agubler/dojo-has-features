# features

Demonstrates using the static features in cli build app. Defines a default value for has feature `api-host` of `localhost:9999` and overrides each for targeted environments, `ci`, `qa`, `stage` and `prod`.

The overridden build commands are npm scripts, they can be all run using `npm run build` and the output is in the `dist` directory.

Each of the builds are deployed on gh-pages:

 * [local](https://agubler.github.io/dojo-has-features/dist/local/)
 * [ci](https://agubler.github.io/dojo-has-features/dist/ci/)
 * [qa](https://agubler.github.io/dojo-has-features/dist/qa/)
 * [stage](https://agubler.github.io/dojo-has-features/dist/stage/)
 * [prod](https://agubler.github.io/dojo-has-features/dist/prod/)
