import * as vscode from "vscode";
import { convert, isConvertibleSvg, type ConvertOptions } from "@everywhereayush/str-s";

function getOptionsFromConfig(document?: vscode.TextDocument): ConvertOptions {
  const config = vscode.workspace.getConfiguration("str");
  const isTs = document
    ? document.languageId.includes("typescript")
    : true;

  return {
    componentName: config.get<string>("componentName", "SvgComponent"),
    tailwindMapping: config.get<"strict" | "loose" | "off">("tailwindMapping", "loose"),
    componentStyle: config.get<"arrow" | "function">("componentStyle", "arrow"),
    typescript: config.get<boolean>("typescript", isTs),
  };
}

class SvgPasteEditProvider implements vscode.DocumentPasteEditProvider {
  static readonly kind = vscode.DocumentDropOrPasteEditKind.Empty.append("str", "pasteAsReact");

  async provideDocumentPasteEdits(
    document: vscode.TextDocument,
    _ranges: readonly vscode.Range[],
    dataTransfer: vscode.DataTransfer,
    _context: vscode.DocumentPasteEditContext,
    token: vscode.CancellationToken
  ): Promise<vscode.DocumentPasteEdit[] | undefined> {
    const config = vscode.workspace.getConfiguration("str");
    if (!config.get<boolean>("autoConvertOnPaste", true)) {
      return undefined;
    }

    const textItem = dataTransfer.get("text/plain");
    if (!textItem) {
      return undefined;
    }

    const pastedText = await textItem.asString();
    if (token.isCancellationRequested) {
      return undefined;
    }

    // Fast pre-check: bail immediately on false so normal pastes are never touched
    if (!isConvertibleSvg(pastedText)) {
      return undefined;
    }

    const options = getOptionsFromConfig(document);
    const converted = convert(pastedText, options);
    if (!converted) {
      return undefined;
    }

    const edit = new vscode.DocumentPasteEdit(
      converted,
      "Convert SVG to React + Tailwind",
      SvgPasteEditProvider.kind
    );
    return [edit];
  }
}

export function activate(context: vscode.ExtensionContext) {
  const supportedLanguages = [
    { language: "typescriptreact" },
    { language: "javascriptreact" },
    { language: "typescript" },
    { language: "javascript" },
  ];

  // Register DocumentPasteEditProvider if supported in current VSCode version
  if (vscode.languages.registerDocumentPasteEditProvider) {
    context.subscriptions.push(
      vscode.languages.registerDocumentPasteEditProvider(
        supportedLanguages,
        new SvgPasteEditProvider(),
        {
          providedPasteEditKinds: [SvgPasteEditProvider.kind],
          pasteMimeTypes: ["text/plain"],
        }
      )
    );

    // In Cursor, editor.pasteAs.enabled is false by default, which blocks all DocumentPasteEditProviders
    const pasteAsConfig = vscode.workspace.getConfiguration("editor.pasteAs");
    if (pasteAsConfig.get<boolean>("enabled") === false) {
      vscode.window
        .showInformationMessage(
          "STR: Automatic SVG paste conversion is disabled because 'editor.pasteAs.enabled' is false (default in Cursor). Enable it to convert on paste?",
          "Enable Now"
        )
        .then((selection) => {
          if (selection === "Enable Now") {
            pasteAsConfig.update("enabled", true, vscode.ConfigurationTarget.Global);
          }
        });
    }
  }

  // Command: Convert Selection (Single undo step)
  const convertSelectionCommand = vscode.commands.registerCommand(
    "str.convertSelection",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (!isConvertibleSvg(text)) {
        vscode.window.showWarningMessage("STR: Selected text is not a valid SVG.");
        return;
      }

      const options = getOptionsFromConfig(editor.document);
      const converted = convert(text, options);

      if (!converted) {
        vscode.window.showErrorMessage("STR: Failed to convert SVG.");
        return;
      }

      // Single undo step
      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, converted);
      });
    }
  );

  // Command: Convert Clipboard
  const convertClipboardCommand = vscode.commands.registerCommand(
    "str.convertClipboard",
    async () => {
      const clipboardText = await vscode.env.clipboard.readText();

      if (!isConvertibleSvg(clipboardText)) {
        vscode.window.showWarningMessage("STR: Clipboard does not contain a valid SVG.");
        return;
      }

      const editor = vscode.window.activeTextEditor;
      const options = getOptionsFromConfig(editor?.document);
      const converted = convert(clipboardText, options);

      if (!converted) {
        vscode.window.showErrorMessage("STR: Failed to convert SVG from clipboard.");
        return;
      }

      if (editor) {
        // Single undo step insertion
        await editor.edit((editBuilder) => {
          editBuilder.replace(editor.selection, converted);
        });
      } else {
        // Copy converted React component back to clipboard
        await vscode.env.clipboard.writeText(converted);
        vscode.window.showInformationMessage("STR: Converted SVG copied to clipboard!");
      }
    }
  );

  context.subscriptions.push(convertSelectionCommand, convertClipboardCommand);
}

export function deactivate() {}
