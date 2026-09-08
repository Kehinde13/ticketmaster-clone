"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import type { EventCardData } from "@/types/event";

type EventCardImageProps = {
  image: NonNullable<EventCardData["image"]>;
  fallback: ReactNode;
};

export function EventCardImage({ image, fallback }: EventCardImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return fallback;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(max-width: 767px) 72vw, (max-width: 1023px) 33vw, 280px"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
