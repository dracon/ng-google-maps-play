'use strict';

angular.module('b2vGmap1.view2', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {


        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {
        var events = {
            places_changed: function (searchBox) {
                var map = searchBox.getPlaces();
                addMarkers(map);
                $scope.map.center = {
                        latitude: map[0].geometry.location.lat(),
                        longitude: map[0].geometry.location.lng()
                    };

                $scope.map.zoom = 16;


                console.log($scope.map);
            }
        };

        var addMarkers = function (map) {
            var markers = [];
            for (var i = 0; i < map.length; i++) {
                $scope.searchResults.results.push({
                    'coords': {
                        'latitude': map[i].geometry.location.lat(),
                        'longitude': map[i].geometry.location.lng()
                    },
                    'key': 'someKey-' + i
                })
            }

            //$scope.searchResults.results = markers;
            console.log("Markers", $scope.searchResults.results);
        };
        $scope.searchbox = {template: 'searchbox.tpl.html', events: events};
        uiGmapGoogleMapApi.then(function (maps) {
            var lastId = 1;
            $scope.searchResults = {
                results: [{
                    'coords': {
                        'latitude': 63.435693,
                        'longitude': 10.394435
                    },
                    'key': 'someKey-Trondheim'
                }]
            };
            $scope.bLayerShow = false;
            $scope.tLayerShow = true;
            $scope.lType = "TransitLayer";
            $scope.map = {
                center: {latitude: 63.435693, longitude: 10.394435},
                doCluster: true,
                options: {
                    streetViewControl: false,
                    panControl: false,
                    maxZoom: 18,
                    minZoom: 3
                },
                markerControl: {},
                events: {
                    idle: function (map) {
                        //alert('Hei');
                        $scope.map.actualZoom = map.getZoom();
                        // if ($scope.addMarkers)
                        //     $scope.addMarkers(10);
                    }
                },
                clusterOptions: {},
                zoom: 14,
                showMarkers: true
            };
            $scope.options = {scrollwheel: false};

            $scope.addMarkers = function (num) {
                var markers = [];
                var i = 0;

                for (i = 0; i < num; i++) {
                    var cords = chance.coordinates().split(',');
                    markers.push({
                        'coords': {
                            'latitude': cords[0],
                            'longitude': cords[1]
                        },
                        'key': 'someKey-' + lastId
                    });
                    lastId++;
                }
                $scope.searchResults.results = $scope.searchResults.results.concat(markers);
                console.log("SResults:", $scope.searchResults.results);
            };

            $scope.forceClusterDraw = function () {
                $scope.map.markerControl.managerDraw();
            };


            $scope.reset = function () {
                lastId = 1;
                $scope.searchResults.results.length = 0;
//      $scope.searchResults = {
//        results: []
//      };
            };

            $scope.toggleCluster = function () {
             $scope.map.doCluster = !$scope.map.doCluster;
                console.log("doCluster", $scope.map.doCluster);
            }
            $scope.toggleMarkers = function () {
                $scope.map.showMarkers = !$scope.map.showMarkers;
            }
        });
    }]);