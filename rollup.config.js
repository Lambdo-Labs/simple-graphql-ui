import { babel } from "@rollup/plugin-babel";
// import postcss from 'rollup-plugin-postcss';
import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";

import path from "path";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/**
 * @type {import('rollup').RollupOptions}
 */
const componentsConfig = {
  input: {
    index: "src/index",
  },
  output: [
    {
      dir: "dist/esm",
      format: "esm",
    },
    {
      dir: "dist/lib",
      format: "cjs",
      exports: "auto",
    },
  ],
  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en/#external
  external: ["vue"],
  plugins: [
    vue(),
    peerDepsExternal(),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    }),
    replace({
      preventAssignment: true,
      values: {
        VERSION: JSON.stringify(pkg.version),
      },
    }),
    resolve({
      extensions,
    }),
    typescript({
      clean: true,
      check: false, // https://github.com/ezolenko/rollup-plugin-typescript2/issues/214#issuecomment-612647264
    }),
    babel({ extensions, babelHelpers: "bundled" }),
    cleanup({
      comments: "all", // keep comments
    }),
  ],
};

export default componentsConfig;
