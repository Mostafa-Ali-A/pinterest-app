import axios from 'axios';
import * as cheerio from 'cheerio';

//const ImageApi = async () => {
const url = `https://images.pexels.com`;

// Define a user-agent header to simulate a browser request
const headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
};

//const num = Math.floor(Math.random() * 4456);
//const url = `${urlImages}/api/v1/photos/${num}?per_page=10`;
//console.log(url.endsWith('jpg'));
//('use server');

/*const res = */ // Send an HTTP GET request to the URL with the headers
axios
	.get(url, { headers })
	.then((response) => {
		if (response.status === 200) {
			// Load the HTML content of the page using cheerio
			const $ = cheerio.load(response.data);

			// Find the table with class 'wikitable sortable'
			const table = $('table.wikitable.sortable');

			// Initialize arrays to store the data
			const names = [];
			const groups = [];
			const localNames = [];
			const photographs = [];

			// Create a folder to save the images
			/*if (!fs.existsSync('dog_images')) {
						fs.mkdirSync('dog_images');
				}*/
			// Iterate through rows in the table (skip the header row)
			$('tr', table).each((index, row) => {
				const columns = $('td, th', row);
				if (columns.length === 4) {
					// Extract data from each column
					const name = $('a', columns.eq(0)).text().trim();
					const group = columns.eq(1).text().trim();

					// Check if the second column contains a span element
					const spanTag = columns.eq(2).find('span');
					const localName = spanTag.text().trim() || '';

					// Check for the existence of an image tag within the fourth column
					const imgTag = columns.eq(3).find('img');
					const photograph = imgTag.attr('src') || '';

					// Download the image and save it to the folder
					if (photograph) {
						axios
							.get(photograph, { responseType: 'arraybuffer' })
							.then((imageResponse) => {
								if (imageResponse.status === 200) {
									const imageFilename = `dog_images/${name}.jpg`;
									fs.writeFileSync(imageFilename, imageResponse.data);
								}
							})
							.catch((error) => {
								console.error('Failed to download image:', error);
							});
					}

					// Append data to respective arrays
					names.push(name);
					groups.push(group);
					localNames.push(localName);
					photographs.push(photograph);
				}
			});

			// Print or process the extracted data as needed
			for (let i = 0; i < names.length; i++) {
				console.log('Name:', names[i]);
				console.log('FCI Group:', groups[i]);
				console.log('Local Name:', localNames[i]);
				console.log('Photograph:', photographs[i]);
				console.log();
			}
		} else {
			console.log('Failed to retrieve the web page. Status code:', response.status);
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
//};
/*const photos = res.data.results.map((image) => ({
			id: image.id,
			thumb: image.urls.thumb,
			full: image.urls.full,
		}));
		return photos;
	});
};*/

//export default ImageApi;
