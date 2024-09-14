import React from "react";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import {
	Box,
	Card,
	Grid,
	Heading,
	Link,
	Section,
	Separator,
	Text,
} from "@radix-ui/themes";

export default async function Page() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "posts",
	});

	const firstArticle = data.docs[0].content.root.children[0].children as any[];

	return (
		<Section id="home">
			<Box>
				<Heading as="h1" size="8">
					{data.docs[0].title}
				</Heading>
				<Text as="p" size="4" mt="5">
					{firstArticle.map((child) => child.text)}
				</Text>
			</Box>
			<Separator my="8" orientation="horizontal" size="4" />

			<Box>
				<Grid columns="2" gap="2">
					{data.docs.map((doc) => {
						const articles = doc.content.root.children[0].children as any[];
						return (
							<Box className="post-preview" key={doc.id}>
								<Link href={`/blog/${doc.id}`}>
									<Heading as="h2">{doc.title}</Heading>
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
				</Grid>
			</Box>
		</Section>
	);
}
