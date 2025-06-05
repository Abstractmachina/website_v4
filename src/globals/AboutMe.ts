import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { revalidateArt } from "@/utilities/next-revalidate";
import { GlobalConfig } from "payload";

const AboutMe: GlobalConfig = {
  slug: "about",
  admin: {
    group: LABELS.art,
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "intro",
      type: "textarea",
    },
    {
      name: "main",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    }
  ],
  hooks: {
    afterChange: [({ req: { payload }, doc }) => revalidateArt(["about"])],
  },
};

export default AboutMe;