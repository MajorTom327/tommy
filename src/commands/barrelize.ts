import { basename, extname } from "node:path";
import vscode, { type WorkspaceConfiguration } from "vscode";
const extensions = ["ts", "tsx", "js", "jsx"];
const ignoredRules = [/^index$/i, /spec$/i, /test$/i];

export const barrelize = async (
  path: string,
  config: WorkspaceConfiguration,
) => {
  const dirPath = vscode.Uri.parse(path);
  const files = await vscode.workspace.fs.readDirectory(dirPath);
  const barrels = new Set<string>();

  for (const [file, fileType] of files) {
    const filePath = dirPath.with({ path: `${dirPath.path}/${file}` });

    if (fileType === vscode.FileType.File) {
      const extension = extname(file);
      const filename = basename(file, extension);

      if (!extensions.includes(extension.slice(1))) {
        continue;
      }

      if (ignoredRules.some((rule) => rule.test(filename))) {
        continue;
      }

      barrels.add(`export * from './${filename}';`);
    }

    if (fileType === vscode.FileType.Directory) {
      barrels.add(`export * from './${file}';`);
      await barrelize(filePath.path, config);
    }
  }

  if (barrels.size === 0) {
    return;
  }

  const barrelPath = dirPath.with({ path: `${dirPath.path}/index.ts` });
  const barrelContent = Array.from(barrels).join("\n");

  await vscode.workspace.fs.writeFile(
    barrelPath,
    new TextEncoder().encode(barrelContent),
  );
};
