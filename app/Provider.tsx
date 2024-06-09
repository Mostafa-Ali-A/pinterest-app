'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

/*export interface props {
	children?: ReactNode;
}*/

export default function Provider(
	{
		children,
	}: Readonly<{
		children: ReactNode;
	}> /*{ children: ReactNode }*/ /*props*/,
) {
	return <SessionProvider>{children}</SessionProvider>;
}
