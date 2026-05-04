import React, { useEffect, useState } from "react";

/**
 * Sidebar — sticky TOC with scroll-spy.
 * Accepts `sections` : Array<{ id, label, children?: Array<{id,label}> }>
 */
export default function Sidebar({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const ids = [];
    sections.forEach((s) => {
      ids.push(s.id);
      (s.children || []).forEach((c) => ids.push(c.id));
    });

    const handler = () => {
      const offset = 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
      }
      setActiveId(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [sections]);

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block sticky top-[88px] h-[calc(100vh-104px)] overflow-y-auto pr-4"
      data-testid="sidebar-toc"
    >
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3 pl-4">
        On this page
      </div>
      <ul className="space-y-0.5">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              data-testid={`toc-link-${s.id}`}
              data-active={activeId === s.id ? "true" : "false"}
              className="toc-link"
            >
              {s.label}
            </a>
            {s.children?.length ? (
              <ul>
                {s.children.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      data-testid={`toc-link-${c.id}`}
                      data-active={activeId === c.id ? "true" : "false"}
                      className="toc-link toc-sub"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
