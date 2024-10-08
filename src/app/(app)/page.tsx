import React from 'react';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import {
	Box,
	Em,
	Grid,
	Heading,
	Link,
	Separator,
	Text,
} from '@radix-ui/themes';
import { MainLayout } from '@/components/layout/main';
import { french } from './fonts';
import type { Media, Page } from 'payload-types';
import Image from 'next/image';

export default async function Page() {
	const payload = await getPayloadHMR({
		config,
	});

	const pages = await payload.find({
		collection: 'pages',
		where: { slug: { equals: 'home' } },
	});

	const homePage = pages.docs[0] as Page;

	const posts = await payload.find({
		collection: 'posts',
	});

	if (posts.docs.length === 0) return <div>No hay posts</div>;
	console.log('posts', posts.docs);

	return (
		<MainLayout id="home">
			<Box>
				<Heading as="h1" size="9" className={french.className}>
					{homePage.title}
				</Heading>

				{homePage.content?.root.children.map((rootChild, index) => {
					const children = rootChild.children as any[];
					if (rootChild.type === 'paragraph')
						return (
							<Text key={index} as="p" size="4" mt="5">
								{children.map((child, index) => {
									if (child.format === 2)
										return <Em key={index}>{child.text}</Em>;

									return child.text;
								})}
							</Text>
						);
				})}
			</Box>
			<Separator my="8" orientation="horizontal" size="4" />

			<Box>
				<Grid
					columns={{ initial: '1', sm: '2' }}
					gap={{ initial: '0', sm: '2' }}
				>
					{posts.docs.map((doc) => {
						const articles = doc.content.root.children[0].children as any[];
						const picture = doc.picture as Media;

						return (
							<Box className="post-preview" key={doc.id}>
								<Link href={`/articulos/${doc.slug}`} className="link">
									{picture && (
										<div className="relative w-full h-52 mb-5">
											<Image
												src={picture.url || ''}
												alt={picture.text || ''}
												fill
												className="object-cover rounded-md border border-slate-800 object-left-top"
											/>
										</div>
									)}
									<Heading as="h2" className={french.className}>
										{doc.title}
									</Heading>
								</Link>

								<Text as="p" mt="3">
									{doc.author}
								</Text>
								<Text mt="5" as="p" className="text-justify">
									{articles.map((child) => child.text)}
								</Text>
							</Box>
						);
					})}
				</Grid>
			</Box>
		</MainLayout>
	);
}
