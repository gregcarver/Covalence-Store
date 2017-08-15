var app = angular.module('myApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when('/'),{
        templateUrl: "../views/home.html"
    }
    .when('/products'),{
    templateUrl: "../views/products.html"
}
    .when('/miscellaneous'),{
    templateUrl: "../views/misc.html"
}
    .when('/invoices'),{
    templateUrl: "../views/invoices.html"
}
    .when('/checkout'),{
    templateUrl: "../views/checkout.html"
}
    .when('/products:id'),{
    templateUrl: "../views/productinfo.html"
}
    .when('/miscellaneous:id'),{
    templateUrl: "../views/miscinfo.html"
}
});
app.controller("GetProducts",function($scope,$http){
    console('Get product initialized')
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/all')
        .then(function(response){
            $scope.products=response.data
        })
    })