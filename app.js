var fillHeader = {headers:{'Filter' : 'f0414a37-8143-11e7-8e40-12dbaf53d968'} }
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
    .when('/products/:id',{
    templateUrl: "../views/productinfo.html"
})
});
// //Get all products
app.controller("GetProducts",function($scope,$http,$location){
    // console('Get product initialized')
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=apparel', fillHeader)
        .then(function(response){
            //console.log(response)
            console.log('get request processed')
            $scope.products = response.data.data
            
                console.log($scope.products)
           
        })
                    $scope.getId=function(id){
            console.log(id)
            $location.path("/products/" + id)
        };
    })
app.controller("GetMisc",function($scope,$http,$location){
    // console('Get product initialized')
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=misc',fillHeader)
        .then(function(response){
            //console.log(response)
            console.log('get request processed')
            $scope.products = response.data.data
            
                console.log($scope.products)
        })
            $scope.getId=function(id){
            console.log(id)
            $location.path("/products/" + id)
        };
    })
// //Get one product
app.controller("GetOneProduct",function($scope,$http,$routeParams){
    var id=$routeParams.id;
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/'+id,fillHeader)
        .then(function(response){
            console.log('get request processed')
            $scope.singleProduct=response.data.data
                var array= []
            $scope.addItem=function(data){
                

               // array = JSON.parse(localStorage.getItem('session'));
            //     array.push(data)
            //     localStorage.setItem('session',JSON.stringify(array));
            // var storage = JSON.parse(localStorage.getItem('session'));


         array = JSON.parse(localStorage.getItem('session'));
        array.push(data);
        localStorage.setItem('session', JSON.stringify(array));
        console.log(localStorage);
        var storage = JSON.parse(localStorage.getItem('session'));
        console.log(storage);
        console.log(localStorage);
        }

    })
})
app.controller("CartController",function($scope){
    $scope.storage=JSON.parse(localStorage.getItem('session'));
        console.log($scope.storage)
    $scope.deleteItem=function(){
        var id=$routeParams.id;
        $http.delete('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/'+id,fillHeader)
            .then(function(response){
                console.log(response)
            })
    }
})
    // app.controller("GetOneMisc",function($scope,$http,$routeParams){
    // console('Get product initialized')
    // var id=$routeParams.id;
    // $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/'+id,fillHeader)
    //     .then(function(response){
    //         console.log('get request processed')
    //         $scope.products=response.data
    //     })
    // })
// //Get all invoices
app.controller("GetInvoices",function($scope,$http){
    console('Get all invoices initialized')
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/all',fillHeader)
        .then(function(response){
            console.log('get request processed')
            $scope.invoices=response.data.data
        })
    })
// //Get one invoice
// app.controller("GetOneProduct",function($scope,$http,$routeParams){
//     console('Get product initialized')
//     var id=$routeParams.id;
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/one/'+id,fillHeader)
//         .then(function(response){
//             console.log('get request processed')
//             $scope.invoices=response.data
//         })
//     })
// //Post Invoice
// app.controller("PostProduct",function($scope,$http){
//     console('post invoice initialized')
//     $scope.postInvoice = function() {
//         console.log('i clicked');
//         var data= {
//             date : $scope.date,
//             price : $scope.price,
//             id : $scope.id
//         };
//     $http.post('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices',fillHeader)
//         .then(function(response){
//             //console.log(response)
//             console.log('post request processed')
//             $scope.invoices = response.data.data
            
//                 console.log($scope.invoices)
           
//         })
//     }
// })
app.filter('MonetaryUnit', function () {
    return function (amount) {
        console.log(amount)
          var string= amount.toString()
          console.log(string)
        return string.slice(0,2)   
    }
});
            // $scope.initializeStorage = function(){
            //     var array = [];
            //     localStorage.setItem('session' ,JSON.stringify(array))
            //     console.log(localStorage)
            // }