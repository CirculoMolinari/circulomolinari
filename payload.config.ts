import path from 'path'
import { es } from 'payload/i18n/es'
import {
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { postgresAdapter } from "@payloadcms/db-postgres"
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import Users from '@/collections/Users'
import Pages from '@/collections/Pages'
import Media from '@/collections/Media'
import Posts from '@/collections/Posts'
import Events from '@/collections/Events'
import { seoPlugin } from "@payloadcms/plugin-seo";

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
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || ''
    }
  }),
  plugins: [
    seoPlugin({
      collections: ["events", "pages", "posts"],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Círculo Molinari — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt
    })
  ],
  i18n: {
    supportedLanguages: { es },
  },
  admin: {
    user: Users.slug,
  },
  sharp,
})
