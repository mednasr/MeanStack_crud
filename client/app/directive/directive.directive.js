'use strict';

angular.module('MeanApp')

.directive('crudMed',['Modal','$injector','$loading','socket','toastr', function (Modal,$injector,$loading,socket,toastr) {
    return {
      templateUrl: 'app/directive/table.html',
      restrict: 'EA',
      scope: {obj:'='},
      link: function (scope, element, attrs) {
        // var cols = ['name','info','parent','image'];
        scope.title = attrs.api+'s';
        var cols = JSON.parse(attrs.cols);
        var obj = [];
        scope.changeActivePatient = changeActivePatient;
        scope.noedit = attrs.noedit;
        scope.nodelete = attrs.nodelete;
        scope.noadd = attrs.noadd;

        angular.forEach(cols, function(o) {
          // var k,v;
          angular.forEach(o, function(v, k) {
            var v1;
            if(v==='number' || v==='float' || v==='integer' || v==='currency'){ v1 = 'parseFloat';}
            else{ v1 = 'lowercase';}
            obj.push({heading:k,dataType:v, sortType:v1});
          });
        });
        scope.cols = obj;
        // scope.Utils = {
        //    keys : Object.keys,
        //    values : Object.values
        // }
        var api = $injector.get(attrs.api);
        scope.data = [];
        // scope.loadingTable = true;
        $loading.start('crudMed');
        scope.data =api.query(function() {
          // scope.loadingTable = false;
          $loading.finish('crudMed');
          socket.syncUpdates(attrs.api.toLowerCase(), scope.data);
        });
        scope.edit = function(item) {
          var title; if(item._id){ title = 'Editing ' + item.lastName;} else{ title = 'Add New';}
          Modal.show(item,{title:title, api:attrs.api, columns: obj, disabledColumn: attrs.disabledcolumn});
        };
        scope.changeActive = function(b){ // success handler
          b.active = !b.active;
          api.update({ id:b._id }, b).$promise.then(function() {

          }, function(error) { // error handler
              console.log(error);
              toastr.error(error.statusText + ' (' +  error.status + ')');
              b.active = !b.active;
          });
        };

        scope.delete = function(item) {
          api.delete({id:item._id});
        };
        function changeActivePatient(index){
          // simple function to attach the data of the turtle clicked on to
          // the active turtle object
          scope.activePatient = index;
        }
        scope.$on('$destroy', function () {
          socket.unsyncUpdates(attrs.api.toLowerCase());
        });
      }
    };}])
.directive('ngConfirmClick', ['$modal',
    function($modal) {

      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      return {
        restrict: 'A',
        scope:{
          ngConfirmClick:'&',
          item:'='
        },
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            var message = attrs.ngConfirmMessage || 'Are you sure to delete? ';

            /*
            //This works
            if (message && confirm(message)) {
              scope.$apply(attrs.ngConfirmClick);
            }
            //*/

            //*This doesn't works

            var modalHtml = '<div class="modal-header">Confirm Delete</div>';
            modalHtml += '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-danger" ng-click="ok()">Delete</button><button class="btn" ng-click="cancel()">Cancel</button></div>';

            var modalInstance = $modal.open({
              template: modalHtml,
              controller: ModalInstanceCtrl,
              windowClass: 'modal-danger'
            });

            modalInstance.result.then(function() {
              scope.ngConfirmClick({item:scope.item}); //raise an error : $digest already in progress
            }, function() {
              //Modal dismissed
            });
            //*/

          });

        }
      };
    }
  ])
;
