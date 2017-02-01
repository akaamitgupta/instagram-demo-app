import request from './request';

let token = '4527699633.3f66c67.c099167d0a8943a8a222183a65c1c150';
let hashtag = 'party';
let limit = 10;

// Self
request({url: `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}&count=${limit}`})
	.then(data => {
		data = JSON.parse(data);
		console.log(data);
		let html = "";
		data.data.forEach((insta) => {
			html += `
				<a href="${insta.link}">
					<img src="${insta.images.low_resolution.url}">
				</a>
			`;
		});
		document.getElementById('instagram-self').innerHTML = html;
	})
	.catch(error => {
		console.log(error);
	});

// By a #hashtag
request({url: `https://api.instagram.com/v1/tags/${hashtag}/media/recent?access_token=${token}&count=${limit}`})
	.then(data => {
		data = JSON.parse(data);
		console.log(data);
		let html = "";
		data.data.forEach((insta) => {
			html += `
				<a href="${insta.link}">
					<img src="${insta.images.low_resolution.url}">
				</a>
			`;
		});
		document.getElementById('instagram-hashtag').innerHTML = html;
	})
	.catch(error => {
		console.log(error);
	});
