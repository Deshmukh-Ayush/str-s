import { Clipboard, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { convert, isConvertibleSvg, type ConvertOptions } from "str-s";

interface Preferences {
  componentName?: string;
  tailwindMapping?: "strict" | "loose" | "off";
  componentStyle?: "arrow" | "function";
  typescript?: boolean;
}

export default async function Command() {
  try {
    const clipboardText = await Clipboard.readText();
    if (!clipboardText || !isConvertibleSvg(clipboardText)) {
      await showToast({
        style: Toast.Style.Failure,
        title: "No valid SVG found in clipboard",
        message: "Copy an SVG element and try again.",
      });
      return;
    }

    const prefs = getPreferenceValues<Preferences>();
    const componentName = prefs.componentName?.trim() || "SvgComponent";
    const options: ConvertOptions = {
      componentName,
      tailwindMapping: prefs.tailwindMapping ?? "loose",
      componentStyle: prefs.componentStyle ?? "arrow",
      typescript: prefs.typescript ?? true,
    };

    const converted = convert(clipboardText, options);
    if (!converted) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Conversion failed",
        message: "Unable to parse SVG structure.",
      });
      return;
    }

    await Clipboard.copy(converted);
    await showToast({
      style: Toast.Style.Success,
      title: "Converted to React!",
      message: `Copied ${componentName} to clipboard`,
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error converting clipboard",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
