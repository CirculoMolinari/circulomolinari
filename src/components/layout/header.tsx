import { Box, Flex, Link } from "@radix-ui/themes";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export default async function Header() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "media",
	});

	return (
		<Flex id="header" align="center" justify="between">
			<Box>
				<Link href="/">
					<img id="logo" src={data.docs[0].url || ""} />
				</Link>
			</Box>
			<Box>
				<Flex id="navbar" direction="row">
					<Link href="/blog">Artículos</Link>
					<Link href="/evento">Evento</Link>
				</Flex>
			</Box>
		</Flex>
	);
}
