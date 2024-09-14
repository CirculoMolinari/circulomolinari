import { Em, Heading, Section, Text } from "@radix-ui/themes";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

type RootChild = {
	type: string;
	children: any[];
};
export default async function Page() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "pages",
	});

	return (
		<Section id="page-event">
			<Heading as="h1" size="9" mb="8">
				{data.docs[0].title}
			</Heading>

			{data.docs.map((doc) =>
				doc.content?.root.children.map((rootChild, index) => {
					const children = rootChild.children as any[];

					if (rootChild.type === "heading")
						return (
							<Heading key={index} my="5">
								{children.map((child, index) => {
									return child.text;
								})}
							</Heading>
						);
					if (rootChild.type === "paragraph")
						return (
							<Text key={index} as="p" my="3">
								{children.map((child, index) => {
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
