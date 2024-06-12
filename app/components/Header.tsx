'use client';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from '../FirebaseConfig';
import anonymous from '@/public/anonymous.webp';

export default function Header() {
	const { data: session } = useSession();
	const db = getFirestore(app);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const saveUserInfo = async () => {
			const user = session?.user;
			if (user) {
				const userRef = doc(db, user.name as string, user.email as string);
				await setDoc(userRef, {
					name: user.name,
					email: user.email,
					image: user.image,
				});
			}
		};
	}, [session]);

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
