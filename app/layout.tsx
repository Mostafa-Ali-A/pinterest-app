import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from './components/Header';
import Provider from './Provider';

const roboto = Roboto({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Pinterest App',
	description: 'Pinterest App',
	applicationName: 'Mostafa Ali',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${roboto.className}
				antialiased`}>
				<Provider>
					<Header />
					{children}
				</Provider>
			</body>
		</html>
	);
}
