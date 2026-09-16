# STR Raycast Extension

> **Status**: Pending macOS hardware testing before Raycast Store submission.

This package contains the Raycast extension for STR (`str-s`). It provides commands to convert SVG strings from the system clipboard or frontmost window selection directly into clean React + Tailwind components.

The extension is already fully implemented and verified via `ray develop`. Official store submission is currently pending physical macOS hardware testing.

## Commands

- **Convert SVG from Clipboard**: Reads the SVG string from the system clipboard, runs `convert()`, copies the generated React component back to the clipboard, and triggers a confirmation toast.
- **Convert SVG from Selected Text**: Reads highlighted text from the frontmost application window (Figma, browser, editor) and converts it to a React component. Falls back to clipboard if no text is selected.

## Development

```bash
pnpm install
pnpm build
# or run in local Raycast development mode:
ray develop
```
