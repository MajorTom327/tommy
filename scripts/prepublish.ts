export const prepublish = async () => {
  await Bun.$`vsce login valentin-thomas --pat ${process.env.VSCODE_TOKEN}`;
  await Bun.$`vsce package`;
};

prepublish();
