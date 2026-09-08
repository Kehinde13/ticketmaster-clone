import type { EventImage } from "@/types/event";

const targetRatio = 3 / 2;
const targetWidth = 560;

function safeHttpsUrl(value: string): boolean {
  if (!URL.canParse(value)) return false;
  return new URL(value).protocol === "https:";
}

function usableDimension(value: number | null): boolean {
  return value === null || (Number.isFinite(value) && value > 0);
}

function candidateRatio(image: EventImage): number | null {
  if (image.width !== null && image.height !== null) {
    return image.width / image.height;
  }
  if (image.ratio === "3:2") return 3 / 2;
  if (image.ratio === "16:9") return 16 / 9;
  if (image.ratio === "4:3") return 4 / 3;
  return null;
}

function compareImages(a: EventImage, b: EventImage): number {
  const aRatio = candidateRatio(a);
  const bRatio = candidateRatio(b);
  const measuredADistance = aRatio === null ? Number.POSITIVE_INFINITY : Math.abs(aRatio - targetRatio);
  const measuredBDistance = bRatio === null ? Number.POSITIVE_INFINITY : Math.abs(bRatio - targetRatio);
  const aDistance = measuredADistance <= 0.02 ? 0 : measuredADistance;
  const bDistance = measuredBDistance <= 0.02 ? 0 : measuredBDistance;
  if (aDistance !== bDistance) return aDistance - bDistance;

  const aSufficient = (a.width ?? 0) >= targetWidth;
  const bSufficient = (b.width ?? 0) >= targetWidth;
  if (aSufficient !== bSufficient) return aSufficient ? -1 : 1;
  if (a.fallback !== b.fallback) return a.fallback ? 1 : -1;
  if ((a.width ?? 0) !== (b.width ?? 0)) return (b.width ?? 0) - (a.width ?? 0);
  if ((a.height ?? 0) !== (b.height ?? 0)) return (b.height ?? 0) - (a.height ?? 0);
  if (a.url !== b.url) return a.url.localeCompare(b.url);
  if (a.ratio !== b.ratio) return a.ratio.localeCompare(b.ratio);
  return (a.attribution ?? "").localeCompare(b.attribution ?? "");
}

export function selectEventImage(
  images: readonly EventImage[],
): EventImage | null {
  const candidates = images.filter(
    (image) =>
      safeHttpsUrl(image.url) &&
      usableDimension(image.width) &&
      usableDimension(image.height),
  );

  return candidates.toSorted(compareImages)[0] ?? null;
}
