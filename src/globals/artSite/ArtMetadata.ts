import LABELS from "@/LABELS";
import { GlobalConfig } from "payload";
import { MetadataFields } from "../../types/MetadataFields";

const ArtMetadata: GlobalConfig = {
	slug: "artMetadata",
	admin: {
		group: LABELS.art,
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					name: "home",
					fields: MetadataFields,
				},
			],
		},
	],
};

export default ArtMetadata;
