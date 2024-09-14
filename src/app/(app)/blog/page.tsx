import { Box, Heading, Link, Section, Text } from "@radix-ui/themes";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export default async function Page() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "posts",
	});

	return (
		<Section>
			<Heading as="h1" size="9">
				Artículos
			</Heading>

			<Box>
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
			</Box>
		</Section>
	);
}
