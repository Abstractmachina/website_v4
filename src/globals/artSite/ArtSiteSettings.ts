import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { revalidateArt } from "@/utilities/next-revalidate";
import { GlobalConfig } from "payload";

export const ArtSiteSettings: GlobalConfig = {
	slug: "artSiteSettings",
	admin: {
		group: LABELS.art,
	},
	access: {
		read: authenticated,
		update: authenticated,
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "General",
					fields: [
						{
							name: "blogLive",
							label: "Set blog status to live",
							type: "checkbox",
						},
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
						},
					],
				},
				{
					name: "aboutMe",
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
						},
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [
			({ req: { payload }, doc }) => revalidateArt(["artSiteSettings"]),
		],
	},
};

export default ArtSiteSettings;
