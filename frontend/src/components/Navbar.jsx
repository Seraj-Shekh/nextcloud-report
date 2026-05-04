import React, { useEffect, useState } from "react";
import { Moon, Sun, Github, BookOpen } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border/70"
      data-testid="site-navbar"
    >
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-3 group"
          data-testid="nav-logo"
        >
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-[0_6px_24px_-6px_hsl(var(--primary)/0.7)]">
            <BookOpen className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[17px] font-semibold tracking-tight">
              Nextcloud Collectives
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Migration Report
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a
            href="#overview"
            className="hover:text-foreground transition-colors"
            data-testid="nav-overview"
          >
            Overview
          </a>
          <a
            href="#experiments"
            className="hover:text-foreground transition-colors"
            data-testid="nav-experiments"
          >
            Experiments
          </a>
          <a
            href="#root-cause"
            className="hover:text-foreground transition-colors"
            data-testid="nav-root-cause"
          >
            Root cause
          </a>
          <a
            href="#conclusion"
            className="hover:text-foreground transition-colors"
            data-testid="nav-conclusion"
          >
            Conclusion
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/nextcloud/collectives"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-2.5 py-2 rounded-md transition-colors"
            data-testid="nav-github"
          >
            <Github className="h-4 w-4" />
            <span className="hidden md:inline">Nextcloud</span>
          </a>
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-button"
            aria-label="Toggle color theme"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
