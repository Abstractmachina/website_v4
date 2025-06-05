import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { revalidateArt } from "@/utilities/next-revalidate";
import { GlobalConfig } from "payload";

const Graphics: GlobalConfig = {
  slug: "graphics",
  admin: {
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "logos",
      type: "array",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
        },
      ],
    }
  ],
  hooks: {
    afterChange: [({ req: { payload }, doc }) => revalidateArt(["graphics"])],
  },
};
export default Graphics;