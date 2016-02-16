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
		self.height = "short";
		self.media = new textOverImage.Models.Media();
		self.subheadline = "Sub-Headline";
		self.position = "tl";
		if (data !== undefined) {
			if (data.headline !== undefined) {
				self.headline = data.headline;
			}
			if (data.height !== undefined) {
				self.height = data.height;
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
	* @description Class definining a media object for the text over image.
	*/
	models.Media = function(data) {
		var self = this;
		self.id = 0;
		self.url = "";
		self.width = 0;
		self.height = 0;
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
		}
	};

}(window.textOverImage.Models = window.textOverImage.Models || {}));
