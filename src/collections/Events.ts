import { ConferenceBlock } from "@/blocks/Conference/ConferenceBlock";
import type { CollectionConfig } from "payload";

const Events: CollectionConfig = {
	slug: "events",
	labels: {
		singular: "Evento",
		plural: "Eventos",
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true
		},
		{
			name: "slug",
			label: "Ruta de enlace",
			type: "text"
		},
		{
			name: "introduction",
			label: "Presentación",
			type: "richText"
		},
		{
			name: "content",
			label: "Contenido",
			type: "blocks",
			blocks: [ConferenceBlock],
		},
	],
};

export default Events;
