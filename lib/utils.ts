import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUUID(value: string) {
  return uuidRegex.test(value);
}

export function getEmbedScript(tourId: string) {
  if (!tourId || typeof tourId !== 'string') {
    throw new Error("Invalid tour ID");
  }

  if (!process.env.NEXT_PUBLIC_EMBED_SCRIPT_URL) {
    throw new Error("Embed Script URL is not defined");
  }
  const embedScriptUrl = process.env.NEXT_PUBLIC_EMBED_SCRIPT_URL + "?tour=" + encodeURIComponent(tourId);
  return `<script src="${embedScriptUrl}"></script>`;
}