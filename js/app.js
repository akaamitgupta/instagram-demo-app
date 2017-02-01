import Instagram from './instagram';

let token = '4527699633.3f66c67.c099167d0a8943a8a222183a65c1c150';
let hashtag = 'party';
let limit = 10;

// Self
let instagram_self = new Instagram({
    get: 'self',
    limit: 10,
    accessToken: token
});

instagram_self.run()
	.then(data => {
	    console.log(data);
	    let html = "";
	    data.data.forEach((ph) => {
	        html += `
	            <a href="${ph.link}">
	                <img src="${ph.images.low_resolution.url}">
	            </a>
	        `;
	    });
	    document.getElementById('instagram-self').innerHTML = html;
	})
	.catch(error => {
	    console.log(error);
	});


// By a #hashtag
let instagram_hashtag = new Instagram({
    get: 'tagged',
    tagName: hashtag,
    accessToken: token
});

instagram_hashtag.run()
	.then(data => {
	    console.log(data);
	    let html = "";
	    data.data.forEach((ph) => {
	        html += `
	            <a href="${ph.link}">
	                <img src="${ph.images.low_resolution.url}">
	            </a>
	        `;
	    });
	    document.getElementById('instagram-hashtag').innerHTML = html;
	})
	.catch(error => {
	    console.log(error);
	});
