import { Box, Heading, Section, Text } from '@radix-ui/themes';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { french } from '../fonts';
import Link from 'next/link';

export default async function Page() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: 'posts',
		showHiddenFields: true,
	});

	return (
		<Section>
			<Heading as="h1" size="9" mb="8" className={french.className}>
				Artículos
			</Heading>

			<Box>
				{data.docs.map((doc) => {
					const articles = doc.content.root.children[0].children as any[];

					return (
						<Box key={doc.id} mb="9">
							<Link href={`/blog/${doc.slug || ''}`}>
								<Heading as="h2" className={french.className} size="8">
									{doc.title}
								</Heading>
							</Link>

							<Text as="p" mt="3">
								{data.docs[0].author}
							</Text>
							<Text mt="5" as="p">
								{articles.map((child) => child.text)}
							</Text>
						</Box>
					);
				})}
			</Box>
		</Section>
	);
}
