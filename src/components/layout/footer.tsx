import { Box, Container, DataList, Grid, Strong } from "@radix-ui/themes";

export default function Footer() {
	return (
		<Container id="footer" size="3">
			<Grid columns="2">
				<Box></Box>
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
		</Container>
	);
}
