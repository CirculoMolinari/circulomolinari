import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { Box, Em, Heading, Section, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { french } from '../../fonts';
import { Post } from 'payload-types';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = params.slug;

	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: 'posts',
		where: { slug: { equals: slug } },
	});

	return {
		title: data.docs[0].title,
	};
}

export default async function Page({
	params: { slug },
}: { params: { slug: string } }) {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: 'posts',
		where: { slug: { equals: slug } },
	});
	const post = data.docs[0] as Post;

	return (
		<Section id="blog-post">
			<Box mb="8">
				<Heading as="h1" size="9" className={french.className}>
					{post.title}
				</Heading>
				<Heading as="h2" size="2" my="3">
					{post.author}
				</Heading>
			</Box>

			{post.content.root.children.map((rootChild, index) => {
				const children = rootChild.children as any[];
				if (rootChild.type === 'paragraph')
					return (
						<Text key={index} as="p" className="text-justify">
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
