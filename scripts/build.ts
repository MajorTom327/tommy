import esbuild from "esbuild";
import { match } from "ts-pattern";

const source_path = "./src/extension.ts";
const dest_path = "./dist";

const external = ["vscode"];

const base_config: esbuild.BuildOptions = {
  entryPoints: [source_path],
  bundle: true,
  platform: "node",
  format: "cjs",
  sourcemap: true,
  target: "node14",
  outdir: dest_path,
  external,
};

export const build = async () => {
  const start = Date.now();

  const config: esbuild.BuildOptions = match(process.env.NODE_ENV)
    .when(
      (env) => env === "development",
      () => ({
        ...base_config,
        minify: true,
      }),
    )
    .otherwise(() => ({
      ...base_config,
      minify: false,
      drop: ["console", "debugger"],
    }));

  await esbuild.build(config);
  const end = Date.now();
  console.log(`Build completed in ${end - start}ms`);
};

const main = async () => {
  await build();
};

await main();
