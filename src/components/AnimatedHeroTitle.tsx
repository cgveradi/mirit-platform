"use client";

import { Fragment, useState } from "react";

export default function AnimatedHeroTitle({ children }: { children: string }) {
  const characters = Array.from(children);
  const words = children.split(" ");
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
      availableIndices.slice(0, 4).map((index) => [index, Math.random() * 18 - 9]),
    ));
  }

  return (
    <h1
      className="hero-title"
      onMouseEnter={jumpRandomLetters}
      onAnimationEnd={(event) => {
        if ((event.target as HTMLElement).classList.contains("hero-title-char")) {
          setJumpingLetters(new Map());
        }
      }}
    >
      {words.map((word, wordIndex) => {
        const characterOffset = words
          .slice(0, wordIndex)
          .reduce((offset, previousWord) => offset + previousWord.length + 1, 0);

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="hero-title-word">
              {Array.from(word).map((character, characterIndex) => {
                const index = characterOffset + characterIndex;

                return (
                  <span
                    key={`${character}-${index}`}
                    className={`hero-title-char${jumpingLetters.has(index) ? " is-jumping" : ""}`}
                    style={{ "--letter-rotation": `${jumpingLetters.get(index) ?? 0}deg` } as React.CSSProperties}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </h1>
  );
}
