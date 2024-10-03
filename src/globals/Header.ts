import { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'nav',
      label: 'Menú principal',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          label: 'Nombre',
          type: 'text',
          required: true
        },
        {
          name: 'href',
          label: 'Enlace',
          type: 'relationship',
          relationTo: ['pages', 'events'],
          required: true
        }
      ]
    }
  ]
}