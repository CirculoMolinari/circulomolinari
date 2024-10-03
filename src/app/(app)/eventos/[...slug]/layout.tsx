import { Container, Section } from '@radix-ui/themes';
import { ReactNode } from 'react';

function EventLayout({ children }: { children: ReactNode }) {
	return (
		<Section id="event-main">
			<Container size="3" p={{ initial: '5', sm: '0' }}>
				{children}
			</Container>
		</Section>
	);
}

export default EventLayout;
