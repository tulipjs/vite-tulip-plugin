
## Use in a project with vite

### JSR
1. Add a file `.npmrc` with `@jsr:registry=https://npm.jsr.io`
2. And add to the `package.json` -> `"@tu/vite-tulip-plugin": "npm:@jsr/tu__vite-tulip-plugin@latest"`
3. Run `yarn` on the project

### NPM
1. Run `yarn add @tulib/tulip` on the project

## Development use of vite-tulip-plugin

### Link vite-tulip to the vite library
1. `yarn` the project
2. `yarn link` the project
3. Go to the `tulipjs/tulip` project
4. Run `yarn link "@tulib/vite-tulip-plugin"`

### Build project
1. `yarn install --frozen-lockfile` the project
2. `yarn install -g esbuild`
3. `yarn build`
