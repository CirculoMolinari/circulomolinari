import { Em, Heading, Section, Text } from '@radix-ui/themes';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { french } from '../fonts';
import type { Page } from 'payload-types';

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

	const pageDoc = page.docs[0] as Page;

	return (
		<Section id="page-event" p="0">
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
		</Section>
	);
}
