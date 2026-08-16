"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

function AnimatedNavLabel({ label }: { label: string }) {
  const characters = Array.from(label);
  const [jumpingLetters, setJumpingLetters] = useState<Map<number, number>>(new Map());

  function jumpRandomLetters() {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const availableIndices = characters
      .map((character, index) => ({ character, index }))
      .filter(({ character }) => character !== " ")
      .map(({ index }) => index);

    for (let index = availableIndices.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [availableIndices[index], availableIndices[randomIndex]] = [availableIndices[randomIndex], availableIndices[index]];
    }

    setJumpingLetters(new Map(
      availableIndices.slice(0, 2).map((index) => [index, Math.random() * 28 - 14]),
    ));
  }

  return (
    <span
      className="nav-label"
      aria-hidden="true"
      onMouseEnter={jumpRandomLetters}
      onAnimationEnd={() => setJumpingLetters(new Map())}
    >
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={`nav-label-char${jumpingLetters.has(index) ? " is-jumping" : ""}`}
          style={{ "--letter-rotation": `${jumpingLetters.get(index) ?? 0}deg` } as React.CSSProperties}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavItems = [
    { href: "/about", label: t("about") },
    { href: "/gambia-project", label: t("gambiaProject") },
    { href: "/gambia-project/classroom", label: t("classroom") },
    { href: "/contact", label: t("contact") },
  ] as const;

  useEffect(() => {
    if (!isMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.body.classList.add("mobile-menu-active");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("mobile-menu-active");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <nav className="site-nav">
      <Link
        href="/"
        className="mirit-wordmark"
      >
        MIRIT
      </Link>

      <div className="nav-content">
        <div className="nav-links">
          <Link href="/about" aria-label={t("about")}>
            <AnimatedNavLabel label={t("about")} />
          </Link>

          <Link href="/gambia-project" aria-label={t("gambiaProject")}>
            <AnimatedNavLabel label={t("gambiaProject")} />
          </Link>

          <Link href="/gambia-project/classroom" aria-label={t("classroom")}>
            <AnimatedNavLabel label={t("classroom")} />
          </Link>

          <Link href="/contact" aria-label={t("contact")}>
            <AnimatedNavLabel label={t("contact")} />
          </Link>

        </div>

        <div className="nav-utilities">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-navigation${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-navigation-links">
          {mobileNavItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              style={{ "--menu-index": index } as React.CSSProperties}
            >
              <span className="mobile-navigation-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mobile-navigation-label">{item.label}</span>
              <span className="mobile-navigation-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className="mobile-navigation-footer">
          <p className="mobile-navigation-tagline">{t("tagline")}</p>
          <p className="mobile-navigation-signature">MIRIT / 01—26</p>
        </div>
      </div>
    </nav>
  );
}
