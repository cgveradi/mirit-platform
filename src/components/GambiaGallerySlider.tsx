"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = { src: string; alt: string; caption?: string };

type GambiaGallerySliderProps = {
  images: GalleryImage[];
  previousLabel: string;
  nextLabel: string;
  selectLabel: string;
};

export default function GambiaGallerySlider({ images, previousLabel, nextLabel, selectLabel }: GambiaGallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const showPrevious = () => setActiveIndex((current) => current === null ? 0 : (current - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((current) => current === null ? 0 : (current + 1) % images.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? 0 : (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? 0 : (current + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="project-collage">
        {images.slice(0, 7).map((image, index) => (
          <button type="button" key={image.src} className={`project-collage-item project-collage-item-${index + 1}`} onClick={() => setActiveIndex(index)} aria-label={`${selectLabel} ${index + 1}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 78vw, 38vw" className="project-collage-image" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {activeImage && (
        <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt}>
          <button className="project-lightbox-backdrop" type="button" onClick={() => setActiveIndex(null)} aria-label="Close gallery" />
          <figure className="project-lightbox-figure">
            <div className="project-lightbox-image-wrap">
              <Image src={activeImage.src} alt={activeImage.alt} fill sizes="90vw" className="project-lightbox-image" />
            </div>
            <figcaption>
              <span>{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              {activeImage.caption && <p>{activeImage.caption}</p>}
            </figcaption>
          </figure>
          <button className="project-lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close gallery">×</button>
          <div className="project-lightbox-controls">
            <button type="button" onClick={showPrevious} aria-label={previousLabel}>←</button>
            <button type="button" onClick={showNext} aria-label={nextLabel}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
