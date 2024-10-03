import { ConferenceBlock } from '@/blocks/Conference/ConferenceBlock';
import { ScheduleBlock } from '@/blocks/Schedule/ScheduleBlock';
import type { CollectionConfig } from 'payload';
import { text } from 'payload/shared'

const Events: CollectionConfig = {
	slug: 'events',
	labels: {
		singular: 'Evento',
		plural: 'Eventos',
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			label: 'Título',
			type: 'text',
			required: true,
		},
		{
			name: 'slug',
			label: 'Ruta de enlace',
			type: 'text',
			required: true,
			validate: (val, arg) =>
				/^[A-Za-z][\s\S]*$/.test(val)
					? text(val, arg)
					: 'No puede comenzar con caracteres especiales',
		},
		{
			name: 'conditions',
			label: 'Precio y detalles incluídos',
			type: 'text',
			required: true,
		},
		{
			name: 'introduction',
			label: 'Presentación',
			type: 'richText',
		},
		{
			name: 'content',
			label: 'Contenido',
			type: 'blocks',
			blocks: [ConferenceBlock, ScheduleBlock],
		},
	],
};

export default Events;
