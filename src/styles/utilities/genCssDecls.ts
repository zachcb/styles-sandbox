import themes from "./themes/themes";

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
export default function genCssDecls(): string {
  const decls = Object.entries(themes)
    .map(([themeName, values]) => {
      if (themeName === "default") {
        return genVarDecls(values);
      } else {
        return `&.${themeName} {\n${genVarDecls(values, 1)}\n}`;
      }
    })
    .join("\n\n");
  return decls;
}

function genVarDecls(values: { [name: string]: string }, level = 0): string {
  // For pretty-printing.
  const indent = " ".repeat(level * 2);

  return Object.entries(values)
    .map(([name, value]) => `${indent}--${name}: ${value};`)
    .join("\n");
}
