import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Box, Em, Heading, Section, Text } from "@radix-ui/themes";
import { RichTextField } from "payload";

interface A {
	content: RichTextField;
}

export default async function Page({ params }: { params: { id: string } }) {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "posts",
		where: { id: { equals: params.id } },
	});

	return (
		<Section id="blog-post">
			<Box mb="5">
				<Heading as="h1" size="8">
					{data.docs[0].title}
				</Heading>
				<Heading as="h2" size="2" my="3">
					{data.docs[0].author}
				</Heading>
			</Box>

			{data.docs.map((doc) =>
				doc.content.root.children.map((rootChild, index) => {
					if (rootChild.type === "paragraph")
						return (
							<Text key={index} as="p">
								{rootChild.children.map((child, index) => {
									if (child.format === 2)
										return <Em key={index}>{child.text}</Em>;

									return child.text;
								})}
							</Text>
						);
				}),
			)}
		</Section>
	);
}
