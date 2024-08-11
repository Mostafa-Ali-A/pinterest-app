'use client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from '../FirebaseConfig';
import anonymous from '@/public/anonymous.webp';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
	/* Check If User Is Logged In, Using redirect From next/navigation */

	//const authenticated = false;

	/*if (!authenticated) {
		redirect('/');
	}*/

	const { data: session, status } = useSession({ required: true });
	const db = getFirestore(app);
	const router = useRouter();
	const pathName = usePathname();
	const [open, setOpen] = useState(false);

	/* Save User Info To FireStore */

	const saveUserInfo = async () => {
		const user = session?.user;
		if (user) {
			const userRef = doc(db, 'users', user?.email as string);
			await setDoc(userRef, {
				name: user.name,
				email: user.email,
				image: user.image,
			});
		}
	};

	useEffect(() => {
		saveUserInfo();
	}, [session]);

	/* IF Not Logged In Delete Any PathName And Revert Back To Login Page */

	if (session === null) {
		router.replace('/');
	}

	/* IF on Profile PathName Add Border And Change Main Menu Text */

	/*const pathName = window.location.pathname;*/
	const email = '/' + session?.user?.email;
	if (pathName === email) {
		document.querySelector('#profileBtn')?.classList.add('border-2', 'border-black');
		const txt = document.querySelector('#main-menu-txt');
		if (txt) {
			txt.innerHTML = 'Pinterest';
		}
	} else {
		document.querySelector('#profileBtn')?.classList.remove('border-2', 'border-black');
		const txt = document.querySelector('#main-menu-txt');
		if (txt) {
			txt.innerHTML = 'Home Feed';
		}
	}

	/* IF on Create PathName Change Main Menu Text */

	const create = '/' + 'pin-creation-tool';
	if (pathName === create) {
		const txt = document.querySelector('#main-menu-txt');
		if (txt) {
			txt.innerHTML = 'Create Pin';
		}
	}

	/* IF Logged In Delete Unknown PathNames And Revert Back To Home Page And Change The Button Color */

	if (session && pathName != email && pathName != create) {
		router.replace('/');
		document.querySelector('#home-feed')?.classList.add('bg-black');
		document.querySelector('#home-feed')?.classList.add('hover:bg-gray-800');
		document.querySelector('#home-feed')?.classList.add('text-white');
	} else {
		document.querySelector('#home-feed')?.classList.remove('bg-black');
		document.querySelector('#home-feed')?.classList.remove('hover:bg-gray-800');
		document.querySelector('#home-feed')?.classList.remove('text-white');
	}

	/* IF Logged In And Pathname === create And Change The Button Color  */

	if (session && pathName === create) {
		document.querySelector('#create-pin')?.classList.add('bg-black');
		document.querySelector('#create-pin')?.classList.add('hover:bg-gray-800');
		document.querySelector('#create-pin')?.classList.add('text-white');
	} else {
		document.querySelector('#create-pin')?.classList.remove('bg-black');
		document.querySelector('#create-pin')?.classList.remove('hover:bg-gray-800');
		document.querySelector('#create-pin')?.classList.remove('text-white');
	}

	/* Clicking The Home Feed Button And Closing The Main Menu */

	const homeFeed = () => {
		router.replace('/');
		const target = document.documentElement;
		target.click();
	};

	/* Clicking The Create Pin Button And Closing The Main Menu */

	const createPin = () => {
		router.push(create);
		const target = document.documentElement;
		target.click();
	};

	/* Toggle Main Menu Dropdown */

	const toggleMainMenuBTN = (e: React.MouseEvent<HTMLButtonElement>): void => {
		const target = document.getElementById('main-menu-dropdown');
		target?.classList?.toggle('hidden');
		/* Toggle The Whole Button Dropdown */
		document.querySelector('#main-menu-btn')?.classList.toggle('bg-black');
		document.querySelector('#main-menu-btn')?.classList.toggle('hover:bg-gray-800');
		document.querySelector('#main-menu-btn')?.classList.toggle('bg-white');
		document.querySelector('#main-menu-btn')?.classList.toggle('hover:bg-gray-200');
		/* Toggle The P Tag(Text) Dropdown */
		document.querySelector('#main-menu-txt')?.classList.toggle('text-black');
		document.querySelector('#main-menu-txt')?.classList.toggle('text-white');
		/* Toggle The First SVG Dropdown */
		e.currentTarget.firstElementChild?.firstElementChild?.classList.toggle('text-white'); /* firstElementChild === firstChild */
		e.currentTarget.firstElementChild?.firstElementChild?.classList.toggle('text-black');
		/* Toggle The Last SVG Dropdown */
		e.currentTarget.lastElementChild?.firstElementChild?.classList.toggle('text-white'); /* lastElementChild === lastChild */
		e.currentTarget.lastElementChild?.firstElementChild?.classList.toggle('text-black');
	};

	/* Clicking The Search Button */

	const searchBtn = () => {
		setOpen(!open);
		const main = document.getElementsByTagName('main');
		const html = `<div class='bg-[rgba(0,0,0,.8)] z-20 fixed inset-0' id='insertedHTML'></div>`;
		for (var i = 0, max = main.length; i < max; i++) {
			main[i].insertAdjacentHTML('afterbegin', html);
		}
	};

	/* Clicking The Close Search Button */

	const closeSearchBtn = () => {
		setOpen(!open);
		const main = document.getElementsByTagName('main');
		for (var i = 0, max = main.length; i < max; i++) {
			const firstElementChild = document.getElementsByTagName('main')[i].firstElementChild;
			if (firstElementChild) {
				main[i].removeChild(firstElementChild);
			}
		}
	};

	/* Clicking The insertedHTML Closing The Search Bar */

	const insertedHTML = document.getElementById('insertedHTML');
	if (insertedHTML) {
		insertedHTML.onclick = () => {
			setOpen(!open);
			insertedHTML.remove();
		};
	}

	/* Toggle Sign out Dropdown */

	const toggleBTN = () => {
		const target = document.getElementById('dropdown');
		target?.classList?.toggle('hidden');
		document.querySelector('#SVG')?.classList.toggle('text-gray-500');
		document.querySelector('#SVG')?.classList.toggle('text-black');
	};

	/* Toggle MoreBTN Animation */

	const handleSVG = () => {
		document.querySelector('#fixedSVG')?.classList.toggle('w-5');
		document.querySelector('#fixedSVG')?.classList.toggle('h-5');
		document.querySelector('#fixedSVG')?.classList.toggle('w-6');
		document.querySelector('#fixedSVG')?.classList.toggle('h-6');
		const timer = setTimeout(() => {
			document.querySelector('#fixedSVG')?.classList.toggle('w-5');
			document.querySelector('#fixedSVG')?.classList.toggle('h-5');
			document.querySelector('#fixedSVG')?.classList.toggle('w-6');
			document.querySelector('#fixedSVG')?.classList.toggle('h-6');
		}, 200);
		return () => clearTimeout(timer);
	};

	/* Toggle MoreBTN Click Animation if Not Logged In */

	const toggleSignSVG = () => {
		signIn();
		handleSVG();
	};

	/* Toggle MoreBTN Click Animation */

	const toggleFixedBTN = () => {
		handleSVG();
		const target = document.getElementById('fixedDropdown');
		target?.classList?.toggle('hidden');
	};

	/* MoreBTN After Load Animation */

	const effect = () => {
		const btn = document.getElementById('moreBtn');
		if (btn?.style.bottom != undefined) {
			btn.style.bottom = -64 + 'px';
			btn?.classList.remove('hidden');
		}

		let bottom = -64;
		const intervalID = setInterval(() => {
			if (bottom < 40 || bottom < 24) {
				bottom += 4;
				if (btn?.style.bottom != undefined) {
					btn.style.bottom = bottom + 'px';
				}
			} else {
				const timer = setTimeout(() => {
					const interval = setInterval(() => {
						if (bottom > 24) {
							bottom -= 2;
							if (btn?.style.bottom != undefined) {
								btn.style.bottom = bottom + 'px';
							}
						} else {
							clearInterval(interval);
							clearTimeout(timer);
						}
					}, 30);
				}, 85);
				clearInterval(intervalID);
			}
		}, 10);
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			effect();
		}, 500);
		return () => clearTimeout(timer);
	}, [pathName]);

	/* Clicking Outside The Div Closing It */

	const handleClick = (e: MouseEvent /*CustomEvent*/ /*Event*/): e /*CustomEvent*/ is /*Event*/ MouseEvent => {
		if (
			!(e.target as HTMLElement).closest<HTMLElement>('#dropdown') &&
			(e.target as HTMLButtonElement).id !== 'SettingsBtn' &&
			(e.target as HTMLElement).id !== 'SVG' &&
			(e.target as HTMLElement).id !== 'path'
		) {
			const target = document.getElementById('dropdown');
			target?.classList.add('hidden');

			document.querySelector('#SVG')?.classList.remove('text-black');
			document.querySelector('#SVG')?.classList.add('text-gray-500');
		}
		if (
			!(e.target as HTMLElement).closest<HTMLElement>('#fixedDropdown') &&
			(e.target as HTMLButtonElement).id !== 'moreBtn' &&
			(e.target as HTMLElement).id !== 'fixedSVG' &&
			(e.target as HTMLElement).id !== 'fixedPath'
		) {
			const fixedTarget = document.getElementById('fixedDropdown');
			fixedTarget?.classList.add('hidden');
		}
		if (
			!(e.target as HTMLElement).closest<HTMLElement>('#main-menu-dropdown') &&
			(e.target as HTMLButtonElement).id !== 'main-menu-btn' &&
			(e.target as HTMLElement).id !== 'main-menu-txt' &&
			(e.target as HTMLElement).id !== 'main-menu-first-div' &&
			(e.target as HTMLElement).id !== 'main-menu-first-svg' &&
			(e.target as HTMLElement).id !== 'main-menu-first-path' &&
			(e.target as HTMLElement).id !== 'main-menu-second-div' &&
			(e.target as HTMLElement).id !== 'main-menu-second-svg' &&
			(e.target as HTMLElement).id !== 'main-menu-second-path'
		) {
			const fixedTarget = document.getElementById('main-menu-dropdown');
			fixedTarget?.classList.add('hidden');
			/* Toggle The Whole Button Dropdown */
			document.querySelector('#main-menu-btn')?.classList.remove('bg-black');
			document.querySelector('#main-menu-btn')?.classList.remove('hover:bg-gray-800');
			document.querySelector('#main-menu-btn')?.classList.add('bg-white');
			document.querySelector('#main-menu-btn')?.classList.add('hover:bg-gray-200');
			/* Toggle The P Tag(Text) Dropdown */
			document.querySelector('#main-menu-txt')?.classList.add('text-black');
			document.querySelector('#main-menu-txt')?.classList.remove('text-white');
			/* Toggle The First SVG Dropdown */
			document.querySelector('#main-menu-first-svg')?.classList.remove('text-white');
			document.querySelector('#main-menu-first-svg')?.classList.add('text-black');
			/* Toggle The Last SVG Dropdown */
			document.querySelector('#main-menu-second-svg')?.classList.remove('text-white');
			document.querySelector('#main-menu-second-svg')?.classList.add('text-black');
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
			<header className='fixed w-full h-20 bg-white z-30 overflow-auto'>
				<nav className='pt-3 pl-6 flex items-center'>
					{session ? (
						<>
							<button
								id='main-menu-btn'
								onClick={toggleMainMenuBTN}
								title='Main Menu'
								className='flex rounded-full mt-0.5 mr-1 py-1 pl-1 bg-white hover:bg-gray-200'>
								<div
									id='main-menu-first-div'
									className='m-1'>
									<svg
										id='main-menu-first-svg'
										className='w-6 h-6 text-red-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path
											id='main-menu-first-path'
											d='M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12'
										/>
									</svg>
								</div>
								<p
									className='m-1 font-medium text-[15.5px] text-nowrap'
									id='main-menu-txt'></p>
								<div
									id='main-menu-second-div'
									className='mt-[11px] mr-3 ml-1'>
									<svg
										id='main-menu-second-svg'
										className='w-3 h-3 text-black'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path
											id='main-menu-second-path'
											d='M2.5 6.5h19A2.5 2.5 0 0 0 24 4a2.5 2.5 0 0 0-2.5-2.5h-19A2.5 2.5 0 0 0 0 4a2.5 2.5 0 0 0 2.5 2.5m19 3h-19A2.5 2.5 0 0 0 0 12a2.5 2.5 0 0 0 2.5 2.5h19A2.5 2.5 0 0 0 24 12a2.5 2.5 0 0 0-2.5-2.5M0 20a2.5 2.5 0 0 0 2.5 2.5h19A2.5 2.5 0 0 0 24 20a2.5 2.5 0 0 0-2.5-2.5h-19A2.5 2.5 0 0 0 0 20'
										/>
									</svg>
								</div>
							</button>
							<section
								id='main-menu-dropdown'
								className='hidden fixed left-0 top-20 size-full pt-10 overflow-auto max-h-[85%] bg-white flex-row'>
								<div className='min-w-56 px-10'>
									<h1 className='pb-4 font-semibold text-xl'>Shortcuts</h1>
									<button
										onClick={homeFeed}
										id='home-feed'
										title='Home feed'
										className='hover:bg-gray-200 rounded-lg pl-4 w-full text-left mb-1 py-2'>
										Home feed
									</button>
								</div>
								<hr className='border h-full border-gray-300 rounded-full' />
								<div className='min-w-56 px-10'>
									<h1 className='pb-4 font-semibold text-xl'>Create</h1>
									<button
										onClick={createPin}
										id='create-pin'
										title='Create Pin'
										className='hover:bg-gray-200 rounded-lg pl-4 w-full text-left mb-1 py-2'>
										Create Pin
									</button>
								</div>
								<hr className='border h-full border-gray-300 rounded-full' />
								<div className='min-w-56 px-10'>
									<h1 className='pb-4 font-semibold text-xl'>Analytics</h1>
								</div>
								<hr className='border h-full border-gray-300 rounded-full' />
								<div className='min-w-56 px-10'>
									<h1 className='pb-4 font-semibold text-xl'>Ads</h1>
								</div>
								<hr className='border h-full border-gray-300 rounded-full' />
								<div className='min-w-56 px-10'>
									<h1 className='pb-4 font-semibold text-xl text-nowrap'>Manage Business</h1>
								</div>
							</section>
						</>
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
					{session ? (
						<button
							title='Profile Search'
							className='flex items-center mt-1 border ml-auto mr-1 border-gray-200 rounded-full hover:bg-gray-200'>
							<div className='my-2 ml-2 mr-4 w-8 h-8'>
								<Image
									className='rounded-full'
									alt='User profile image'
									src={session.user?.image as string}
									width={32}
									height={32}
								/>
							</div>
							<div className='flex-col'>
								<p className='mt-1.5 mr-4 text-xs text-nowrap'>{session.user?.name}</p>
								<p className='mb-.5 font-medium text-nowrap'>{session.user?.name}</p>
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
							<div className='my-2 ml-2 mr-4 w-8 h-8'>
								<Image
									className='rounded-full'
									alt='User profile image'
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
						<>
							<button
								title='Search'
								onClick={closeSearchBtn}
								className='min-w-12 h-12 hover:bg-gray-200 rounded-full [816px]:hidden'>
								<svg
									className='w-5 h-5 m-auto text-gray-500'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24' />
								</svg>
							</button>
							<div className='relative w-full h-12 min-w-72 max-[816px]:w-3/4 max-[816px]:min-w-0 max-[816px]:fixed max-[816px]:top-20'>
								<input
									type='text'
									placeholder='Search'
									className='bg-gray-200 rounded-full p-4 w-full max-[816px]:p-3 outline-blue-400 max-md:border-t-[1px] max-[816px]:border-gray-500 focus:border-white'
								/>
								<svg
									onClick={closeSearchBtn}
									className='w-12 absolute right-1 top-1 max-[816px]:w-[40px] max-[816px]:p-[9.5px] text-black cursor-pointer hover:bg-gray-300 rounded-full p-3'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M15.18 16.95 12 13.77l-3.18 3.18a1.25 1.25 0 0 1-1.77-1.77L10.23 12 7.05 8.82a1.25 1.25 0 0 1 1.77-1.77L12 10.23l3.18-3.18a1.25 1.25 0 1 1 1.77 1.77L13.77 12l3.18 3.18a1.25 1.25 0 0 1-1.77 1.77M24 12a12 12 0 1 0-24 0 12 12 0 0 0 24 0'></path>
								</svg>
							</div>
						</>
					) : (
						<button
							title='Search'
							onClick={searchBtn}
							className='min-w-12 h-12 hover:bg-gray-200 rounded-full'>
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
					{session ? (
						<button
							onClick={() => router.push('/' + session.user?.email)}
							id='profileBtn'
							title='Profile'
							className='min-w-8 h-8 hover:bg-gray-200 rounded-full'>
							<Image
								className='rounded-full m-auto'
								alt='User profile image'
								src={session.user?.image as string}
								width={28}
								height={28}
							/>
						</button>
					) : (
						<button
							onClick={() => signIn()}
							title='Sign in First'
							className='min-w-8 h-8 hover:bg-gray-200 rounded-full'>
							<Image
								className='rounded-full m-auto'
								alt='User profile image'
								src={anonymous}
								width={28}
								height={28}
							/>
						</button>
					)}
					<button
						id='SettingsBtn'
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
						className='hidden fixed right-12 top-3 bg-white rounded-md w-96 h-36 text-center border-2 max-[493px]:right-1 max-[493px]:top-20 max-[493px]:w-56'>
						{session ? (
							<>
								<p className='mt-2'>Signed in as:</p>
								<p className='mt-2'>{session.user?.email}</p>
								<br />
								<button
									title='Sign out'
									className='w-[calc(100%-32px)] rounded-md mx-4 hover:bg-gray-200'
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
			{session ? (
				<>
					<button
						onClick={toggleFixedBTN}
						title='More'
						id='moreBtn'
						className='fixed hidden right-10 hover:bg-gray-300 hover:shadow-2xl bg-gray-200 shadow-[0_0_8px_0_rgba(0,0,0,0.1)] rounded-full w-14 h-14 z-20'>
						<svg
							id='fixedSVG'
							className='w-6 h-6 m-auto text-black'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 24 24'>
							<path
								id='fixedPath'
								d='M 14.5 21.5 a 2.5 2.5 0 1 1 -5 0 a 2.5 2.5 0 0 1 5 0 m 4.25 -14.75 a 6.7 6.7 0 0 1 -3.26 5.78 c -0.46 0.26 -1.14 1.33 -1.14 2.34 a 2.35 2.35 0 1 1 -4.7 0 c 0 -2.55 1.47 -5.25 3.5 -6.41 c 0.45 -0.26 0.9 -0.93 0.9 -1.71 a 2.06 2.06 0 0 0 -4.1 0 a 2.35 2.35 0 1 1 -4.7 0 a 6.76 6.76 0 0 1 13.5 0'
							/>
						</svg>
					</button>
					<section
						id='fixedDropdown'
						className='hidden fixed bottom-0 right-24 h-[calc(100%-5rem)] max-h-72 overflow-hidden w-44 rounded-xl p-2 bg-white z-20'>
						<button
							title='Visit the Help...'
							className='hover:bg-gray-200 w-full flex mb-1 py-2'>
							Visit the Help...
							<svg
								className='w-3 h-3 m-auto text-black'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'>
								<path d='M 20.97 12 a 2 2 0 0 1 -1.99 -2 V 7.81 l -7.07 7.1 a 2 2 0 1 1 -2.83 -2.83 L 16.16 5 h -2.17 a 2 2 0 0 1 0 -4 H 23 l -0.03 9 a 2 2 0 0 1 -2 2 M 6.75 4 a 1.25 1.25 0 0 1 0 2.5 H 3.5 v 14 h 14 v -3.26 a 1.25 1.25 0 1 1 2.5 0 v 4.51 c 0 0.7 -0.56 1.25 -1.25 1.25 H 2.25 C 1.56 23 1 22.44 1 21.75 V 5.25 C 1 4.56 1.56 4 2.25 4 Z' />
							</svg>
						</button>
						<button
							title='Create Widget'
							className='hover:bg-gray-200 w-full text-nowrap flex mt-1 py-2'>
							Create Widget
							<svg
								className='w-3 h-3 m-auto ml-7 text-black'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'>
								<path d='M 20.97 12 a 2 2 0 0 1 -1.99 -2 V 7.81 l -7.07 7.1 a 2 2 0 1 1 -2.83 -2.83 L 16.16 5 h -2.17 a 2 2 0 0 1 0 -4 H 23 l -0.03 9 a 2 2 0 0 1 -2 2 M 6.75 4 a 1.25 1.25 0 0 1 0 2.5 H 3.5 v 14 h 14 v -3.26 a 1.25 1.25 0 1 1 2.5 0 v 4.51 c 0 0.7 -0.56 1.25 -1.25 1.25 H 2.25 C 1.56 23 1 22.44 1 21.75 V 5.25 C 1 4.56 1.56 4 2.25 4 Z' />
							</svg>
						</button>
						<hr className='border border-gray-300 my-2 rounded-full' />
						<button
							title='About'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							About
						</button>
						<button
							title='Blog'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Blog
						</button>
						<button
							title='Businesses'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Businesses
						</button>
						<button
							title='Careers'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Careers
						</button>
						<button
							title='Developers'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Developers
						</button>
						<button
							title='Removals'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Removals
						</button>
						<button
							title='Privacy Policy'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Privacy Policy
						</button>
						<button
							title='Personalized Ads'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Personalized Ads
						</button>
						<button
							title='Your Privacy Rights'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Your Privacy Rights
						</button>
						<button
							title='Terms'
							className='text-neutral-500 text-sm px-1 hover:underline'>
							Terms
						</button>
					</section>
				</>
			) : (
				<button
					onClick={toggleSignSVG}
					title='Sign in First'
					className='fixed hidden right-10 hover:bg-gray-300 hover:shadow-2xl bg-gray-200 shadow-[0_0_8px_0_rgba(0,0,0,0.1)] rounded-full w-14 h-14 z-20'>
					<svg
						id='fixedSVG'
						className='w-6 h-6 m-auto text-black'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 24 24'>
						<path d='M 14.5 21.5 a 2.5 2.5 0 1 1 -5 0 a 2.5 2.5 0 0 1 5 0 m 4.25 -14.75 a 6.7 6.7 0 0 1 -3.26 5.78 c -0.46 0.26 -1.14 1.33 -1.14 2.34 a 2.35 2.35 0 1 1 -4.7 0 c 0 -2.55 1.47 -5.25 3.5 -6.41 c 0.45 -0.26 0.9 -0.93 0.9 -1.71 a 2.06 2.06 0 0 0 -4.1 0 a 2.35 2.35 0 1 1 -4.7 0 a 6.76 6.76 0 0 1 13.5 0' />
					</svg>
				</button>
			)}
		</>
	);
}
