import { getSelectedText, Clipboard, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { convert, isConvertibleSvg, type ConvertOptions } from "str-s";

interface Preferences {
  componentName?: string;
  tailwindMapping?: "strict" | "loose" | "off";
  componentStyle?: "arrow" | "function";
  typescript?: boolean;
}

export default async function Command() {
  try {
    let selectedText: string;
    try {
      selectedText = await getSelectedText();
    } catch {
      // If getSelectedText fails, check clipboard as fallback
      const clipText = await Clipboard.readText();
      if (clipText && isConvertibleSvg(clipText)) {
        selectedText = clipText;
      } else {
        await showToast({
          style: Toast.Style.Failure,
          title: "No text selected",
          message: "Select an SVG string in any application or copy it to clipboard.",
        });
        return;
      }
    }

    if (!selectedText || !isConvertibleSvg(selectedText)) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Selected text is not a valid SVG",
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

    const converted = convert(selectedText, options);
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
      title: "Error converting selection",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
