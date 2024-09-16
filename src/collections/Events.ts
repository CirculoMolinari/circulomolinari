import type { CollectionConfig } from "payload";

const Events: CollectionConfig = {
      slug: 'events',
      labels: {
        singular: "Evento",
        plural: "Eventos"
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
        }
      ],
    }
    
export default Events