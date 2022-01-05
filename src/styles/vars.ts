import genColors from './genColors';

/**
 * Style variables used throughout the app.
 *
 * NOTE This only includes a smattering of the possible values we'd want to
 * store here, even in this small demo app.
 *
 * NOTE I'm not entirely satisfied with the naming convention here. Definitely
 * WIP.
 */
const vars = {
  // See ./themes.ts for color definitions.
  colors: genColors(),
  layout: {
    paddingMainPx: '20px',
    borderRadiusMdPx: '3px',
    headerHeightPx: '60px',
  },
  typography: {
    fontFamilyPrimary: '"Fira Code", monospace',
  },
};

export default vars;
