// lib/seo.ts

import type { Metadata } from "next";

export function generateSEO(
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    keywords: ["jobs", "hiring", "OmegaHiring"],
  };
}