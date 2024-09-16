import { Box, Container, Flex, Link } from "@radix-ui/themes";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";

export default async function Header() {
	const payload = await getPayloadHMR({
		config,
	});

	const data = await payload.find({
		collection: "media",
	});

	return (
		<Box id="header-wrapper">
			<Container size="3">
				<Flex id="header" align="center" justify="between">
					<Box>
						<Link href="/">
							<Image
								src="/logo.webp"
								alt={data.docs[0]?.text || ""}
								height={100}
								width={100}
							/>
						</Link>
					</Box>
					<Box>
						<Flex id="navbar" direction="row">
							<Link href="/blog">Artículos</Link>
							<Link href="/evento">Evento</Link>
						</Flex>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}
