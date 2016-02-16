angular.module('umbraco').controller('confirmation.dialog.controller',
    function($scope) {
		$scope.model = {
			message: "Are you sure?"
		};
		if ($scope.dialogData && $scope.dialogData.message) {
    		$scope.model.message = $scope.dialogData.message;
    	}
    });
