import { themes } from "../themes/themes";
import { getNestedPairs } from "./getNestedPairs";
/**
 * Generates appropriate CSS variable declarations for each theme. That is, for every
 * theme named '<theme>', we generate a substring:
 *
 * ```
 * &.<theme> {
 *   --<color1>: <value1>;
 *   --<color2>: <value2>:
 *   // ...
 * }
 * ```
 *
 * Note the special handling of the `default` theme.
 */
export default function genCssDecls(values = themes): string {
  const decls = Object.entries(values)
    .map(([themeName, values]) => {
      return `&.${themeName} {\n${genVarDecls(values as any, 1)}\n}`;
    })
    .join("\n\n");

  return decls;
}

function genVarDecls(values: { [name: string]: string }, level = 0): string {
  // For pretty-printing.
  const indent = " ".repeat(level * 2);

  return Object.entries(getNestedPairs(values))
    .map(([name, value]) => {
      return `${indent}--${name}: ${value}`;
    })
    .join("\n");
}
