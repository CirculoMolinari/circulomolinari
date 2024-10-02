import { Block } from 'payload';

export const ScheduleBlock: Block = {
	slug: 'scheduleBlock',
	labels: {
		singular: 'Programa',
		plural: 'Programas',
	},
	fields: [
		{
			name: 'schedules',
			label: 'Horarios',
			type: 'array',
			fields: [
				{
					name: 'schedule',
					type: 'text',
					label: 'Horario',
				},
				{
					name: 'description',
					type: 'text',
					label: 'Descripción',
				},
			],
		},
	],
};
