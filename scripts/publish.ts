export type VersionType = "major" | "minor" | "patch";

export const publish = async (version: VersionType = "patch") => {
  await Bun.$`vsce publish ${version}`;
};

publish();
