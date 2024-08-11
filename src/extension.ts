import vscode from "vscode";
import { barrelize, gitIgnore } from "./commands";
import { generateCommand } from "./utils/vscode";

export async function activate(context: vscode.ExtensionContext) {
  console.log("Tommy is now active!");
  const barrelizeCommand = vscode.commands.registerCommand(
    generateCommand("barrelize"),
    barrelize,
  );

  const gitIgnoreCommand = vscode.commands.registerCommand(
    generateCommand("git-ignore"),
    gitIgnore,
  );

  context.subscriptions.push(barrelizeCommand);
  context.subscriptions.push(gitIgnoreCommand);
}

export async function deactivate() {}
