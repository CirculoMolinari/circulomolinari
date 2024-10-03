import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { Box, Em, Heading, Section, Strong, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { french } from '../../fonts';
import { Media, Post } from 'payload-types';
import Image from 'next/image';

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
	const date = new Date(post.createdAt).toLocaleDateString();
	const picture = post.picture as Media;

	return (
		<Section id="blog-post">
			{picture && (
				<Box className="relative w-full h-80 mb-5">
					<Image
						src={picture.url || ''}
						alt={picture.text || ''}
						fill
						className="object-cover object-left-top rounded-md border border-slate-800"
					/>
				</Box>
			)}

			<Box>
				<Heading as="h1" size="9" className={french.className}>
					{post.title}
				</Heading>
				<Text as="div" size="2" className="mt-10 mb-5">
					<Strong>{post.author}</Strong> | Publicado el {date}
				</Text>
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
