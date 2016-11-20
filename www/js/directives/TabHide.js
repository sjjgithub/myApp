/**
 * Created by guzhenfu on 2016/7/29.
 */
angular.module('starter.directives')
  .directive('hideTabs',function($rootScope){
    return {
      restrict:'AE',
      link:function($scope){
        $rootScope.hideTabs = 'tabs-item-hide';
        $scope.$on('$destroy',function(){
          $rootScope.hideTabs = ' ';
        })
      }
    }
  })
  .directive('setFocus', function(){
                  return function(scope, element){
                     element[0].focus();
                    }
                  })
  

