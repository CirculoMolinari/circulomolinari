import type { CollectionConfig } from "payload";
import { es } from "payload/i18n/es";

const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Artículo",
    plural: "Artículos"
  },
  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true
    },
    {
      name: "slug",
      label: "Segmento de enlace",
      type: "text",
      required: true
    },
    {
      name: "author",
      label: "Autor",
      type: "text",
    },
    {
      name: "content",
      label: "Contenido",
      type: "richText",
      required: true,
      localized: true
    }
  ]
} 

export default Posts