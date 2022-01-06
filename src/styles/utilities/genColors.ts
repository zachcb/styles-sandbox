import { themes } from "../themes/themes";
import { getNestedPairs } from "./getNestedPairs";

/**
 * Generates values for the color names using the `default` theme as a template.
 *
 * E.g. if
 *
 * ```
 * const themes = {
 *   default: {
 *     bar: '#ff0000',
 *     baz: '#00ff00',
 *   },
 * }
 * ```
 *
 * `genColors()` produces
 *
 * ```
 * {
 *   bar: 'var(--bar)',
 *   baz: 'var(--baz)',
 * }
 * ```
 *
 * Thus, the `default` theme determines what names will be recognized as valid
 * by TypeScript.
 */
type ThemeColors = Record<keyof typeof themes, string>;

export default function genColors(): ThemeColors {
  const colors = Object.keys(getNestedPairs(themes["light"])).reduce(
    (acc, key) => ({
      ...acc,
      [key]: toCssVarUse(key),
    }),
    {}
  ) as ThemeColors;
  return colors;
}

function toCssVarUse(name: string): string {
  return `var(--${name})`;
}
