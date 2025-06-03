import type { CollectionAfterReadHook, CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateArt } from '@/utilities/next-revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Description
 * @param {doc} doc full document
 * @param {any} req full express request
 * @param {any} query full express request query
 * @param {any} findMany boolean to denote if this hook is running against finding one, or finding many
 * @returns {any}
 */
const generateBunnyUrl: CollectionAfterReadHook = async ({
  doc,
  req,
  query,
  findMany,
}) => {
  const filename = doc.filename;
  const path = `/media/${filename}`;
  // const url = generateBunnyCdnToken(path, 86400);
  const url = `${process.env.BUNNY_PUBLIC_CDN_PULLZONE}${path}`;

  doc.url = url;
  return doc;
};



export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    // staticURL: `${process.env.BUNNY_PUBLIC_CDN_PULLZONE}/media`,
    // staticDir: "media",
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    // imageSizes: [
    //   {
    //     name: 'thumbnail',
    //     width: 300,
    //   },
    //   {
    //     name: 'square',
    //     width: 500,
    //     height: 500,
    //   },
    //   {
    //     name: 'small',
    //     width: 600,
    //   },
    //   {
    //     name: 'medium',
    //     width: 900,
    //   },
    //   {
    //     name: 'large',
    //     width: 1400,
    //   },
    //   {
    //     name: 'xlarge',
    //     width: 1920,
    //   },
    //   {
    //     name: 'og',
    //     width: 1200,
    //     height: 630,
    //     crop: 'center',
    //   },
    // ],
  },
  hooks: {
    afterChange: [({ req: { payload }, doc }) => revalidateArt(["media"])],
  },
}
