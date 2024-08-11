import { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ReactCropper = ({
	file,
	setPreviewFile,
	setFile,
	setOpen,
}: {
	file: string;
	setPreviewFile: React.Dispatch<React.SetStateAction<string>>;
	setFile: React.Dispatch<React.SetStateAction<string>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const cropperRef = useRef<ReactCropperElement>(null);

	/* Crop Start Animation */

	const cropStart = (e: Cropper.CropEndEvent<HTMLImageElement>) => {
		const target = e.target as HTMLElement;
		const firstTarget = target?.nextSibling?.firstChild as HTMLElement;
		const secondTarget = firstTarget.firstChild as HTMLElement;
		if (firstTarget && secondTarget) {
			firstTarget.style.overflow = 'unset';
			secondTarget.style.overflow = 'unset';
			firstTarget.style.opacity = '0.5';
			secondTarget.style.opacity = '0.5';
		}
	};

	/* Crop End Animation */

	const cropEnd = (e: Cropper.CropEndEvent<HTMLImageElement>) => {
		const target = e.target as HTMLElement;
		const firstTarget = target?.nextSibling?.firstChild as HTMLElement;
		const secondTarget = firstTarget.firstChild as HTMLElement;
		if (firstTarget && secondTarget) {
			firstTarget.style.overflow = '';
			secondTarget.style.overflow = '';
			firstTarget.style.opacity = '';
			secondTarget.style.opacity = '';
		}
	};

	/* Crop And Save Button */

	const cropAndSave = () => {
		const imageElement = cropperRef.current;
		const cropper = imageElement?.cropper;
		if (cropper) {
			setPreviewFile(cropper?.getCroppedCanvas().toDataURL());
		}
		setFile('');
		setOpen(false);
		const target = document.documentElement;
		target?.classList.toggle('overflow-hidden');
	};

	/* Crop A Full Copy Button */

	const saveAFullCopy = () => {
		setPreviewFile(file);
		setFile('');
		setOpen(false);
		const target = document.documentElement;
		target?.classList.toggle('overflow-hidden');
	};

	return (
		<>
			<div
				onClick={(e) => e.stopPropagation()}
				id='scroll'
				className='block items-center overflow-auto h-[calc(100%-17rem)] ml-4 select-none touch-none relative cursor-auto'>
				<Cropper
					className='min-[700px]:w-[670px] w-[calc(670px/2)] h-[384px] my-28 mx-auto'
					src={file}
					guides={true}
					cropstart={cropStart}
					cropend={cropEnd}
					ref={cropperRef}
					viewMode={3}
					minCropBoxHeight={384}
					minCropBoxWidth={670}
					background={true}
					responsive={false}
					autoCropArea={1}
					checkOrientation={false}
					zoomTo={0.1}
					highlight={true}
					zoomable={false}
					zoomOnTouch={false}
					zoomOnWheel={false}
					modal={true}
				/>
			</div>
			<div
				onClick={(e) => e.stopPropagation()}
				className='h-24 ml-4 flex items-center text-nowrap min-[225px]:overflow-hidden overflow-auto bg-white rounded-b-2xl cursor-auto'>
				<button
					title='Crop & Save'
					onClick={cropAndSave}
					className='h-10 min-w-28 rounded-2xl
bg-red-500 hover:bg-red-700 text-white mt-4 mx-auto'>
					Crop & Save
				</button>
				<button
					title='Save a full copy'
					onClick={saveAFullCopy}
					className='h-10 min-w-32 rounded-2xl
bg-blue-500 hover:bg-blue-700 text-white mt-4 min-[430px]:ml-[-8rem] ml-2 mr-6'>
					Save a full copy
				</button>
			</div>
		</>
	);
};
export default ReactCropper;
