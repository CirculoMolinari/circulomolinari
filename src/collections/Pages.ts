import { FormBlock } from "@/blocks/Form/FormBlock";
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
          name: 'slug',
          label: "Ruta de enlace",
          type: 'text',
          required: true
        },
        {
          name: 'content',
          label: "Contenido",
          type: 'richText',
        }
      ],

    }
    
export default Pages