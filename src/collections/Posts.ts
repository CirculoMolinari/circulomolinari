import type { CollectionConfig } from "payload";

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
    }
  ]
} 

export default Posts