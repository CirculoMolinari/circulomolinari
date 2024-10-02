import path from 'path'
import { es } from 'payload/i18n/es'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import Users from '@/collections/Users'
import Pages from '@/collections/Pages'
import Media from '@/collections/Media'
import Posts from '@/collections/Posts'
import Events from '@/collections/Events'
import {
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { seoPlugin } from "@payloadcms/plugin-seo";
import { resendAdapter } from "@payloadcms/email-resend"
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { Header } from '@/globals/Header'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    Events,
    Media,
    Pages,
    Posts,
    Users,
  ],
  globals: [Header],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || ''
    }
  }),
  plugins: [
    seoPlugin({
      collections: ["events", "pages", "posts"],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Círculo Molinari — ${doc.title}`,
      generateDescription: ({ doc }) => doc.collection.content,
      generateURL: ({ doc }) =>
      `https://circulomolinari.com/${doc?.slug}`
    }),
    formBuilderPlugin({
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        [Media.slug]: true
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || ""
    })
  ],
  email: resendAdapter({
    defaultFromAddress: "circulomolinari@protonmail.com",
    defaultFromName: "Círculo Molinari",
    apiKey: process.env.RESEND_API_KEY || ""
  }),
  i18n: {
    supportedLanguages: { es },
  },
  admin: {
    user: Users.slug,
  },
  sharp,
})
