import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
      slug: 'users',
      labels: {
        singular: "Usuario",
        plural: "Usuarios"
      },
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
  }
    
export default Users
