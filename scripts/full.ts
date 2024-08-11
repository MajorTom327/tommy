import { build } from "./build";
import { prepublish } from "./prepublish";
import { publish, type VersionType } from "./publish";

export const full = async () => {
  const args = process.argv.slice(2);
  const version = args[0] as VersionType | undefined;

  await build();
  await prepublish();
  await publish(version);
};

full();
