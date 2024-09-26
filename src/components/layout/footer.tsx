import {
	Box,
	Container,
	DataList,
	Flex,
	Grid,
	Separator,
	Strong,
	Text,
} from "@radix-ui/themes";
import Image from "next/image";

export default function Footer() {
	return (
		<Container id="footer" size="4">
			<Grid columns="2" justify="between" align="center">
				<Box>
					<DataList.Root>
						<DataList.Item>
							<DataList.Value>
								<Grid columns="3" gap="3" align="center">
									<a
										href="https://www.youtube.com/@circulomolinari4831"
										target="_blank"
									>
										<Image
											src="/youtube.svg"
											height={30}
											width={30}
											alt="Canal de YouTube del Círculo Molinari"
										/>
									</a>
									<a
										href="https://www.instagram.com/circulomolinari/"
										target="_blank"
									>
										<Image
											src="/instagram.svg"
											height={25}
											width={25}
											alt="Cuenta de Instagram del Círculo Molinari"
										/>
									</a>
									<a href="https://x.com/CirculoMolinari" target="_blank">
										<Image
											src="/twitter.svg"
											height={25}
											width={25}
											alt="Cuenta de X del Círculo Molinari"
										/>
									</a>
								</Grid>
							</DataList.Value>
						</DataList.Item>
					</DataList.Root>
				</Box>
				<Box>
					<DataList.Root>
						<DataList.Item>
							<DataList.Label>
								<Strong>Contacto</Strong>
							</DataList.Label>
							<DataList.Value>circulomolinari@protonmail.com</DataList.Value>
						</DataList.Item>
					</DataList.Root>
				</Box>
			</Grid>
			<Separator size="4" mt="5" />
			<Text size="1" mt="5" as="div">
				2024, Círculo Molinari. Sin copyright, permitido plagiar.
			</Text>
		</Container>
	);
}
