import type { CollectionConfig } from "payload";

const Media: CollectionConfig = {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    }
    
export default Media