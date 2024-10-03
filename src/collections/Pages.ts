import type { CollectionConfig } from "payload";
import { text } from 'payload/shared'

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
          name: 'slug',
          label: "Ruta de enlace",
          type: 'text',
          required: true,
          validate: (val, arg) => 
            /^[A-Za-z][\s\S]*$/.test(val)
              ? text(val, arg)
              : "No puede comenzar con caracteres especiales"
        },
        {
          name: 'content',
          label: "Contenido",
          type: 'richText',
        }
      ],

    }
    
export default Pages