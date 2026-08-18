"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type VisualResource = {
  src: string;
  width: number;
  height: number;
  title: string;
  summary: string;
  alt: string;
  layout: "wide" | "portrait";
};

type ClassroomResourceGalleryProps = {
  resources: VisualResource[];
  visualGuideLabel: string;
  viewFullSizeLabel: string;
  closeLabel: string;
};

export default function ClassroomResourceGallery({ resources, visualGuideLabel, viewFullSizeLabel, closeLabel }: ClassroomResourceGalleryProps) {
  const [selectedResource, setSelectedResource] = useState<VisualResource | null>(null);

  useEffect(() => {
    if (!selectedResource) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedResource(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedResource]);

  return (
    <>
      <div className="classroom-resource-gallery">
        {resources.map((resource) => (
          <article className={`classroom-visual-resource classroom-visual-resource-${resource.layout}`} key={resource.src}>
            <button className="classroom-resource-image" type="button" onClick={() => setSelectedResource(resource)} aria-label={`${viewFullSizeLabel}: ${resource.title}`}>
              <Image src={resource.src} alt={resource.alt} width={resource.width} height={resource.height} sizes="(max-width: 760px) 100vw, 30vw" />
              <span>{viewFullSizeLabel} ↗</span>
            </button>
            <div className="classroom-resource-copy">
              <p className="classroom-card-meta">{visualGuideLabel}</p>
              <h3>{resource.title}</h3>
              <p>{resource.summary}</p>
            </div>
          </article>
        ))}
      </div>

      {selectedResource && (
        <div className="classroom-resource-viewer" role="dialog" aria-modal="true" aria-label={selectedResource.title} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedResource(null);
        }}>
          <div className={`classroom-resource-viewer-inner classroom-resource-viewer-${selectedResource.layout}`}>
            <button className="classroom-resource-viewer-close" type="button" onClick={() => setSelectedResource(null)} autoFocus>
              <span aria-hidden="true">×</span> {closeLabel}
            </button>
            <div className="classroom-resource-viewer-image">
              <Image src={selectedResource.src} alt={selectedResource.alt} width={selectedResource.width} height={selectedResource.height} sizes="95vw" priority />
            </div>
            <p>{selectedResource.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
