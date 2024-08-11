'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function page() {
	const [open, setOpen] = useState(false);
	const [close, setClose] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [file, setFile] = useState<string>('');
	const [fileEnter, setFileEnter] = useState(false);
	const [newText, setNewText] = useState<string>('');

	/* Keep Textarea Height Auto While Typing */

	const [height, setHeight] = useState(0);
	const divRef = useRef<HTMLParagraphElement>(null);

	useLayoutEffect(() => {
		if (divRef.current) {
			setHeight(divRef.current.scrollHeight);
		}
	}, [newText]);

	/* Keep Main Width Full When The Scroll Appear While Window Resizes */

	const [offsetWidth, setOffsetWidth] = useState<string>('');
	const [outerWidth, setOuterWidth] = useState<string>('');
	const [width, setWidth] = useState('');
	const mainRef = useRef<HTMLFormElement>(null);

	useLayoutEffect(() => {
		if (searchOpen) {
			setWidth('');
		}
		if (mainRef.current && !searchOpen) {
			if (outerWidth >= '536') {
				setWidth(outerWidth + 'px');
				document.getElementsByTagName('html')[0].style.width = width;
			} else {
				setWidth('');
				document.getElementsByTagName('html')[0].style.width = '';
			}
		}
	}, [outerWidth, searchOpen]);

	/* Keep Form Width Appear Using PaddingLeft When Window Resizes */

	/*const form = document.getElementsByTagName('form');
	if (form.length > 0) {
		console.log(form[0]);
		console.log(form[0].offsetWidth);
		console.log(600 - form[0].offsetWidth);
		if (form[0].offsetWidth < 600) {
			form[0].style.paddingLeft = (600 - form[0].offsetWidth).toString() + 'px';
		}
	}*/

	const [paddingLeft, setPaddingLeft] = useState('');
	const formRef = useRef<HTMLFormElement>(null);

	function resize() {
		/*console.log('width: ',  window.innerWidth.toString() + 'px');*/
		setOffsetWidth(window.innerWidth.toString());
		setOuterWidth(window.outerWidth.toString());
	}
	window.onresize = resize;

	useLayoutEffect(() => {
		if (formRef.current) {
			if (formRef.current.offsetWidth >= 600) {
				setPaddingLeft('');
			}
			if (formRef.current.offsetWidth < 600 && formRef.current.offsetWidth >= 302) {
				setPaddingLeft((600 - formRef.current.offsetWidth).toString() + 'px');
			}
			if (formRef.current.offsetWidth < 302) {
				setPaddingLeft('299px');
			}
		}
	}, [offsetWidth, file, open]);

	/* Keep Drag & Drop Input Width Appear Using PaddingLeft When Window Resizes */

	const inputRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (inputRef.current) {
			if (inputRef.current.offsetWidth >= 402) {
				setPaddingLeft('');
			}
			if (inputRef.current.offsetWidth < 402 && inputRef.current.offsetWidth >= 208) {
				setPaddingLeft((402 - inputRef.current.offsetWidth).toString() + 'px');
			}
			if (inputRef.current.offsetWidth < 208) {
				setPaddingLeft('193px');
			}
		}
	}, [offsetWidth, file, open]);

	/* Keep Drag & Drop Input Width Appear Using PaddingLeft When Clicking Create New Button */

	const createNew = () => {
		setFile('');
		setTimeout(() => {
			if (inputRef.current) {
				if (inputRef.current.offsetWidth >= 402) {
					setPaddingLeft('');
				}
				if (inputRef.current.offsetWidth < 402 && inputRef.current.offsetWidth >= 208) {
					setPaddingLeft((402 - inputRef.current.offsetWidth).toString() + 'px');
				}
				if (inputRef.current.offsetWidth < 208) {
					setPaddingLeft('193px');
				}
			}
		});
	};

	/* Drag&Drop OnDrag Behavior */

	const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setFileEnter(true);
	};

	/* Drag&Drop OnDrop Behavior */

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setFileEnter(false);
		if (e.dataTransfer.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					if (file) {
						let blobUrl = URL.createObjectURL(file);
						setFile(blobUrl);
					}
					//console.log(`items file[${i}].name = ${file?.name}`);
				}
			});
		} else {
			[...e.dataTransfer.files].forEach((file, i) => {
				//console.log(`… file[${i}].name = ${file.name}`);
			});
		}
	};

	/* Drag&Drop OnChange Behavior */

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log(e.target.files);
		let files = e.target.files;
		if (files && files[0]) {
			let blobUrl = URL.createObjectURL(files[0]);
			setFile(blobUrl);
		}
	};

	/* Set Input URL Restrictions Label Behavior For Save From URL */

	const blurURLImageInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		blurURLInput(e);
		const imageUrls = Array.from(document.querySelectorAll('img')).map(({ src }) => ({ src }));
		console.log(imageUrls);
	};

	/* Set Input URL Restrictions Label Behavior For The Form Element & Save From URL */

	const blurURLInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		//const currentTarget = document.getElementById('link') as HTMLInputElement;
		const target = document.getElementById('label');

		/* Set Input URL Maximum Length Restrictions Label Behavior */

		if (e.currentTarget.value.length > 2048) {
			/* Targeting Label SvG & Path Children */
			if (target && target.children[0] && target.firstChild) {
				target?.removeChild(target.children[0]);
				target?.removeChild(target.firstChild);
			}
			e.currentTarget.title = 'Please enter a URL.';
			target?.classList.remove('hidden');
			target?.classList.add('block');
			target?.classList.add('flex');
			let html = `<svg
		class='w-4 h-4 mr-2'
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		viewBox='0 0 24 24'>
		<path d='M 23.6 18.5 L 14.63 2.53 a 3 3 0 0 0 -5.24 0 L 0.4 18.5 A 3.02 3.02 0 0 0 3 23 h 18 a 3 3 0 0 0 2.6 -4.5 m -7.54 -1.06 a 1.5 1.5 0 0 1 0 2.12 a 1.5 1.5 0 0 1 -2.12 0 L 12 17.62 l -1.95 1.94 a 1.5 1.5 0 0 1 -2.12 0 a 1.5 1.5 0 0 1 0 -2.12 l 1.94 -1.94 l -1.94 -1.94 a 1.5 1.5 0 0 1 0 -2.12 a 1.5 1.5 0 0 1 2.12 0 L 12 13.38 l 1.94 -1.94 a 1.5 1.5 0 0 1 2.12 0 a 1.5 1.5 0 0 1 0 2.12 l -1.94 1.94 Z' />
	</svg>
	Please shorten the link to 2048 characters or fewer.`;
			target?.insertAdjacentHTML('afterbegin', html);
		}

		/* Set Input URL Matching Pattern Restrictions Label Behavior */

		if (
			e.currentTarget.value.match(
				/'(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?'/g,
			) === null &&
			e.currentTarget.value.length <= 2048 &&
			e.currentTarget.value.length != 0
		) {
			/* Targeting Label SvG & Path Children */
			if (target && target.children[0] && target.firstChild) {
				target?.removeChild(target.children[0]);
				target?.removeChild(target.firstChild);
			}
			e.currentTarget.title = 'Please enter a URL.';
			target?.classList.remove('hidden');
			target?.classList.add('block');
			target?.classList.add('flex');
			let html = `<svg
		class='w-4 h-4 mr-2'
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		viewBox='0 0 24 24'>
		<path d='M 23.6 18.5 L 14.63 2.53 a 3 3 0 0 0 -5.24 0 L 0.4 18.5 A 3.02 3.02 0 0 0 3 23 h 18 a 3 3 0 0 0 2.6 -4.5 m -7.54 -1.06 a 1.5 1.5 0 0 1 0 2.12 a 1.5 1.5 0 0 1 -2.12 0 L 12 17.62 l -1.95 1.94 a 1.5 1.5 0 0 1 -2.12 0 a 1.5 1.5 0 0 1 0 -2.12 l 1.94 -1.94 l -1.94 -1.94 a 1.5 1.5 0 0 1 0 -2.12 a 1.5 1.5 0 0 1 2.12 0 L 12 13.38 l 1.94 -1.94 a 1.5 1.5 0 0 1 2.12 0 a 1.5 1.5 0 0 1 0 2.12 l -1.94 1.94 Z' />
	</svg>
	Oops! That URL isn’t valid—please try again!`;
			target?.insertAdjacentHTML('afterbegin', html);
		}

		/* Set Input URL Without Any Character Restrictions Label Behavior */

		if (
			e.currentTarget.value.length === 0 ||
			(e.currentTarget.value.match(
				/'(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?'/g,
			) != null &&
				e.currentTarget.value.length <= 2048)
		) {
			/* Targeting Label SvG & Path Children */
			if (target && target.children[0] && target.firstChild) {
				target?.removeChild(target.children[0]);
				target?.removeChild(target.firstChild);
			}
			target?.classList.remove('block');
			target?.classList.add('hidden');
			target?.classList.remove('flex');
			e.currentTarget.removeAttribute('title');
		}
	};

	/* Set First Checkbox Input Animation Behavior */

	const firstCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		/* Target The Input Checkbox */
		const checkBox = document.getElementById('checkbox') as HTMLInputElement;
		/* Target The Wrapper Div */
		const WrapperDiv = e.currentTarget.parentElement;
		/* Target The Last Div */
		const lastDiv = e.currentTarget.nextElementSibling;

		if (WrapperDiv && lastDiv) {
			if (checkBox.checked === true) {
				WrapperDiv.classList.remove('bg-white');
				WrapperDiv.classList.add('bg-black');
				lastDiv.classList.remove('left-0');
				lastDiv.classList.add('right-0');
			} else {
				lastDiv.classList.add('left-0');
				lastDiv.classList.remove;
				WrapperDiv.classList.add('bg-white');
				WrapperDiv.classList.remove('bg-black');
				('right-0');
			}
		}

		/* Set The Open & Close Animations */

		/* Target The Next Div Of The Parent Div */
		const nextParentDiv = e.currentTarget.parentElement?.parentElement?.nextElementSibling;

		if (nextParentDiv) {
			nextParentDiv.classList.toggle('h-0');
			nextParentDiv.classList.toggle('overflow-hidden');
			nextParentDiv.classList.toggle('h-[calc(5rem)]');
		}
	};

	/* Set Next (P) Tag Click */

	const firstCheckboxClick = () => {
		const checkBox = document.getElementById('checkbox') as HTMLInputElement;
		checkBox.click();
	};

	/* Set Second Checkbox Input Animation Behavior */

	const secondCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		/* Target The Input Checkbox */
		const checkBox = document.getElementById('checkbox1') as HTMLInputElement;
		/* Target The Wrapper Div */
		const WrapperDiv = e.currentTarget.parentElement;
		/* Target The Last Div */
		const lastDiv = e.currentTarget.nextElementSibling;

		if (WrapperDiv && lastDiv) {
			if (checkBox.checked === false) {
				WrapperDiv.classList.remove('bg-black');
				WrapperDiv.classList.add('bg-white');
				lastDiv.classList.remove('right-0');
				lastDiv.classList.add('left-0');
			} else {
				lastDiv.classList.add('right-0');
				lastDiv.classList.remove('left-0');
				WrapperDiv.classList.remove('bg-white');
				WrapperDiv.classList.add('bg-black');
			}
		}
	};

	/* Set The Open & Close Of More Options Animations */

	const moreOptionsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setClose(!close);

		const html = `<path d='M 0.66 14.2 a 2.2 2.2 0 0 0 0 3.15 c 0.88 0.87 2.3 0.87 3.18 0 L 12 9.29 l 8.16 8.06 c 0.88 0.87 2.3 0.87 3.18 0 a 2.2 2.2 0 0 0 0 -3.15 L 12 3 Z' />`;

		const oldHtml = `<path d='M 20.16 6.65 L 12 14.71 L 3.84 6.65 a 2.27 2.27 0 0 0 -3.18 0 a 2.2 2.2 0 0 0 0 3.15 L 12 21 L 23.34 9.8 a 2.2 2.2 0 0 0 0 -3.15 a 2.26 2.26 0 0 0 -3.18 0' />`;
		/* Target The Path */
		const path = e.currentTarget.lastElementChild?.firstElementChild;
		/* Target The SVG */
		const svg = e.currentTarget.lastElementChild;

		if (path && svg) {
			if (close) {
				path.remove();
				svg.insertAdjacentHTML('afterbegin', oldHtml);
			} else {
				path.remove();
				svg.insertAdjacentHTML('afterbegin', html);
			}
		}
	};

	/* Set third Checkbox Input Animation Behavior */

	const thirdCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		/* Target The Input Checkbox */
		const checkBox = document.getElementById('checkbox2') as HTMLInputElement;
		/* Target The Wrapper Div */
		const WrapperDiv = e.currentTarget.parentElement;
		/* Target The Last Div */
		const lastDiv = e.currentTarget.nextElementSibling;

		if (WrapperDiv && lastDiv) {
			if (checkBox.checked === false) {
				WrapperDiv.classList.remove('bg-black');
				WrapperDiv.classList.add('bg-white');
				lastDiv.classList.remove('right-0');
				lastDiv.classList.add('left-0');
			} else {
				lastDiv.classList.add('right-0');
				lastDiv.classList.remove('left-0');
				WrapperDiv.classList.remove('bg-white');
				WrapperDiv.classList.add('bg-black');
			}
		}
	};

	/* Set Input Date Default Value */

	useEffect(() => {
		const dateControl = document.querySelector('input[type="date"]') as HTMLInputElement;
		if (dateControl) {
			/* Get The Date */
			const d = new Date();
			/* Add Two Zeros At Maximum If No At Least Two Numbers */
			const cd = (num: number) => {
				if (num) {
					return num.toString().padStart(2, '0');
				}
			};
			/* Get Tomorrow Date: Year, Month And Next Day As (2000 01 01) */
			const result = d.getFullYear() + '-' + cd(d.getMonth() + 1) + '-' + cd(d.getDate() + 1); /* +
			' ' +
			cd(d.getHours()) +
			':' +
			cd(d.getMinutes()) +
			':' +
			cd(d.getSeconds()) +
			' ' +
			d.getMilliseconds();*/
			/*const date = new Date();
		const n = date.toJSON();*/
			//new Date().toISOString();
			dateControl.value = result;
		}

		/* Set Input Time Default Value */

		const timeControl = document.querySelector('input[type="time"]') as HTMLInputElement;
		if (timeControl) {
			const result = 12 + ':' + '00';
			timeControl.value = result;
		}
	}, [file]);

	return (
		<main
			style={{ width }}
			ref={mainRef}
			className='pt-20'>
			<div className='flex h-[calc(100dvh-90px)] border-t max-[573px]:border-white border-gray-300'>
				{open && !searchOpen ? (
					<div className='border-r border-gray-300 w-20'>
						<div className='w-20 flex flex-col'>
							<button
								onClick={() => setOpen(!open)}
								className='w-10 h-10 ml-5 mt-5'
								title='Expand'>
								<svg
									className='w-5 h-5 mx-auto'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M 4.51524 20.5516 L 11.9051 13.0822 C 12.0717 12.9273 12.1904 12.7616 12.2613 12.5852 C 12.3321 12.4088 12.3676 12.2234 12.3676 12.0288 C 12.3676 11.8343 12.3321 11.6425 12.2613 11.4535 C 12.1904 11.2645 12.0717 11.0925 11.9051 10.9375 L 4.51524 3.4302 C 4.22096 3.13128 3.87532 2.98813 3.47831 3.00077 C 3.08127 3.01341 2.73563 3.16919 2.44138 3.46812 C 2.14713 3.76704 2 4.11818 2 4.52153 C 2 4.92487 2.14713 5.27601 2.44138 5.57494 L 8.7943 12.0288 L 2.44138 18.4827 C 2.14713 18.7816 2.00351 19.1264 2.01052 19.5172 C 2.01757 19.9079 2.16118 20.2527 2.44138 20.5516 C 2.74969 20.8505 3.09884 21 3.48883 21 C 3.87883 21 4.22096 20.8505 4.51524 20.5516 Z M 14.1477 20.5516 L 21.5375 13.0822 C 21.7041 12.9273 21.8229 12.7616 21.8937 12.5852 C 21.9646 12.4088 22 12.2234 22 12.0288 C 22 11.8343 21.9646 11.6425 21.8937 11.4535 C 21.8229 11.2645 21.7041 11.0925 21.5375 10.9375 L 14.1477 3.4302 C 13.8534 3.13128 13.5078 2.98813 13.1108 3.00077 C 12.7137 3.01341 12.3681 3.16919 12.0738 3.46812 C 11.7796 3.76704 11.6324 4.11818 11.6324 4.52153 C 11.6324 4.92487 11.7796 5.27601 12.0738 5.57494 L 18.4478 12.0288 L 12.0738 18.4827 C 11.7796 18.7816 11.636 19.1264 11.643 19.5172 C 11.65 19.9079 11.7936 20.2527 12.0738 20.5516 C 12.3822 20.8505 12.7313 21 13.1213 21 C 13.5113 21 13.8534 20.8505 14.1477 20.5516 Z' />
								</svg>
							</button>
							<button
								onClick={createNew}
								className='w-10 h-10 ml-5 mt-10 mb-5'
								title='Create New'>
								<svg
									className='w-5 h-5 mx-auto'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M 22 10 h -8 V 2 a 2 2 0 0 0 -4 0 v 8 H 2 a 2 2 0 0 0 0 4 h 8 v 8 a 2 2 0 0 0 4 0 v -8 h 8 a 2 2 0 0 0 0 -4' />
								</svg>
							</button>
							<hr className='border w-full border-gray-300' />
						</div>
					</div>
				) : (
					<></>
				)}
				{!open && !searchOpen ? (
					<div className='flex flex-col font-semibold border-r border-gray-300 min-w-96 min-h-0 overflow-auto'>
						<div className='flex pt-6'>
							<h1 className='text-nowrap ml-4 text-xl font-semibold'>Pin drafts(0)</h1>
							<button
								onClick={() => setOpen(!open)}
								className='w-10 h-10 ml-auto mr-4'
								title='Collapse'>
								<svg
									className='w-5 h-5 mx-auto'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M 19.4848 20.5516 L 12.0949 13.0822 C 11.9283 12.9273 11.8096 12.7616 11.7387 12.5852 C 11.6679 12.4088 11.6324 12.2234 11.6324 12.0288 C 11.6324 11.8343 11.6679 11.6425 11.7387 11.4535 C 11.8096 11.2645 11.9283 11.0925 12.0949 10.9375 L 19.4848 3.4302 C 19.779 3.13128 20.1247 2.98813 20.5217 3.00077 C 20.9187 3.01341 21.2644 3.16919 21.5586 3.46812 C 21.8529 3.76704 22 4.11818 22 4.52153 C 22 4.92487 21.8529 5.27601 21.5586 5.57494 L 15.2057 12.0288 L 21.5586 18.4827 C 21.8529 18.7816 21.9965 19.1264 21.9895 19.5172 C 21.9824 19.9079 21.8388 20.2527 21.5586 20.5516 C 21.2503 20.8505 20.9012 21 20.5112 21 C 20.1212 21 19.779 20.8505 19.4848 20.5516 Z M 9.85231 20.5516 L 2.46246 13.0822 C 2.29585 12.9273 2.17712 12.7616 2.10626 12.5852 C 2.03542 12.4088 2 12.2234 2 12.0288 C 2 11.8343 2.03542 11.6425 2.10626 11.4535 C 2.17712 11.2645 2.29585 11.0925 2.46246 10.9375 L 9.85231 3.4302 C 10.1466 3.13128 10.4922 2.98813 10.8892 3.00077 C 11.2863 3.01341 11.6319 3.16919 11.9262 3.46812 C 12.2204 3.76704 12.3676 4.11818 12.3676 4.52153 C 12.3676 4.92487 12.2204 5.27601 11.9262 5.57494 L 5.55217 12.0288 L 11.9262 18.4827 C 12.2204 18.7816 12.364 19.1264 12.357 19.5172 C 12.35 19.9079 12.2064 20.2527 11.9262 20.5516 C 11.6178 20.8505 11.2687 21 10.8787 21 C 10.4887 21 10.1466 20.8505 9.85231 20.5516 Z' />
								</svg>
							</button>
						</div>
						<button
							onClick={createNew}
							title='Create New'
							className='mt-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg mx-4 mb-5'>
							Create new
						</button>
						<hr className='border w-full border-gray-300' />
					</div>
				) : (
					<></>
				)}
				<div className='flex flex-col w-full min-w-0'>
					{searchOpen ? (
						<div className='flex size-full min-w-0'>
							<div className='border-r border-gray-300 min-w-20'>
								<button
									onClick={() => setSearchOpen(!searchOpen)}
									className='w-10 h-10 ml-5 mt-5 mb-6'
									title='Back'>
									<svg
										className='w-5 h-5 mx-auto'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M 19.4848 20.5516 L 12.0949 13.0822 C 11.9283 12.9273 11.8096 12.7616 11.7387 12.5852 C 11.6679 12.4088 11.6324 12.2234 11.6324 12.0288 C 11.6324 11.8343 11.6679 11.6425 11.7387 11.4535 C 11.8096 11.2645 11.9283 11.0925 12.0949 10.9375 L 19.4848 3.4302 C 19.779 3.13128 20.1247 2.98813 20.5217 3.00077 C 20.9187 3.01341 21.2644 3.16919 21.5586 3.46812 C 21.8529 3.76704 22 4.11818 22 4.52153 C 22 4.92487 21.8529 5.27601 21.5586 5.57494 L 15.2057 12.0288 L 21.5586 18.4827 C 21.8529 18.7816 21.9965 19.1264 21.9895 19.5172 C 21.9824 19.9079 21.8388 20.2527 21.5586 20.5516 C 21.2503 20.8505 20.9012 21 20.5112 21 C 20.1212 21 19.779 20.8505 19.4848 20.5516 Z M 9.85231 20.5516 L 2.46246 13.0822 C 2.29585 12.9273 2.17712 12.7616 2.10626 12.5852 C 2.03542 12.4088 2 12.2234 2 12.0288 C 2 11.8343 2.03542 11.6425 2.10626 11.4535 C 2.17712 11.2645 2.29585 11.0925 2.46246 10.9375 L 9.85231 3.4302 C 10.1466 3.13128 10.4922 2.98813 10.8892 3.00077 C 11.2863 3.01341 11.6319 3.16919 11.9262 3.46812 C 12.2204 3.76704 12.3676 4.11818 12.3676 4.52153 C 12.3676 4.92487 12.2204 5.27601 11.9262 5.57494 L 5.55217 12.0288 L 11.9262 18.4827 C 12.2204 18.7816 12.364 19.1264 12.357 19.5172 C 12.35 19.9079 12.2064 20.2527 11.9262 20.5516 C 11.6178 20.8505 11.2687 21 10.8787 21 C 10.4887 21 10.1466 20.8505 9.85231 20.5516 Z' />
									</svg>
								</button>
								<hr className='border w-full border-gray-300' />
							</div>
							<div className='size-full mb-4 mt-8 px-1 flex flex-col items-center mx-24 overflow-auto'>
								<h1 className='font-semibold text-lg'>Save ideas from website</h1>
								<p className='text-sm'>Select up to ten images</p>
								<input
									pattern='(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?'
									inputMode='url'
									x-inputmode='url'
									onBlur={blurURLImageInput}
									type='url'
									name='link'
									id='link'
									className='w-full p-2 rounded-3xl mt-2 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2'
									placeholder='Enter website'
								/>
								<label
									htmlFor='link'
									id='label'
									className='hidden mr-auto text-xs text-red-600 cursor-pointer'></label>
							</div>
						</div>
					) : (
						<div className='flex items-center w-full min-h-20 pl-8'>
							<section>
								<h1 className='text-lg font-semibold'>Create Pin</h1>
								<p className='text-xs text-gray-500 text-nowrap'>Working on: Your profile</p>
							</section>
							{!file ? (
								<></>
							) : (
								<button
									onClick={() => setFile('')}
									title='Publish'
									className='py-2 ml-auto mr-8 min-w-24 rounded-3xl
	bg-red-500 hover:bg-red-700 text-white'>
									Publish
								</button>
							)}
						</div>
					)}
					{!file && !searchOpen ? (
						<div
							style={{ paddingLeft }}
							ref={inputRef}
							className='py-6 overflow-auto flex flex-col items-center border-t border-gray-300'>
							<div
								onDragOver={onDrag}
								onDragLeave={() => setFileEnter(false)}
								onDragEnd={onDrag}
								onDrop={onDrop}
								className={`${
									fileEnter ? 'bg-[rgb(215,237,255)] border-solid border-blue-600' : 'bg-gray-200 border-dashed border-zinc-300'
								} relative h-full w-96 pt-56 pb-40 mb-6 border-2 rounded-3xl block items-center text-center`}>
								<label
									htmlFor='file'
									className='text-neutral-500'>
									Choose a file or drag and drop it here
								</label>
								<label
									htmlFor='file'
									className='text-neutral-400 text-xs absolute bottom-4 left-0 right-0'>
									Supports BMB, TIF, TIFF, WEBP, PNG, JPG, JPEG, GIF, JFIF, PJPEG, PJP, M4V, MP4, MOV
								</label>
								<input
									id='file'
									type='file'
									accept='image/bmp,image/jpg,image/jpeg,image/png,image/tiff,image/webp,image/jfif,image/pjpeg,image/pjp,image/tif,video/m4v,video/mp4,video/mov'
									className='opacity-0 cursor-pointer inset-0 size-full absolute'
									onChange={onChange}
								/>
							</div>
							<hr className='border w-96 border-gray-300' />
							<button
								onClick={() => setSearchOpen(!searchOpen)}
								title='Save From URL'
								className='mt-6 w-96 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg'>
								Save from URL
							</button>
						</div>
					) : (
						<></>
					)}
					{file ? (
						<form
							style={{ paddingLeft }}
							ref={formRef}
							className='flex flex-wrap items-center justify-center py-2 overflow-auto size-full mx-auto border-t border-gray-300'>
							<Image
								alt='Pin image'
								className='max-w-xs w-56 min-w-96 mt-2 mb-auto min-h-48 mx-auto rounded-3xl'
								src={file}
								width={384}
								height={192}
							/>
							<section className='min-w-[584px] w-[584px] mx-auto px-2'>
								<label
									htmlFor='title'
									className='mr-auto text-xs cursor-pointer'>
									Title
								</label>
								<input
									type='text'
									name='title'
									id='title'
									className='w-full p-3 rounded-2xl mb-4 mt-2 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2'
									placeholder='Add a title'
								/>
								<div className='w-full relative'>
									<label
										htmlFor='description'
										className='mr-auto text-xs cursor-pointer'>
										Description
									</label>
									<p
										className='min-h-24 max-h-40 px-3 py-4 mb-4 mt-2 w-full break-all overflow-y-auto absolute -z-10 invisible'
										ref={divRef}>
										{newText}
									</p>
									<textarea
										style={{ height }}
										value={newText}
										onChange={(e) => setNewText(e.target.value)}
										name='description'
										id='description'
										className='w-full min-h-24 max-h-40 p-3 rounded-2xl mb-4 mt-2 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2 resize-none'
										placeholder='Add a detailed description'
									/>
								</div>
								<div className='w-full mb-4'>
									<label
										htmlFor='link'
										className='mr-auto text-xs cursor-pointer'>
										Link
									</label>
									<input
										pattern='(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?'
										inputMode='url'
										x-inputmode='url'
										onBlur={blurURLInput}
										type='url'
										name='link'
										id='link'
										className='w-full p-3 rounded-2xl mt-2 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2'
										placeholder='Add a link'
									/>
									<label
										htmlFor='link'
										id='label'
										className='hidden mr-auto text-xs text-red-600 cursor-pointer'></label>
								</div>
								<label
									htmlFor='board'
									className='mr-auto text-xs cursor-pointer'>
									Board
								</label>
								<input
									type='text'
									name='board'
									id='board'
									className='w-full p-3 rounded-2xl mb-4 mt-2 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2'
									placeholder='choose a board'
								/>
								<label
									htmlFor='taggedTopics'
									className='mr-auto text-xs cursor-pointer'>
									Tagged topics (0)
								</label>
								<input
									type='text'
									name='taggedTopics'
									id='taggedTopics'
									className='w-full p-3 rounded-2xl mt-2 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2'
									placeholder='Search for a tag'
								/>
								<p className='mr-auto mb-4 text-xs text-gray-500'>Don't worry, people won't see your tags</p>
								<p className='mr-auto mb-4 mt-2 text-xs'>Tag Products</p>
								<button
									onClick={(e) => e.preventDefault()}
									title='Publish'
									className='py-2 mr-auto mb-4 min-w-32 rounded-3xl
bg-gray-200 hover:bg-gray-300 font-semibold'>
									Add Products
								</button>
								<div className='mr-auto mb-4 mt-2 flex'>
									<div className='relative bg-white h-6 w-10 rounded-3xl border border-gray-500'>
										<input
											onClick={firstCheckbox}
											id='checkbox'
											className='cursor-pointer absolute size-full z-10 opacity-0'
											type='checkbox'
										/>
										<div className='absolute bg-white left-0 top-0 w-6 h-6 rounded-3xl border border-gray-500 m-[-1px] transition-left'></div>
									</div>
									<p
										onClick={firstCheckboxClick}
										className='pl-2 cursor-pointer'>
										Publish at a later date
									</p>
								</div>
								<div className='h-0 w-full overflow-hidden transition-height flex'>
									<input
										type='date'
										className='w-[49%] h-10 mr-1 p-3 rounded-2xl mt-2 mb-4 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2 cursor-text'
									/>
									<input
										type='time'
										className='w-[49%] h-10 ml-1 p-3 rounded-2xl mt-2 mb-4 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-300 focus:outline-8 focus:outline-blue-300 focus:outline-offset-2 cursor-text'
									/>
								</div>
								<button
									onClick={moreOptionsClick}
									className='text-left mb-4 mt-2 flex'>
									<p className='font-semibold'>More options</p>
									<svg
										className='w-3 h-3 mt-2 ml-2'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M 20.16 6.65 L 12 14.71 L 3.84 6.65 a 2.27 2.27 0 0 0 -3.18 0 a 2.2 2.2 0 0 0 0 3.15 L 12 21 L 23.34 9.8 a 2.2 2.2 0 0 0 0 -3.15 a 2.26 2.26 0 0 0 -3.18 0' />
									</svg>
								</button>
								{!close ? (
									<></>
								) : (
									<>
										<div className='mb-4 mt-2 flex'>
											<div className='relative bg-black h-6 w-10 rounded-3xl border border-gray-500'>
												<input
													onClick={secondCheckbox}
													id='checkbox1'
													className='cursor-pointer absolute size-full z-10 opacity-0'
													type='checkbox'
													defaultChecked
												/>
												<div className='absolute bg-white right-0 top-0 w-6 h-6 rounded-3xl border border-gray-500 m-[-1px] transition-left'></div>
											</div>
											<p className='ml-2'>Allow people to comment</p>
										</div>
										<div className='mb-4 mt-2 flex'>
											<div className='relative bg-black h-6 w-10 rounded-3xl border border-gray-500'>
												<input
													onClick={thirdCheckbox}
													id='checkbox2'
													className='cursor-pointer absolute size-full z-10 opacity-0'
													type='checkbox'
													defaultChecked
												/>
												<div className='absolute bg-white right-0 top-0 w-6 h-6 rounded-3xl border border-gray-500 m-[-1px] transition-left'></div>
											</div>
											<p className='ml-2'>Show similar products</p>
										</div>
										<p className='text-sm ml-12'>
											People can shop products similar to what's shown in this Pin using visual search Shopping recommendations aren't available for
											Idea ads and Pins with tagged products or paid partnership label
										</p>
									</>
								)}
							</section>
						</form>
					) : (
						<></>
					)}
				</div>
			</div>
		</main>
	);
}
