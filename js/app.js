// XMLHttpRequest wrapper using callbacks
let request = (obj, successHandler, errorHandler) => {
	let xhr = new XMLHttpRequest();
	xhr.open(obj.method || "GET", obj.url);
	if (obj.headers) {
		Object.keys(obj.headers).forEach((key) => {
			xhr.setRequestHeader(key, obj.headers[key]);
		});
	}
	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			successHandler(xhr.response);
		} else {
			errorHandler(xhr.statusText);
		}
	};
	xhr.onerror = () => {
		errorHandler(xhr.statusText);
	};
	xhr.send(obj.body);
}

let token = '4527699633.3f66c67.c099167d0a8943a8a222183a65c1c150';
let hashtag = 'party';
let limit = 10;

// Self
request({url: `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}&count=${limit}`},
	(data) => {
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
	},
	(error) => {
		console.log(error);
	}
);

// By a #hashtag
request({url: `https://api.instagram.com/v1/tags/${hashtag}/media/recent?access_token=${token}&count=${limit}`},
	(data) => {
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
	},
	(error) => {
		console.log(error);
	}
);
