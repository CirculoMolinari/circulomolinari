import type { CollectionConfig, FieldHook } from "payload";

const format = (val: string): string =>
	val
		.replace(/ /g, "-")
		.replace(/[^\w-/]+/g, "")
		.toLowerCase();

const formatSlug =
	(): FieldHook =>
	({ originalDoc, data }) =>
		format(data?.title || originalDoc.title);

const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "title",
	},
	access: {
		create: () => true,
		read: () => true,
	},
	labels: {
		singular: "Artículo",
		plural: "Artículos",
	},
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			label: "Segmento de enlace",
			type: "text",
			hidden: true,
			hooks: {
				beforeValidate: [formatSlug()],
			},
		},
		{
			name: "author",
			label: "Autor",
			type: "text",
			defaultValue: "Círculo Molinari",
		},
		{
			name: "content",
			label: "Contenido",
			type: "richText",
			required: true,
		},
	],
};

export default Posts;
