angular.module('soundcloud')
  .directive('pwconfirm', function(){
    return {
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.pwconfirm = function(modelValue) {
            return modelValue == scope.password;
        };
        scope.$watch("password", function() {
          ngModel.$validate();
        });
      }
    };
  })
