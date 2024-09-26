import type { CollectionConfig } from "payload";

const Media: CollectionConfig = {
      slug: 'media',
      upload: true,
      access: {
        create: () => true,
        read: () => true,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    }
    
export default Media