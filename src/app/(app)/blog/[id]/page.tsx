import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Box, Em, Heading, Section, Text } from "@radix-ui/themes";
import type { Metadata, ResolvingMetadata } from "next";
import { french } from "../../fonts";

type Props = {
	params: { id: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const id = params.id;

	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.findByID({
		collection: "posts",
		id,
	});

	return {
		title: data.title,
	};
}

export default async function Page({
	params: { id },
}: { params: { id: string } }) {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.findByID({
		collection: "posts",
		id,
	});

	return (
		<Section id="blog-post">
			<Box mb="8">
				<Heading as="h1" size="9" className={french.className}>
					{data.title}
				</Heading>
				<Heading as="h2" size="2" my="3">
					{data.author}
				</Heading>
			</Box>

			{data.content.root.children.map((rootChild, index) => {
				const children = rootChild.children as any[];
				if (rootChild.type === "paragraph")
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
