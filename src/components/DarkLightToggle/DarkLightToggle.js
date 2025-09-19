"use client";

import React from "react";
import Cookie from "js-cookie";
import {
  COLOR_THEME_COOKIE_NAME,
  DARK_COLORS,
  LIGHT_COLORS,
} from "@/constants";
import { Moon, Sun } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";

function DarkLightToggle({ initialTheme, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleToggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute("data-color-theme", colors);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button {...delegated} onClick={handleToggleTheme}>
      {theme === "light" ? (
        <Sun size='1.5rem' />
      ) : (
        <Moon size='1.5rem' />
      )}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
