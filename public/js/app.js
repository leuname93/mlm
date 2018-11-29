var app = angular.module('ShoppingApp', ['ngCookies']);

app.controller('ShopCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    $scope.products = [];
    $scope.cart = [];
    $scope.total = 0;
    $scope.items = 0;
    $scope.miP = 0;
    $scope.maP = 0;

    // $scope.clearFilter = function () {
    //     //console.log('hola')
    // };

    $scope.dltItem = function (product) {

        $http.delete("/api/" + $scope.keywords + '/delete/' + product._id)
            .then(function (response) {

                //console.log(JSON.stringify(response));
                $http.get("/api/" + $scope.keywords)
                    .then(function (response) {
                        $scope.products = response.data;

                    });
            });

    };

    $scope.mongoQuery = function () {
        console.log($scope.keywords);
        $http.get("/api/" + $scope.keywords)
            .then(function (response) {
                $scope.products = response.data;
                $scope.miP = 0;
                //console.log(JSON.stringify(response.data));
            });
    };

    $scope.filterPrice = function () {
        $scope.miP = $scope.min;
        $scope.maP = $scope.max;

        $http.get("/api/" + $scope.keywords + '/' + $scope.min + '/' + $scope.max)
            .then(function (response) {
                $scope.products = response.data;
                $scope.min = null;
                $scope.max = null;
            });
    };

    $scope.filterOptions = function () {

    };

    $scope.addItemToCart = function (product) {

        $scope.items++;

        if ($scope.cart.length === 0) {
            product.count = 1;
            $scope.cart.push(product);
        } else {
            var repeat = false;
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i]._id === product._id) {
                    repeat = true;
                    $scope.cart[i].count += 1;
                }
            }
            if (!repeat) {
                product.count = 1;
                $scope.cart.push(product);

            }


        }


        $scope.total += parseFloat(product.price);
        $cookies.put('total', $scope.total);

    };

    $scope.removeItemCart = function (product) {

        $scope.items--;

        if (product.count > 1) {

            product.count -= 1;
            $cookies.putObject('cart', $scope.cart);

        } else if (product.count === 1) {

            var index = $scope.cart.indexOf(product);
            $scope.cart.splice(index, 1);

        }

        $scope.total -= parseFloat(product.price);
        $cookies.put('total', $scope.total);

    };

}]);
