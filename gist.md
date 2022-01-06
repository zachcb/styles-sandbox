# RFC: Style changes proposal

## This is a revision of Will's proposal

### [Original Proposal](https://gist.github.com/wlewis-formative/21210ff4378446cf124441c6e14b1f6e)

Changes from Original

- Uses [createGlobalStyle](https://github.com/zachcb/styles-sandbox/blob/main/src/styles/GlobalStyles.ts) to add CSS variables to the styles
- Uses Styled Components's `ThemeProvider` to allow the theme to be sent through Styled's props
  - This also allows for [nested themes](https://github.com/zachcb/styles-sandbox/blob/main/src/components/layouts/DefaultLayout.tsx).
- Added a [getNestedPairs](https://github.com/zachcb/styles-sandbox/blob/main/src/styles/utilities/getNestedPairs.ts) to allow for nested values in the theme. (Example: `--layout-border-radius-xs`)
- Separated [Button's controls into booleans](https://github.com/zachcb/styles-sandbox/blob/main/src/App.tsx#L52) rather than individual components
- Button uses `as` to specify if the button is an Anchor
- Not being used, but `Styled-Theming` was added to allow for easier theme mode control

---

### Live demo

A simple web app demonstrating the ideas to follow is available [here](https://zachcb.github.io/styles-sandbox/), and the source can be found [here](https://github.com/zachcb/styles-sandbox).

## Abstract

This RFC contains a couple of ideas intended to resolve the issues discussed at [this meeting](https://meet.range.co/goformative/dev-sync/43/mqkPxUfLRI4SjldH6yNCzZVL2S91wfdt6wwzQxP4eSw=).
The three themes are

1. Decoupling names from values
2. Using `css` and TypeScript functions to create mixins
3. Hacking CSS variables to allow for more flexibility
4. Utilizing Styled Components to handle theming

## More abstract ("semantic") names

Values used in CSS declarations will be organized in a map.
Names should be as abstract as possible: prefer `warning` to `red` and `accent` to `lightBlue`.
The resulting map might look something like this:

```typescript
const lightTheme: DefaultTheme = {
  type: "light",
  colors: {
    bg: "#fbf1c7",
    bgAccent: "#ebdbb2",
    primary: "#282828",
    primaryAccent: "#665c54",
    primaryAccent1: "#928374",
    warning: "#cc241d",
    warningAccent: "#fb4934",
    warningAccent1: "#e86c5d",
  },
  typography,
  layout,
};
```

This is essentially our current `globalStyles` object, and it's used in exactly the same way:

```typescript
import { vars } from "./styles";

const WarningButton = styled.button`
  background-color: ${(props) => props.theme.colors.warning};
  border-radius: ${(props) => props.theme.layout.borderRadiusMdPx};
  color: ${(props) => props.theme.colors.bg};
  // ...
`;
```

The `vars` (`globalStyles`) object allows for some level of reusability.
It also decouples the names of things from their values.
Furthermore, it gives us all of the benefits afforded by TypeScript and associated IDE tooling (autocomplete, checking) that we relinquish in a switch to CSS variables.

However, we don't yet have a way to construct and compose larger style concepts.
For this, we propose a kind of mixin.

## Mixins for efficient style composition

Suppose we have two button components that share many of the same styles:

```typescript
const PrimaryButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.layout.borderRadiusMdPx};
  cursor: pointer;
  padding: 0.2em 0.4em;
  color: ${(props) => props.theme.colors.bg};
  margin: 0;

  :hover {
    background-color: ${(props) => props.theme.colors.primaryAccent};
  }
`;

const WarningButton = styled.button`
  background-color: ${(props) => props.theme.colors.warning};
  border: none;
  border-radius: ${(props) => props.theme.layout.borderRadiusMdPx};
  cursor: pointer;
  padding: 0.2em 0.4em;
  color: ${(props) => props.theme.colors.bg};
  margin: 0;

  :hover {
    background-color: ${(props) => props.theme.colors.warningAccent};
  }
`;
```

We'd like to "bottle up" the common pieces into an abstraction that we can share between `PrimaryButton` and `WarningButton`.
To do so, we can leverage the `css` export from `styled-components`:

```typescript
import { css } from "styled-components";

const ButtonBase = css`
  border: none;
  border-radius: ${(props) => props.theme.layout.borderRadiusMdPx};
  cursor: pointer;
  padding: 0.2em 0.4em;
  color: ${(props) => props.theme.colors.bg};
  margin: 0;
`;

export default ButtonBase;
```

Our new definitions are then significantly shortened:

```typescript
import ButtonBase from "./ButtonBase";

const PrimaryButton = styled.button`
  ${ButtonBase}
  background-color: ${(props) => props.theme.colors.primary};

  :hover {
    background-color: ${(props) => props.theme.colors.primaryAccent};
  }
`;

const WarningButton = styled.button`
  ${ButtonBase}
  background-color: ${(props) => props.theme.colors.warning};

  :hover {
    background-color: ${(props) => props.theme.colors.warningAccent};
  }
`;
```

However, we're not quite there yet: we'd like to be able to parameterize these concepts to allow us to provide attributes like `background-color`, instead of guessing the pieces that `ButtonBase` is missing.
That is, each abstract style concept (like `ButtonBase`) should be "complete" in a sense.

Luckily, parameterization is simple:

```typescript
import { css } from "styled-components";

export interface ButtonBaseProps {
  bg: string;
  bgHover?: string;
}

const ButtonBase = (props: ButtonBaseProps) => css`
  background-color: ${props.bg};
  border: none;
  border-radius: ${(props) => props.theme.layout.border.radius.md};
  cursor: pointer;
  padding: 0.2em 0.4em;
  color: ${(props) => props.theme.colors.bg};
  margin: 0;

  // Supporting optional props is straightforward, if a little verbose.
  // A function could help here.
  ${props.bgHover
    ? `
  :hover {
    background-color: ${props.bgHover};
  }
  `
    : ""}
`;

export default ButtonBase;
```

This new `ButtonBase` _function_ is used like so:

```typescript
import ButtonBase from "./ButtonBase";

const PrimaryButton = styled.button`
  ${(props) =>
    ButtonBase({
      bg: props.theme.colors.primary,
      bgHover: props.theme.colors.primaryAccent,
    })}
`;

const WarningButton = styled.button`
  ${(props) =>
    ButtonBase({
      bg: props.theme.colors.primary,
      bgHover: props.theme.colors.warningAccent,
    })}
`;
```

We can still _override_ certain attribute styles, but we no longer need to provide any additional declarations in order to have a complete button look.

Lastly, these mixins can be freely composed in order to combine several concepts:

```typescript
import { css } from "styled-components";

const Rounded = css`
  border-radius: ${(props) => props.theme.layout.borderRadiusMdPx};
`;

const Shadowed = css`
  box-shadow: ${(props) => props.theme.layout.boxShadowD2};
`;
```

```typescript
import { css } from "styled-components";
import { Rounded, Shadowed } from "./style-utils";

// ...

const ButtonBase = (props: ButtonBaseProps) => css`
  ${Rounded}
  ${Shadowed} // ...
`;
```

Most likely, the same rules about creating (normal) functions apply here: in general, they should be abstract _enough_, but not significantly more so.

## Hacking CSS variables to achieve dynamic binding

The decision to use TS names to refer to CSS values appears to have one significant downside: supporting multiple "themes" is made much more difficult.
This is because users should be able to change the theme at any time while using the app and not need to reload in order to see the results.
One option is to introduce a class name for each theme, set the class name on a parent element (such as `document.body`), and style each component accordingly:

```typescript
const PrimaryButton = styled.button`
  ${ButtonBase({
    /* Default theme options */
  })}

  .dark & {
    ${ButtonBase({
      /* Dark theme options */
    })}
  }

  .high-contrast & {
    ${ButtonBase({
      /* High contract options */
    })}
  }

  // ...
`;
```

Alternatively, we could modify `ButtonBase` to expect props for `bgDark`, `bgHighContrast`, etc.
However, both of these strategies involve a great deal of additional work for each new theme.
They also preclude dynamic/custom themes, since the different themes ('dark', 'high-contrast') must be known in advance.

Luckily, these problems aren't inherent, but simply symptomatic: when dealing with different themes, we should be able to use the same _names_ (e.g. `primaryAccent`) to refer to the same _underlying abstract concept_ ("the accented variant of the app's primary color").
The name shouldn't change, but rather the _value_ bound to the name should.
That is, the _meaning_ of `primaryAccent` should depend on the current theme: in the default case, it may be `#282828`, but if the theme is changed to 'dark', its meaning should change to `#ebdbb2`.

This is readily accomplished via a "hack" involving CSS variables.

### Supporting multiple themes with CSS variables

Each theme should define all of the names we expect to change with the theme.
For simplicity's sake, let's suppose that only the colors change.
Then the collection of themes should resemble:

```typescript
const lightTheme: DefaultTheme = {
  colors: {
    bg: "#fbf1c7",
    ...
  },
};

const darkTheme: DefaultTheme = {
  colors: {
    bg: "#282828",
    ...
  },
};
```

Then, in some parent component, we store the current theme as state, set an appropriate class name on a parent element, and define CSS variables according to the current class:

```typescript
// Declare CSS variables for each theme.
const DeclDiv = styled.div`
  --bg: ${(props) => props.theme.colors.bg};
  --primary: ${(props) => props.theme.colors.primary};
  // ...

  &.dark {
    --bg: ${(props) => props.themes.dark.bg};
    --primary: ${(props) => props.themes.dark.primary};
    // ...
  }

  &.high-contrast {
    --bg: ${(props) => props.themes.highContrast.bg};
    --primary: ${(props) => props.themes.highContrast.primary};
    // ...
  }
`;

const Themed: React.FC = ({ children }) => {
  // `null` indicates the default theme.
  const [theme, setTheme] = React.useState(null);

  return <DeclDiv className={toCssClassName(theme)}>{children}</DeclDiv>;
};
```

(Note that `setTheme` should be made available to the rest of the app via a separate `ThemeContext` which we haven't included here.)

The CSS variables `--bg`, `--primary`, etc. are now available to children of the `Themed` component, and -- as importantly -- their values depend on the current theme.
However, we're now forced to use CSS variables instead of the TypeScript names defined in `vars`:

```typescript
// ! This won't use the current theme's colors !
const BadQuux = styled.div`
  background-color: ${(props) => theme.colors.bg};
`;

const Quux = styled.div`
  background-color: var(--bg);
`;
```

This is a big loss: using TypeScript names brings advantages like autocompletion and "existence" checking, and we forfeit these with a switch to CSS variables.

However, with a little trickery it's possible to have the best of both.

We first introduce a new 'default' theme that uses our default colors:

```typescript
const themes = {
  default: {
    // ...
  },
  // ...
};
```

We then change `props => theme.colors` so that each name is bound to `var(--<name>)`:

```typescript
const vars = {
  colors: {
    bg: "var(--bg)",
    primary: "var(--primary)",
    primaryAccent: "var(--primaryAccent)",
    // ...
  },
  // ...
};
```

Now the following works as expected:

```typescript
const Quux = styled.div`
  background-color: ${(props) => theme.colors.bg};
`;
```

since it's indistinguishable from:

```typescript
const Quux = styled.div`
  background-color: var(--bg);
`;
```

Binding `props => theme.colors.bg` to `var(--bg)` may seem pointless: why not just cut our losses and use `var(--bg)`?
However, by binding `props => theme.colors.bg` to `var(--bg)` (etc.) we recover all of the benefits of using TypeScript names: autocomplete and "existence" checking.
Now, writing:

```typescript
const Quux = styled.div`
  background-color: ${(props) => theme.colors.badBg};
`;
```

produces an error after a static check, whereas

```typescript
const Quux = styled.div`
  background-color: var(--badBg);
`;
```

fails silently.

Both the declarations and "hacked" `props => theme.colors` values should be generated automatically.
This lowers the API surface area to nearly what we're already accustomed to: the `vars` object and the `Themed` component.
