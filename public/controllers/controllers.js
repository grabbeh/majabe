var thingModule = angular.module('thingModule', []);

thingModule.factory('ThingGetter', ['$http',
    function ($http) {

        return {
            get: function (callback) {
                $http.get('/things').success(function (data, status, headers, config) {
                    callback(data)
                })
            }

        }
    }
])

thingModule
    .controller('thingController', ['$scope', '$http', 'ThingGetter',
        function ($scope, $http, ThingGetter) {
            $scope.things = [];
            $scope.message = "";
            $scope.newthing = "";
            ThingGetter.get(function (data) {
                things = $scope.things = data;
            });

            $scope.removeThing = function (thing) {

                $scope.things.forEach(function (item, i) {
                    if (thing.id === item.id && things.length > 0) {
                        $http.delete('/things/' + item.id).success(function () {});

                        $scope.things.splice(i, 1);
                        $scope.message = item.name + " removed";
                    }
                })
            }

            $scope.addThing = function () {
                var id = Math.guid();
                var name = $scope.newthing;
                var postData = {
                    name: name,
                    id: id
                }
                $scope.things.push(postData);
                $http.post('/things/' + postData.id, postData)
                $scope.newthing = "";
            }

            $scope.editThing = function (thing) {
                $scope.editThingy = thing;
            }

            $scope.doneEditing = function (thing) {
                $scope.editThingy = null;
                var putData = {
                    name: thing.name,
                    id: thing.id
                }
                $http.put('/things/' + thing.id, putData).success(function () {})
            }

        }
    ])

Math.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}