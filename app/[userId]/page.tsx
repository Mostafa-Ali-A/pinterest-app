'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, getFirestore, getDoc, DocumentData } from 'firebase/firestore';
import app from '../FirebaseConfig';
import ReactCropper from '../components/ReactCropper';

export default function page({ params }: { params: DocumentData }) {
	const [userInfo, setUserInfo] = useState<DocumentData>();
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<string>('');
	const [previewFile, setPreviewFile] = useState('');
	const [fileEnter, setFileEnter] = useState(false);

	/* Change Email JSON Symbol */

	useEffect(() => {
		if (params) {
			getUserInfo(params.userId.replace('%40', '@'));
		}
	}, [params]);

	/* Get User Info From FireStore */

	const db = getFirestore(app);

	const getUserInfo = async (email: string) => {
		if (email != undefined) {
			const docRef = doc(db, 'users', email);
			const docSnap = await getDoc(docRef);
			setUserInfo(docSnap.data());
		}
	};

	/* Wrapper Click */

	const wrapper = () => {
		setFile('');
		setOpen(!open);
		const target = document.documentElement;
		target?.classList.toggle('overflow-hidden');
	};

	/* Close Button Click */

	const close = () => {
		setFile('');
		setOpen(!open);
		const target = document.documentElement;
		target?.classList.toggle('overflow-hidden');
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

	/* Add Cover Image Button Click */

	const addCoverImage = () => {
		setOpen(!open);
		const target = document.documentElement;
		target?.classList.toggle('overflow-hidden');
	};

	return (
		<main className='flex flex-col pt-20 justify-center items-center'>
			{open ? (
				<>
					<div
						onClick={wrapper}
						className='fixed size-full bg-[rgba(0,0,0,.8)] inset-0 cursor-zoom-out z-30 flex flex-col justify-center items-center'>
						<div className='max-w-[900px] size-full'>
							<div
								onClick={(e) => e.stopPropagation()}
								className='h-36 pt-6 flex justify-center items-center bg-white mt-4 ml-4 rounded-t-2xl relative cursor-auto'>
								{!file ? (
									<>
										<h1 className='text-3xl font-semibold'>Add a cover image</h1>
										<button
											title='Close'
											onClick={close}
											className='absolute top-20 right-2 min-[450px]:right-20'>
											<svg
												className='w-4 h-4 text-gray-500 hover:text-black'
												xmlns='http://www.w3.org/2000/svg'
												fill='currentColor'
												viewBox='0 0 24 24'>
												<path d='m 15.18 12 l 7.16 -7.16 a 2.25 2.25 0 1 0 -3.18 -3.18 L 12 8.82 L 4.84 1.66 a 2.25 2.25 0 1 0 -3.18 3.18 L 8.82 12 l -7.16 7.16 a 2.25 2.25 0 1 0 3.18 3.18 L 12 15.18 l 7.16 7.16 a 2.24 2.24 0 0 0 3.18 0 c 0.88 -0.88 0.88 -2.3 0 -3.18 Z' />
											</svg>
										</button>
									</>
								) : (
									<>
										<h1 className='text-3xl font-semibold'>Crop the cover image</h1>
										<button
											title='Close'
											onClick={close}
											className='absolute top-5 right-2 min-[535px]:right-20 min-[385px]:top-20'>
											<svg
												className='w-4 h-4 text-gray-500 hover:text-black'
												xmlns='http://www.w3.org/2000/svg'
												fill='currentColor'
												viewBox='0 0 24 24'>
												<path d='m 15.18 12 l 7.16 -7.16 a 2.25 2.25 0 1 0 -3.18 -3.18 L 12 8.82 L 4.84 1.66 a 2.25 2.25 0 1 0 -3.18 3.18 L 8.82 12 l -7.16 7.16 a 2.25 2.25 0 1 0 3.18 3.18 L 12 15.18 l 7.16 7.16 a 2.24 2.24 0 0 0 3.18 0 c 0.88 -0.88 0.88 -2.3 0 -3.18 Z' />
											</svg>
										</button>
										<button
											title='Back'
											onClick={() => setFile('')}
											className='absolute top-5 left-2 min-[535px]:left-20 min-[385px]:top-20'>
											<svg
												className='w-4 h-4 text-gray-500 hover:text-black'
												xmlns='http://www.w3.org/2000/svg'
												fill='currentColor'
												viewBox='0 0 24 24'>
												<path d='M 15.78 24 a 2.2 2.2 0 0 1 -1.58 -0.66 L 3 12 L 14.2 0.66 a 2.2 2.2 0 0 1 3.15 0 c 0.87 0.88 0.87 2.3 0 3.18 L 9.29 12 l 8.06 8.16 c 0.87 0.88 0.87 2.3 0 3.18 c -0.44 0.44 -1 0.66 -1.57 0.66' />
											</svg>
										</button>
									</>
								)}
							</div>
							{!file ? (
								<div
									onClick={(e) => e.stopPropagation()}
									className='mb-4 ml-4 pb-3 h-full max-h-[calc(100%-11rem)] rounded-b-2xl bg-white cursor-auto'>
									<div className='overflow-auto h-full bg-white'>
										<div
											onDragOver={onDrag}
											onDragLeave={() => {
												setFileEnter(false);
											}}
											onDragEnd={onDrag}
											onDrop={onDrop}
											className={`${
												fileEnter ? 'bg-[rgb(215,237,255)] border-solid border-blue-600' : 'bg-white border-dashed border-zinc-300'
											} relative h-[calc(100%+5rem)] pt-56 pb-40 mx-4 border-2 rounded-md block items-center text-center`}>
											<label
												htmlFor='file'
												className='text-neutral-500'>
												Drag and drop an image, or browse from your computer
											</label>
											<label
												htmlFor='file'
												className='text-neutral-400 text-xs absolute bottom-4 left-0 right-0'>
												Supports BMB, GIF, TIFF, WEBP, PNG, JPG, JPEG, GIF
											</label>
											<input
												id='file'
												type='file'
												accept='image/bmp,image/gif,image/jpg,image/jpeg,image/png,image/tiff,image/webp'
												className='opacity-0 cursor-pointer inset-0 size-full absolute'
												onChange={onChange}
											/>
										</div>
									</div>
								</div>
							) : (
								<ReactCropper
									file={file}
									setPreviewFile={setPreviewFile}
									setFile={setFile}
									setOpen={setOpen}
								/>
							)}
						</div>
					</div>
				</>
			) : (
				<></>
			)}

			{previewFile ? (
				<Image
					alt='Cover image'
					className='max-w-xs min-[700px]:min-w-[670px] min-w-[calc(670px/2)] h-96 absolute top-20'
					src={previewFile}
					width={353}
					height={384}
				/>
			) : (
				<div className='max-w-xs min-[700px]:min-w-[670px] min-w-[calc(670px/2)] h-96 px-4 absolute top-20 bg-gray-200' />
			)}

			<div className='flex justify-center items-end min-[700px]:min-w-[670px] min-w-[calc(670px/2)] h-96 z-10'>
				{previewFile ? (
					<button
						onClick={() => setPreviewFile('')}
						title='Delete image'
						className='bg-white rounded-full p-3 mb-auto mr-auto mt-1 ml-1 hover:bg-gray-300'>
						<svg
							className='w-4 h-4 text-black'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 24 24'>
							<path d='m 15.18 12 l 7.16 -7.16 a 2.25 2.25 0 1 0 -3.18 -3.18 L 12 8.82 L 4.84 1.66 a 2.25 2.25 0 1 0 -3.18 3.18 L 8.82 12 l -7.16 7.16 a 2.25 2.25 0 1 0 3.18 3.18 L 12 15.18 l 7.16 7.16 a 2.24 2.24 0 0 0 3.18 0 c 0.88 -0.88 0.88 -2.3 0 -3.18 Z' />
						</svg>
					</button>
				) : (
					<div className='w-10 h-10 p-3 mb-auto mr-auto mt-1 ml-1'></div>
				)}
				<button
					className='ml-auto min-[700px]:mr-28 mr-10 mb-1'
					title='Profile image'>
					{userInfo ? (
						<Image
							className='rounded-full'
							src={userInfo?.image}
							width={90}
							height={90}
							alt='User profile image'
						/>
					) : (
						<></>
					)}
				</button>
				<button
					title='Add cover image'
					onClick={addCoverImage}
					className='bg-white rounded-full p-3 ml-auto mr-1 mb-1 hover:bg-gray-300'>
					<svg
						className='w-4 h-4 text-black'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 24 24'>
						<path d='M 22 10 h -8 V 2 a 2 2 0 0 0 -4 0 v 8 H 2 a 2 2 0 0 0 0 4 h 8 v 8 a 2 2 0 0 0 4 0 v -8 h 8 a 2 2 0 0 0 0 -4' />
					</svg>
				</button>
			</div>

			<h1 className='mt-6 mb-2 text-4xl text-nowrap'>{userInfo?.name}</h1>
			<div className='flex items-center'>
				<svg
					className='w-4 h-4 mx-1 text-gray-500'
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					viewBox='0 0 24 24'>
					<path d='M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12' />
				</svg>
				<p>{userInfo?.email}</p>
			</div>
			<p className='my-2'>0 following</p>
			<div className='flex font-semibold'>
				<button
					title='Share profile'
					className='p-4 bg-gray-200 rounded-full mr-1 hover:bg-gray-300'>
					Share
				</button>
				<button
					title='Edit profile'
					className='p-4 bg-gray-200 rounded-full ml-1 text-nowrap hover:bg-gray-300'>
					Edit profile
				</button>
			</div>
			<div className='mt-8 flex font-semibold'>
				<button
					title='Created pins'
					className='p-2 hover:bg-gray-300 rounded-full mr-2'>
					Created
				</button>
				<button
					title='Saved pins'
					className='p-2 hover:bg-gray-300 rounded-full ml-2'>
					Saved
				</button>
			</div>
		</main>
	);
}
