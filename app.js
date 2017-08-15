var app = angular.module('myApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: "../views/home.html"
    })
    .when('/products',{
    templateUrl: "../views/products.html"
})
    .when('/misc',{
    templateUrl: "../views/misc.html"
})
    .when('/invoices',{
    templateUrl: "../views/invoices.html"
})
    .when('/checkout',{
    templateUrl: "../views/checkout.html"
})
//     .when('/products:id',{
//     templateUrl: "../views/productinfo.html"
// })
});
// //Get all products
app.controller("GetProducts",function($scope,$http){
    // console('Get product initialized')
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=apparel',{
       headers:{'Filter' : 'f0414a37-8143-11e7-8e40-12dbaf53d968'} 
    })
        .then(function(response){
            //console.log(response)
            console.log('get request processed')
            $scope.products = response.data.data
            
                console.log($scope.products)
           
        })
    })
app.controller("GetMisc",function($scope,$http){
    // console('Get product initialized')
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=misc',{
       headers:{'Filter' : 'f0414a37-8143-11e7-8e40-12dbaf53d968'} 
    })
        .then(function(response){
            //console.log(response)
            console.log('get request processed')
            $scope.products = response.data.data
            
                console.log($scope.products)
           
        })
    })
// //Get one products
// app.controller("GetOneProducts",function($scope,$http,$routeParams){
//     console('Get product initialized')
//     var id=$routeParams.id;
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/'+id)
//         .then(function(response){
//             console.log('get request processed')
//             $scope.products=response.data
//         })
//     })
// //Get all invoices
// app.controller("GetInvoices",function($scope,$http){
//     console('Get product initialized')
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/all')
//         .then(function(response){
//             console.log('get request processed')
//             $scope.invoices=response.data
//         })
//     })
// //Get one invoice
// app.controller("GetOneProducts",function($scope,$http,$routeParams){
//     console('Get product initialized')
//     var id=$routeParams.id;
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/one/'+id)
//         .then(function(response){
//             console.log('get request processed')
//             $scope.invoices=response.data
//         })
//     })
// //Post Invoice
// app.controller("PostProduct",function($scope,$http){
//     console('Get product initialized')
//     $scope.postInvoice = function() {
//         console.log('i clicked');
//         var data= {
//             date : $scope.date,
//             price : $scope.price,
//         };
//         $http({ 
//             method: 'POST', 
//             url: 'http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices', 
//             data: data 
//         })
//     }
// })
