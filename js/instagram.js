import request from './request';

export default class Instagram {

	constructor(params) {
		this.options = params
	}

	run() {
		if (typeof this.options.accessToken !== 'string') {
			throw new Error("Missing accessToken.");
		}
		let url = this.buildUrl();

		return request({url: this.buildUrl()})
				.then(data => data = JSON.parse(data));
	}

	buildUrl() {
		let base, endpoint, final;
		base = "https://api.instagram.com/v1";
		switch (this.options.get) {
			case "tagged":
				if (!this.options.tagName) {
					throw new Error("No tag name specified. Use the 'tagName' option.");
				}
				endpoint = "tags/" + this.options.tagName + "/media/recent";
				break;
			case "self":
				endpoint = "users/self/media/recent";
				break;
			case "user":
				if (!this.options.userId) {
					throw new Error("No user specified. Use the 'userId' option.");
				}
				endpoint = "users/" + this.options.userId + "/media/recent";
				break;
			default:
				throw new Error("Invalid option for get: '" + this.options.get + "'.");
		}
		final = base + "/" + endpoint;
		if (this.options.accessToken != null) {
			final += "?access_token=" + this.options.accessToken;
		} else {
			final += "?client_id=" + this.options.clientId;
		}
		if (this.options.limit != null) {
			final += "&count=" + this.options.limit;
		}
		return final;
	}
}
