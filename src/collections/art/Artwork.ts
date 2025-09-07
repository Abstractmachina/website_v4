import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { revalidateArt } from "@/utilities/next-revalidate";
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
  access: {
    read: anyone,
    create: authenticated,
    delete: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
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
      name: "date",
      type: "date",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "artTags",
      hasMany: true,
      index: true,
    },
    {
      name: "salesLink",
      type: "text",
    },
    {
      name: "originalForSale",
      type: "checkbox"
    },
    {
      name: "originalSold",
      type: "checkbox"
    },
  ],
  hooks: {
    afterChange: [({ req: { payload }, doc }) => revalidateArt(["artwork", "artTags"])],
  },
};

export default Artwork