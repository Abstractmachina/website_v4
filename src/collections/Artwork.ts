import LABELS from "@/LABELS";
import { CollectionConfig } from "payload";

const Artwork: CollectionConfig = {
  slug: "artwork",
  labels: {
    singular: "Artwork",
    plural: "Artwork",
  },
  admin: {
    useAsTitle: "title",
    group: LABELS.art,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "medium",
      type: "text"
    },
    {
      name: "dimensions",
      type: "text"
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "date",
      type: "date",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "artTags",
      hasMany: true,
    }
  ],
};

export default Artwork