import { MainLayout } from '@/components/layout/main';
import { ReactNode } from 'react';

function PageLayout({ children }: { children: ReactNode }) {
	return <MainLayout>{children}</MainLayout>;
}

export default PageLayout;
