"use server";

import { Artwork } from "@/payload-types";
import config from "@/payload.config";
import { getPayload } from "payload";



export async function isArtwork(doc: any): Promise<boolean> {

  if (!doc) return false;
  const payload = await getPayload({ config });
  try {
    const artwork = await payload.find({
      collection: 'artwork',
      where: {
        slug: {
          equals: doc.slug,
        }
      },
    });

    if (artwork) {
      return true;
    }
  } catch (error) {
    console.error("Error in isArtwork:", error);
  }
  return false;
}