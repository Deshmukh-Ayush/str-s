/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Component Name - Default name for the converted React component */
  "componentName": string,
  /** Tailwind Mapping - Tailwind class mapping mode */
  "tailwindMapping": "loose" | "strict" | "off",
  /** Component Style - Arrow function or function declaration */
  "componentStyle": "arrow" | "function",
  /** TypeScript - Include React.SVGProps TypeScript types */
  "typescript": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `convert-clipboard` command */
  export type ConvertClipboard = ExtensionPreferences & {}
  /** Preferences accessible in the `convert-selection` command */
  export type ConvertSelection = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `convert-clipboard` command */
  export type ConvertClipboard = {}
  /** Arguments passed to the `convert-selection` command */
  export type ConvertSelection = {}
}

