import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { CollectionConfig } from "payload";

const ArtTags: CollectionConfig = {
  slug: "artTags",
  admin: {
    useAsTitle: "name",
    group: LABELS.art,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true
    },
  ],
};

export default ArtTags;