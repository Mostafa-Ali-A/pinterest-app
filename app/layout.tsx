import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const roboto = Roboto({
	weight: ['400', '700'],
	subsets: ['latin'],
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
				<Header />
				{children}
			</body>
		</html>
	);
}
