'use client';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import anonymous from '@/public/anonymous.webp';

export default function Header() {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);
	const theme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	console.log(session);

	const toggleBTN = (e: React.MouseEvent<HTMLButtonElement>): void => {
		const target = document.getElementById('dropdown');
		target?.classList?.toggle('hidden');
	};

	/* Clicking Outside The Div Closing It */

	const handleClick = (e: MouseEvent /*CustomEvent*/ /*Event*/): e /*CustomEvent*/ is /*Event*/ MouseEvent => {
		if (
			!(e.target as HTMLElement).closest<HTMLElement>('#dropdown') &&
			(e.target as HTMLButtonElement).id !== 'Settings' &&
			(e.target as HTMLElement).id !== 'SVG' &&
			(e.target as HTMLElement).id !== 'path'
		) {
			const target = document.getElementById('dropdown');
			target?.classList.add('hidden');
		}
		return 'detail' in e;
	};

	useEffect(() => {
		window.addEventListener('click', ((e: MouseEvent /*CustomEvent*/ /*Event*/) => {
			// e is now narrowed to CustomEvent ...
			if (!handleClick(e)) handleClick;
		}) as EventListener);
		return () => {
			window.removeEventListener('click', (e: MouseEvent /*CustomEvent*/ /*Event*/) => {
				// e is now narrowed to CustomEvent ...
				if (!handleClick(e)) handleClick;
			});
		};
	}, []);

	return (
		<>
			<header className='pt-3 pl-6'>
				<nav className='w-full flex items-center'>
					{session ? (
						<>
							{session ? (
								<button
									title='Main Menu'
									className='flex rounded-full mt-0.5 mr-1 py-1 pl-1 hover:bg-gray-200'>
									<div className='m-1'>
										<svg
											className='w-6 h-6 text-red-500'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12' />
										</svg>
									</div>
									<p className='m-1 font-medium text-[15.5px] text-nowrap'>Home feed</p>
									<div className='mt-[11px] mr-3 ml-1'>
										<svg
											className='w-3 h-3 text-black'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M2.5 6.5h19A2.5 2.5 0 0 0 24 4a2.5 2.5 0 0 0-2.5-2.5h-19A2.5 2.5 0 0 0 0 4a2.5 2.5 0 0 0 2.5 2.5m19 3h-19A2.5 2.5 0 0 0 0 12a2.5 2.5 0 0 0 2.5 2.5h19A2.5 2.5 0 0 0 24 12a2.5 2.5 0 0 0-2.5-2.5M0 20a2.5 2.5 0 0 0 2.5 2.5h19A2.5 2.5 0 0 0 24 20a2.5 2.5 0 0 0-2.5-2.5h-19A2.5 2.5 0 0 0 0 20' />
										</svg>
									</div>
								</button>
							) : (
								<button
									onClick={() => signIn()}
									title='Sign in First'
									className='flex rounded-full mt-0.5 mr-1 py-1 pl-1 hover:bg-gray-200'>
									<div className='m-1'>
										<svg
											className='w-6 h-6 text-red-500'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12' />
										</svg>
									</div>
									<p className='m-1 font-medium text-[15.5px] text-nowrap'>Home feed</p>
									<div className='mt-[11px] mr-3 ml-1'>
										<svg
											className='w-3 h-3 text-black'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M2.5 6.5h19A2.5 2.5 0 0 0 24 4a2.5 2.5 0 0 0-2.5-2.5h-19A2.5 2.5 0 0 0 0 4a2.5 2.5 0 0 0 2.5 2.5m19 3h-19A2.5 2.5 0 0 0 0 12a2.5 2.5 0 0 0 2.5 2.5h19A2.5 2.5 0 0 0 24 12a2.5 2.5 0 0 0-2.5-2.5M0 20a2.5 2.5 0 0 0 2.5 2.5h19A2.5 2.5 0 0 0 24 20a2.5 2.5 0 0 0-2.5-2.5h-19A2.5 2.5 0 0 0 0 20' />
										</svg>
									</div>
								</button>
							)}
							{session?.user ? (
								<button
									title='Profile Search'
									className='flex items-center mt-1 border ml-auto mr-1 border-gray-200 rounded-full hover:bg-gray-200'>
									<div className='my-2 ml-2 mr-4 w-7 h-7'>
										<img
											className='rounded-full'
											alt='User Profile'
											src={session?.user?.image as string}
											width={32}
											height={32}
										/>
									</div>
									<div className='flex-col'>
										<p className='mt-1.5 mr-3 text-xs text-nowrap'>{session?.user?.name}</p>
										<p className='mb-.5 font-medium text-nowrap'>{session?.user?.name}</p>
									</div>
									<div>
										<svg
											className='w-3 h-3 mt-0.5 mx-3 text-black'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0' />
										</svg>
									</div>
								</button>
							) : (
								<button
									onClick={() => signIn()}
									title='Sign in First'
									className='flex items-center mt-1 border ml-auto mr-1 border-gray-200 rounded-full hover:bg-gray-200'>
									<div className='my-2 ml-2 mr-4 w-7 h-7'>
										<Image
											className='rounded-full'
											alt='User Profile'
											src={anonymous}
											width={32}
											height={32}
										/>
									</div>
									<div className='flex-col'>
										<p className='mt-1.5 mr-3 text-xs text-nowrap'>Sign in</p>
										<p className='mb-.5 font-medium text-nowrap'>Sign in</p>
									</div>
									<div>
										<svg
											className='w-3 h-3 mt-0.5 mx-3 text-black'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0' />
										</svg>
									</div>
								</button>
							)}
							{open ? (
								<div className='relative w-full h-12 min-w-72'>
									<input
										type='text'
										placeholder='Search'
										className='bg-gray-200 rounded-full p-4 w-full outline-blue-400'
									/>
									<svg
										onClick={() => setOpen(!open)}
										className='w-12 absolute right-1 top-1 text-black cursor-pointer hover:bg-gray-300 rounded-full p-3'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M15.18 16.95 12 13.77l-3.18 3.18a1.25 1.25 0 0 1-1.77-1.77L10.23 12 7.05 8.82a1.25 1.25 0 0 1 1.77-1.77L12 10.23l3.18-3.18a1.25 1.25 0 1 1 1.77 1.77L13.77 12l3.18 3.18a1.25 1.25 0 0 1-1.77 1.77M24 12a12 12 0 1 0-24 0 12 12 0 0 0 24 0'></path>
									</svg>
								</div>
							) : (
								<button
									title='Search'
									onClick={() => setOpen(!open)}
									className='w-12 h-12 hover:bg-gray-200 rounded-full'>
									<svg
										className='w-5 h-5 m-auto text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24' />
									</svg>
								</button>
							)}
							{session ? (
								<button
									title='Notifications'
									className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
									<svg
										className='w-6 h-6 m-auto text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z' />
									</svg>
								</button>
							) : (
								<button
									onClick={() => signIn()}
									title='Sign in First'
									className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
									<svg
										className='w-6 h-6 m-auto text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z' />
									</svg>
								</button>
							)}
							{session ? (
								<button
									title='Messages'
									className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
									<svg
										className='w-6 h-6 m-auto text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0' />
									</svg>
								</button>
							) : (
								<button
									onClick={() => signIn()}
									title='Sign in First'
									className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
									<svg
										className='w-6 h-6 m-auto text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0' />
									</svg>
								</button>
							)}
							{session?.user ? (
								<button
									title='Profile'
									className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
									<img
										className='rounded-full m-auto'
										alt='User Profile'
										src={session?.user?.image as string}
										width={32}
										height={32}
									/>
								</button>
							) : (
								<button
									onClick={() => signIn()}
									title='Sign in First'
									className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
									<Image
										className='rounded-full m-auto'
										alt='User Profile'
										src={anonymous}
										width={32}
										height={32}
									/>
								</button>
							)}
							<button
								id='Settings'
								title='Settings'
								onClick={toggleBTN}
								className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
								<svg
									id='SVG'
									className='w-3 h-3 text-gray-500 m-auto'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path
										id='path'
										d='M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0'
									/>
								</svg>
							</button>
							<section
								id='dropdown'
								className='hidden fixed right-12 top-3 bg-white rounded-md w-96 h-36 text-center max-[493px]:hidden border-2'>
								{session ? (
									<>
										<p className='mt-2'>Signed in as:</p>
										<p className='mt-2'>{session?.user?.email}</p>
										<br />
										<button
											title='Sign out'
											className='w-80 rounded-md m-2 hover:bg-gray-200'
											onClick={() => signOut()}>
											Sign out
										</button>
									</>
								) : (
									<>
										<p className='mt-2'>Not signed in </p>
										<br />
										<button
											title='Sign in'
											className='w-80 rounded-md m-2 hover:bg-gray-200'
											onClick={() => signIn()}>
											Sign in
										</button>
									</>
								)}
							</section>
						</>
					) : (
						<section className='flex w-full justify-center items-center mt-[10px]'>
							{theme === 'dark' ? (
								<button
									disabled
									type='button'
									className='py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center'>
									<svg
										aria-hidden='true'
										role='status'
										className='inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
										viewBox='0 0 100 101'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
											fill='currentColor'
										/>
										<path
											d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
											fill='#1C64F2'
										/>
									</svg>
									Loading...
								</button>
							) : (
								<button
									disabled
									type='button'
									className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'>
									<svg
										aria-hidden='true'
										role='status'
										className='inline w-4 h-4 me-3 text-white animate-spin'
										viewBox='0 0 100 101'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
											fill='#E5E7EB'
										/>
										<path
											d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
											fill='currentColor'
										/>
									</svg>
									Loading...
								</button>
							)}
						</section>
					)}
				</nav>
			</header>
			<section className='w-full min-w-80 select-none flex justify-center items-center '>
				<button
					title='For you'
					className='pt-2 mt-6 pb-2 text-nowrap border-b-[3px] rounded-t rounded-b-sm border-black hover:bg-gray-200'>
					For you
				</button>
			</section>
		</>
	);
}
