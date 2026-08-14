"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type GambiaGallerySliderProps = {
  images: GalleryImage[];
  previousLabel: string;
  nextLabel: string;
  selectLabel: string;
};

export default function GambiaGallerySlider({
  images,
  previousLabel,
  nextLabel,
  selectLabel,
}: GambiaGallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const thumbnails = images
    .map((image, index) => ({ image, index }))
    .filter(({ index }) => index !== activeIndex);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  if (!activeImage) return null;

  return (
    <div className="project-bento">
      <figure className="project-bento-feature">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 68vw"
          className="project-bento-feature-image"
        />
        <div className="project-bento-shade" />
        <figcaption className="project-bento-caption" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
          {activeImage.caption && <p>{activeImage.caption}</p>}
        </figcaption>
        <div className="project-bento-controls">
          <button type="button" onClick={showPrevious} aria-label={previousLabel}>←</button>
          <button type="button" onClick={showNext} aria-label={nextLabel}>→</button>
        </div>
      </figure>

      <div className="project-bento-thumbnails">
        {thumbnails.map(({ image, index }, thumbnailIndex) => (
          <button
            type="button"
            key={image.src}
            className={`project-bento-thumbnail project-bento-thumbnail-${thumbnailIndex + 1}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${selectLabel} ${index + 1}`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(max-width: 760px) 72vw, 24vw"
              className="project-bento-thumbnail-image"
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
