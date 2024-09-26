import React, { ReactElement, createContext, useState } from 'react';
import { ColorTheme, ThemeMods, createTheme } from '@src/theme';

interface ThemeContextProps {
  children: ReactElement;
}

export interface ThemeContextInterface {
  theme: ColorTheme;
  currentTheme: ThemeMods;
  setTheme: (theme: ThemeMods) => void;
}

export const ThemeContextDefaults: ThemeContextInterface = {
  theme: createTheme('light'),
  currentTheme: 'light',
  setTheme: () => null,
};

export const ThemeContext =
  createContext<ThemeContextInterface>(ThemeContextDefaults);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProps): React.ReactElement => {
  const [theme, setTheme] = useState<{
    currentTheme: ThemeContextInterface['currentTheme'];
    theme: ThemeContextInterface['theme'];
  }>({
    currentTheme: 'light',
    theme: ThemeContextDefaults.theme,
  });

  const handleSetTheme = (theme: ThemeMods): void => {
    setTheme({
      theme: createTheme(theme),
      currentTheme: theme,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme.theme,
        currentTheme: theme.currentTheme,
        setTheme: handleSetTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
