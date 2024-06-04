import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {plugin} from "./plugin";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    plugin()
  ],
  publicDir: "assets",
});
