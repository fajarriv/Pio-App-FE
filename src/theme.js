// color tokens
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#F8F7F3",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  dark: {
    50: "#88BFE8",
    100: "#203153",
    200: "#01162D",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
  },
  light: {
    50: "#7289DA",
    100: "#304EB6",
    200: "#253C8E",
    300: "#CC777D",
    400: "#B53E46",
    500: "#AD2831",
  },
};

// MUI theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.dark[200],
              main: colorTokens.dark[100],
              light: colorTokens.dark[50],
              darkBlue: colorTokens.light[200],
              mainBlue: colorTokens.light[100],
              lightBlue: colorTokens.light[50],
              darkRed: colorTokens.light[500],
              mainRed: colorTokens.light[400],
              lightRed: colorTokens.light[300],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[800],
              alt: colorTokens.grey[700],
              white: colorTokens.grey[0],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colorTokens.light[100],
              darkBlue: colorTokens.light[200],
              mainBlue: colorTokens.light[100],
              lightBlue: colorTokens.light[50],
              darkRed: colorTokens.light[500],
              mainRed: colorTokens.light[400],
              lightRed: colorTokens.light[300],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[100],
              alt: colorTokens.grey[50],
              white: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
