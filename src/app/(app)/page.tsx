import React from "react";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import {
	Box,
	Grid,
	Heading,
	Link,
	Section,
	Separator,
	Text,
} from "@radix-ui/themes";
import { MainLayout } from "@/components/layout/main";
import { french } from "./fonts";

export default async function Page() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "posts",
	});

	const documents = data.docs;
	const firstArticle = documents[0];
	const firstArticleExcerpt = firstArticle.content.root.children[0]
		.children as any[];
	documents.shift();

	return (
		<MainLayout id="home">
			<Box>
				<Link href={`blog/${firstArticle.id}`} className="link">
					<Heading as="h1" size="9" className={french.className}>
						{firstArticle.title}
					</Heading>
				</Link>
				<Text as="p" size="4" mt="5">
					{firstArticleExcerpt.map((child) => child.text)}
				</Text>
			</Box>
			<Separator my="8" orientation="horizontal" size="4" />

			<Box>
				<Grid
					columns={{ initial: "1", sm: "2" }}
					gap={{ initial: "0", sm: "2" }}
				>
					{data.docs.map((doc) => {
						const articles = doc.content.root.children[0].children as any[];
						return (
							<Box className="post-preview" key={doc.id}>
								<Link href={`/blog/${doc.id}`} className="link">
									<Heading as="h2" className={french.className}>
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
				</Grid>
			</Box>
		</MainLayout>
	);
}
