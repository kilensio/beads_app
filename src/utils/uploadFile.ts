export default function uploadFile(dataUrl: string) {
	const link = document.createElement('a');
	link.download = 'stage.jpeg';
	link.href = dataUrl;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	setTimeout(() => {
		window.URL.revokeObjectURL(dataUrl);
	}, 20000);
	link.remove();
}
