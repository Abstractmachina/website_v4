import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { Banner } from "@/blocks/Banner/config";
import { Code } from "@/blocks/Code/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import LABELS from "@/LABELS";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { BlocksFeature, FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

const ArtBlogPosts: CollectionConfig = {
	slug: "artBlogPosts",
	admin: {
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "artBlogPosts",
					req,
				});

				return path;
			},
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "artBlogPosts",
				req,
			}),
		useAsTitle: "title",
		group: LABELS.art,
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					fields: [
						{
							name: "heroImage",
							type: "upload",
							relationTo: "media",
						},
						{
							name: "content",
							type: "richText",
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({
											enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
										}),
										BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature(),
									];
								},
							}),
							label: false,
							required: true,
						},
					],
					label: "Content",
				},
				{
					fields: [
						{
							name: "relatedPosts",
							type: "relationship",
							admin: {
								position: "sidebar",
							},
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id],
									},
								};
							},
							hasMany: true,
							relationTo: "artBlogPosts",
						},
						{
							name: "tags",
							type: "relationship",
							admin: {
								position: "sidebar",
							},
							hasMany: true,
							relationTo: "artTags",
              index: true,
            },
					],
					label: "Meta",
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),

						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
	],
};

export default ArtBlogPosts;
