import { Block } from "payload";

export const ConferenceBlock: Block = {
	slug: "conferenceBlock",
	labels: {
		singular: "Conferencia",
		plural: "Conferencias",
	},
	fields: [
		{
			name: "speakers",
			label: "Conferencistas",
			type: "array",
			fields: [
				{
					name: "speaker",
					type: "text",
					label: "Conferencista",
					required: true,
				},
				{
					name: "picture",
					type: "upload",
					relationTo: "media",
					label: "Foto",
				},
				{
					name: "introduction",
					type: "textarea",
					label: "Presentación",
				},
			],
		},
	],
};
