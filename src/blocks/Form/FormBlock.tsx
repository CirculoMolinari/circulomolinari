import { Block } from "payload";

export const FormBlock: Block = {
	slug: "formBlock",
	labels: {
		singular: "Formulario",
		plural: "Formularios",
	},
	fields: [
		{
			name: "form",
			type: "relationship",
			relationTo: "forms",
			required: true,
		},
	],
};
