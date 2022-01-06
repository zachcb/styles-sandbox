import { css } from "styled-components";

// https://www.joshwcomeau.com/css/designing-shadows/

export const Shadow = (type = "md") => css`
  ${() => {
    if (type === "sm") {
      return `
        box-shadow:
         0.5px 1px 1px rgba(0, 0, 0, 0.3);
      `;
    }

    if (type === "md") {
      return `
        box-shadow:
          1px 2px 2px rgba(0, 0, 0, 0.2),
          2px 4px 4px rgba(0, 0, 0, 0.2),
          3px 6px 6px rgba(0, 0, 0, 0.2);
      `;
    }

    if (type === "lg") {
      return `
        box-shadow:
          1px 2px 2px rgba(0, 0, 0, 0.1),
          2px 4px 4px rgba(0, 0, 0, 0.1),
          4px 8px 8px rgba(0, 0, 0, 0.1),
          8px 16px 16px rgba(0, 0, 0, 0.1),
          16px 32px 32px rgba(0, 0, 0, 0.1);
      `;
    }
  }}
`;
