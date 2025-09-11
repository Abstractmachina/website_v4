import { Field } from "payload";

export const MetadataFields: Field[] = [
	{
		name: "title",
		type: "text",
	},
	{
		name: "description",
		type: "text",
	},
	{
		name: "creator",
		type: "text",
	},
	{
		name: "publisher",
		type: "text",
	},
	{
		name: "generator",
		type: "text",
	},
	{
		name: "referrer",
		type: "text",
	},
	{
		name: "authors",
		type: "array",
		fields: [
			{
				name: "name",
				type: "text",
			},
		],
	},
	{
		name: "keywords",
		type: "array",
		fields: [
			{
				name: "keyword",
				type: "text",
			},
		],
	},
	{
		name: "formatDetection",
		type: "group",
		fields: [
			{
				name: "telephone",
				type: "checkbox",
			},
			{
				name: "email",
				type: "checkbox",
			},
			{
				name: "address",
				type: "checkbox",
			},
		],
	},
	{
		name: "openGraph",
		type: "group",
		fields: [
			{
				name: "title",
				type: "text",
			},
			{
				name: "description",
				type: "text",
			},
			{
				name: "url",
				type: "text",
			},
			{
				name: "siteName",
				type: "text",
			},
			{
				name: "locale",
				type: "text",
			},
			{
				name: "type",
				type: "text",
			},
			{
				name: "publishedTime",
				type: "date",
			},

			{
				name: "images",
				type: "upload",
				relationTo: "media",
				hasMany: true,
			},
			{
				name: "videos",
				type: "upload",
				relationTo: "media",
				hasMany: true,
			},
			{
				name: "audio",
				type: "upload",
				relationTo: "media",
				hasMany: true,
			},
		],
	},
];
