import vscode from "vscode";

export const gitIgnore = async (
  path: string,
  config: vscode.WorkspaceConfiguration,
) => {
  const filePath = vscode.Uri.parse(path);
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri;

  if (!workspaceRoot) {
    return;
  }

  const gitignoreFile = workspaceRoot.with({
    path: `${workspaceRoot.path}/.gitignore`,
  });

  await vscode.workspace.fs.readFile(gitignoreFile).then(async (data) => {
    const fileStats = await vscode.workspace.fs.stat(filePath);

    const relativePath =
      vscode.workspace.asRelativePath(filePath, false) +
      (fileStats.type === vscode.FileType.Directory ? "/" : "");

    return vscode.workspace.fs.writeFile(
      gitignoreFile,
      new TextEncoder().encode(`${data.toString()}${relativePath}\n`),
    );
  });
};
