import { Box, Flex, Link, Text } from "@radix-ui/themes";

export default function Header() {
	return (
		<Flex id="header" align="center" justify="between">
			<Box>
				<Text>Círculo Molinari</Text>
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
