import {
	Avatar,
	Box,
	Card,
	Container,
	Em,
	Flex,
	Grid,
	Heading,
	Link,
	Section,
	Separator,
	Strong,
	Table,
	Text,
} from '@radix-ui/themes';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { french } from '../../fonts';
import type { Event, Media, Page } from 'payload-types';
import ContactForm from '@/components/form';

export default async function Page({
	params: { slug },
}: { params: { slug: string } }) {
	const payload = await getPayloadHMR({
		config,
	});

	const event = await payload.find({
		collection: 'events',
		where: { slug: { equals: slug[0] } },
	});

	const eventDoc = event.docs[0] as Event;
	const conference = eventDoc.content?.find(
		(content) => content.blockType === 'conferenceBlock',
	);
	const schedule = eventDoc.content?.find(
		(content) => content.blockType === 'scheduleBlock',
	);

	return (
		<Section id="page-event" p="0">
			<Heading as="h1" size="9" mb="8" className={french.className}>
				{eventDoc?.title}
			</Heading>

			{eventDoc.introduction?.root.children.map((rootChild, index) => {
				const children = rootChild.children as any[];

				if (rootChild.type === 'heading')
					return (
						<Heading key={index} my="5">
							{children.map((child) => {
								return child.text;
							})}
						</Heading>
					);

				if (rootChild.type === 'paragraph')
					return (
						<Text key={index} as="p" my="3">
							{children.map((child, index) => {
								console.log('children', child.type, child);
								if (child.format === 1)
									return <Strong key={index}>{child.text}</Strong>;

								if (child.format === 2)
									return <Em key={index}>{child.text}</Em>;

								if (child.type === 'link')
									return (
										<Link
											key={index}
											href={child.fields.url}
											target="_blank"
											color="blue"
										>
											{child.children[0].text}
										</Link>
									);

								return child.text;
							})}
						</Text>
					);
			})}

			{schedule && (
				<Section>
					<Separator size="4" my="6" />

					<Heading as="h1" size="9" mb="8" className={french.className}>
						Programa
					</Heading>

					<Table.Root variant="surface" size="3" className="shadow-md">
						<Table.Body>
							{schedule.schedules?.map((schedule) => {
								const isHeader =
									schedule.schedule === null && schedule.description !== '';

								return (
									<Table.Row
										key={schedule.id}
										className={isHeader ? 'bg-amber-300 font-bold text-lg' : ''}
									>
										<Table.RowHeaderCell className="font-semibold">
											{schedule.schedule}
										</Table.RowHeaderCell>
										<Table.Cell>{schedule.description}</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table.Root>
				</Section>
			)}

			{conference && (
				<Section>
					<Separator size="4" mb="6" />
					<Heading as="h1" size="9" mb="8" className={french.className}>
						Ponentes
					</Heading>
					<Box mb="9">
						<Grid
							columns={{ initial: '1', sm: '2' }}
							gap={{ initial: '0', sm: '9' }}
						>
							{conference.speakers?.map((speaker) => {
								const picture = speaker.picture as Media;
								return (
									<Box key={speaker.id}>
										<Card variant="ghost">
											<Flex gap="3" align="center" className="py-5 md:py-10">
												{picture && (
													<Avatar
														size="9"
														src={picture.url || ''}
														radius="full"
														color="bronze"
														className="shadow-sm bg-amber-400"
														fallback="T"
													/>
												)}
												<Box>
													<Text
														as="div"
														size="7"
														weight="bold"
														mb="4"
														className={french.className}
													>
														{speaker.speaker}
													</Text>
													<Text as="div" size="2" color="gray">
														{speaker.introduction}
													</Text>
												</Box>
											</Flex>
										</Card>
									</Box>
								);
							})}
						</Grid>
					</Box>

					<Container size={{ initial: '2', sm: '4' }}>
						<Flex
							className="w-full mt-10"
							align="center"
							justify="center"
							direction="column"
						>
							<Heading as="h1" size="9" mb="8" className={french.className}>
								Inscripción
							</Heading>
							<Text as="p">{eventDoc.conditions}</Text>
							<ContactForm />
						</Flex>
					</Container>
				</Section>
			)}
		</Section>
	);
}
