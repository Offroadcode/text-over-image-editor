(function(models, undefined) {

	/**
	* @class TextOverImage
	* @this TextOverImage
	* @param {JSON} data
	* @param {textOverImage.Models.Media} data.media
	* @param {string} data.headline - A text headline that will overlap the image.
	* @param {string} data.height - "short", "mid", or "tall"; class names for the height of the banner div.
	* @param {string} data.subheadline - A text subheadline that will overlap the image.
	* @param {string} data.position - tl, tc, tr, ml, mc, mr, bl, bm, br.
	* @description Class defining a Text Over Image Editor, which displays a selectable image, headline, sub-headline, and text position.
	*/
	models.TextOverImage = function(data) {
		var self = this;
		self.headline = "Headline";
		self.height = "mid";
		self.link = new textOverImage.Models.Link();
		self.media = new textOverImage.Models.Media();
		self.subheadline = "Sub-Headline";
		self.position = "mc";
		if (data !== undefined) {
			if (data.headline !== undefined) {
				self.headline = data.headline;
			}
			if (data.height !== undefined) {
				self.height = data.height;
			}
			if (data.link !== undefined) {
				self.link = new textOverImage.Models.Link(data.link);
			}
			if (data.media !== undefined) {
				self.media = new textOverImage.Models.Media(data.media);
			}
			if (data.subheadline !== undefined) {
				self.subheadline = data.subheadline;
			}
			if (data.position !== undefined) {
				self.position = data.position;
			}
		}
	};

	/**
	* @class Media
	* @this Media
	* @param {JSON} data
	* @param {integer} data.id
	* @param {string} data.url
	* @param {integer} data.width
	* @param {integer} data.height
	* @param {string} data.altText
	* @description Class definining a media object for the text over image.
	*/
	models.Media = function(data) {
		var self = this;
		self.id = 0;
		self.url = "";
		self.width = 0;
		self.height = 0;
		self.altText = "";
		if (data !== undefined) {
			if (data.id !== undefined) {
				self.id = data.id;
			}
			if (data.url !== undefined) {
				self.url = data.url;
			}
			if (data.width !== undefined) {
				self.width = data.width;
			}
			if (data.height !== undefined) {
				self.height = data.height;
			}
			if (data.altText !== undefined) {
				self.altText = data.altText;
			}
		}
	};

	/**
	 * @class Link
	 * @this Link
	 * @param {JSON} data
	 * @param {integer} data.id
	 * @param {string} data.url
	 */
	models.Link = function(data) {
		var self = this;
		self.id = 0;
		self.name = "";
		self.target = "_self";
		self.url = "";
		if (data !== undefined) {
			if (data.id !== undefined) {
				self.id = data.id;
			}
			if (data.name !== undefined) {
				self.name = data.name;
			}
			if (data.target !== undefined) {
				self.target = data.target;
			}
			if (data.url !== undefined) {
				self.url = data.url;
			}
		}
	}

}(window.textOverImage.Models = window.textOverImage.Models || {}));
