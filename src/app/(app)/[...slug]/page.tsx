import {
	Avatar,
	Box,
	Card,
	Container,
	Em,
	Flex,
	Grid,
	Heading,
	Section,
	Separator,
	Text,
} from '@radix-ui/themes';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { french } from '../fonts';
import type { Event, Media, Page } from 'payload-types';
import ContactForm from '@/components/form';

export default async function Page({
	params: { slug },
}: { params: { slug: string } }) {
	const payload = await getPayloadHMR({
		config,
	});

	const page = await payload.find({
		collection: 'pages',
		where: { slug: { equals: slug[0] } },
	});

	const event = await payload.find({
		collection: 'events',
	});

	const pageDoc = page.docs[0] as Page;
	const eventDoc = event.docs[0] as Event;
	const conference = eventDoc.content?.find(
		(content) => content.blockType === 'conferenceBlock',
	);

	return (
		<Section id="page-event">
			<Heading as="h1" size="9" mb="8" className={french.className}>
				{page.docs[0]?.title}
			</Heading>

			{pageDoc.content?.root.children.map((rootChild, index) => {
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
								if (child.format === 2)
									return <Em key={index}>{child.text}</Em>;

								return child.text;
							})}
						</Text>
					);
			})}

			{conference && (
				<Section>
					<Separator size="4" mb="9" />
					<Heading as="h1" size="9" mb="8" className={french.className}>
						Ponentes
					</Heading>
					<Box mb="9">
						<Grid
							columns={{ initial: '1', sm: '2' }}
							gap={{ initial: '0', sm: '2' }}
						>
							{conference.speakers?.map((speaker) => {
								const picture = speaker.picture as Media;
								return (
									<Box key={speaker.id}>
										<Card variant="ghost">
											<Flex gap="3" align="center">
												<Avatar
													size="9"
													src={picture.url || ''}
													radius="full"
													color="bronze"
													className="shadow-sm bg-amber-400"
													fallback="T"
												/>
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
