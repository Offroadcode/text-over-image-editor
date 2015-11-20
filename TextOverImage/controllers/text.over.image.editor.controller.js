angular.module("umbraco").controller("text.over.image.editor.controller", function($scope, dialogService) {

	// Initialization Methods ////////////////////////////////////////////////////

	/**
	* @method init
	* @description Triggered on the controller loaded, kicks off any initialization functions.
	*/
	$scope.init = function() {
        $scope.setVariables();
	};

    /**
    * @method setVariables
    * @description Sets up the initial variables for the view.
    */
    $scope.setVariables = function() {
        $scope.model.value = $scope.getPropertyValue();
        $scope.maxWidth = $scope.getMaxWidth();
		$scope.propertyEditorMode = "edit";
        console.info($scope.model.value);
        console.info($scope.maxWidth);
    };

	// Event Handler Methods /////////////////////////////////////////////////////

	/**
	* @method changePos
	* @param {string} position - tl, tc, tr, ml, mc, mr, bl, bm, br
	* @description Changes the position of the text over the image.
	*/
	$scope.changePos = function(position) {
		if (position) {
			$scope.model.value.position = position;
		}
		$scope.toggleMode('edit');
	};

    /**
    * @method $scope.handleMediaPickerSelection
    * @param {Object} data - modal object returned by dialogService.mediaPicker().
    * @description Event handler triggered by a media picker dialog. If there is an image selected, updates the $scope.model.value with the image's information.
    */
    $scope.handleMediaPickerSelection = function(data) {
        if (data) {
            console.info(data);
            if (data.id) {
                $scope.model.value.media.id = data.id;
                $scope.model.value.media.url = data.image;
                $scope.model.value.media.width = data.originalWidth;
                $scope.model.value.media.height = data.originalHeight;
            }
        }
    };

    /**
    * @method openMediaPicker
    * @description Opens the media picker dialog, showing only images, and sends the data returned to $scope.handleMediaPickerSelection.
    */
    $scope.openMediaPicker = function() {
        var options = {
            onlyImages: true,
            callback: $scope.handleMediaPickerSelection
        };
        dialogService.mediaPicker(options);
    };

	/**
	* @method toggleMode
	* @param {optional string} mode
	* @description If a mode is provided, switch to that. Otherwise, toggle between edit and select.
	*/
	$scope.toggleMode = function(mode) {
		if (mode) {
			$scope.propertyEditorMode = mode;
		} else {
			if ($scope.propertyEditorMode === "edit") {
				$scope.propertyEditorMode = "select";
			} else {
				$scope.propertyEditorMode = "edit";
			}
		}
	};

	// Helper Methods ////////////////////////////////////////////////////////////

    /**
    * @method getBackgroundStyle
    * @returns {array of styles}
    * @description Provides styles for the background image of the text over image editor view.
    */
    $scope.getBackgroundStyle = function() {
        var styles = {
            width: "800px",
            height: "400px",
            background: "black"
        }
        if ($scope.model.value.media) {
            var media = $scope.model.value.media;
            width = media.width;
            height = media.height;
            var ratio = height / width;
            if (width > $scope.maxWidth) {
                width = $scope.maxWidth;
                height = ratio * width;
            }
            styles = {
                width: width + "px",
                height: height + "px",
                background: "url(" + media.url + ")",
                'background-size': "contain"
            };
        }
        return styles;
    };

	/**
	* @method getFrameStyle
	* @returns {array of styles}
	* @description Provides styles for the controller's div wrapper to set its width.
	*/
	$scope.getFrameStyle = function() {
		var styles = {
			width: "800px"
		}
		if ($scope.model.value.media) {
			var media = $scope.model.value.media;
            width = media.width;
            if (width > $scope.maxWidth) {
                width = $scope.maxWidth;
            }
						if(width == 0) {
							width = 800;
						}
            styles = {
                width: width + "px",
            };
		}
		return styles;
	};

    /**
    * @method getMaxWidth
    * @returns {integer}
    * @description If $scope.model.config has a maxWidth value, return that. Otherwise, return 800.
    */
    $scope.getMaxWidth = function() {
        var value = 800;
        if ($scope.model && $scope.model.config) {
            if ($scope.model.config.maxWidth != undefined) {
                value = parseInt($scope.model.config.maxWidth, 10);
            }
        }
        return value;
    };

    /**
    * @method getPropertyValue
    * @returns {textOverImage.Models.TextOverImage}
    * @description If the $scope.model.value already exists, filter it through the model and return it. Elsewise, create a new, default model.
    */
    $scope.getPropertyValue = function() {
        var value = new textOverImage.Models.TextOverImage();
        if ($scope.model) {
            if ($scope.model.value != undefined) {
                value = new textOverImage.Models.TextOverImage($scope.model.value);
            }
        }
        return value;
    };

    /**
    * @method hasImageSelected
    * @returns {bool}
    * @description Returns true if there is a selected media image, otherwise returns false.
    */
    $scope.hasImageSelected = function() {
        var hasImageSelected = false;
        if ($scope.model && $scope.model.value) {
            if ($scope.model.value.media.id != 0) {
                hasImageSelected = true;
            }
        }
        return hasImageSelected;
    };

	// Call $scope.init() ////////////////////////////////////////////////////////

	$scope.init();

});
