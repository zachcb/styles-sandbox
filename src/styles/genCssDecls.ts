import themes from './themes';

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
      if (themeName === 'default') {
        return genVarDecls(values);
      } else {
        return `&.${themeName} { ${genVarDecls(values)} }`;
      }
    })
    .join('');
  // Uncomment to see output:
  // console.log(decls);
  return decls;
}

function genVarDecls(values: { [name: string]: string }): string {
  return Object.entries(values)
    .map(([name, value]) => `--${name}: ${value};`)
    .join('');
}
