import { Container, Section } from '@radix-ui/themes';
import { ReactNode } from 'react';

type MainLayouProps = {
	id?: string;
	className?: string;
	children: ReactNode;
};
export function MainLayout({ id, className, children }: MainLayouProps) {
	return (
		<Section id={id} className={className}>
			<Container size="3" p={{ initial: '5', sm: '0' }}>
				{children}
			</Container>
		</Section>
	);
}
