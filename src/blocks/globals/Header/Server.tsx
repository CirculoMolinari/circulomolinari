import { Box, Container, Flex } from '@radix-ui/themes';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import Image from 'next/image';
import { Media, Page } from 'payload-types';
import Link from 'next/link';

export default async function HeaderServer() {
	const payload = await getPayloadHMR({
		config,
	});

	const header = await payload.findGlobal({
		slug: 'header',
	});

	const logo = header.logo as Media;

	const relatedRoutes = {
		events: '/eventos/',
		pages: '/',
	};

	return (
		<Box id="header-wrapper">
			<Container size="4">
				<Flex id="header" align="center" justify="between">
					<Box>
						<Link href="/">
							<Image
								src={logo.url || ''}
								alt={logo.text || ''}
								height={100}
								width={100}
							/>
						</Link>
					</Box>

					<Box>
						<Flex id="navbar" direction="row">
							{header.nav.map((navItem) => {
								const relatedPage = navItem.href.value as Page;
								const route = relatedRoutes[navItem.href.relationTo];

								return (
									<Link key={navItem.id} href={`${route}${relatedPage.slug}`}>
										{navItem.label}
									</Link>
								);
							})}
						</Flex>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}
