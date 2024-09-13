import type { CollectionConfig } from "payload";

const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Artículo",
    plural: "Artículos"
  },
  fields: [
    {
      name: "Título",
      type: "text"
    },
    {
      name: "Ruta",
      type: "text"
    },
    {
      name: "Contenido",
      type: "richText"
    }
  ]
} 

export default Posts