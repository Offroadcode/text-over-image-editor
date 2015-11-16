angular.module("umbraco").directive("contenteditable", function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      // view -> model
      element.bind('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(element.html());
        });
      }); 

      // model -> view
      ctrl.$render = function() {
        element.html(ctrl.$viewValue);
      };

    }
  };
});
