import type { CollectionConfig } from "payload";

const Pages: CollectionConfig = {
      slug: 'pages',
      labels: {
        singular: "Pagina",
        plural: "Páginas"
      },
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          label: "Título",
          type: 'text',
        },
        {
          name: 'content',
          label: "Contenido",
          type: 'richText',
        },
      ],
    }
    
export default Pages