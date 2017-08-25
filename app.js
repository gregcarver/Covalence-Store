
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
        templateUrl: "../views/invoice.html"
})
    .when('/checkout',{
        templateUrl: "../views/checkout.html"
})
    .when('/products/:id',{
        templateUrl: "../views/productinfo.html"
})
});
app.run(function($rootScope){
    var items = localStorage.getItem('session');

    if (items === null) {
        items = [];
        localStorage.setItem('session', JSON.stringify(items));
    } else {
        items = JSON.parse(items);
    }

    $rootScope.array = items;
    $rootScope.total=0
})

app.factory("cartFactory", function($rootScope, sessionFactory){
    var factory={};

    factory.add = function(data){
        $rootScope.array.push(data);
        $rootScope.total += data.price;
        sessionFactory.addSession(data);
    };

    factory.remove = function(data){  
        var index = $rootScope.array.indexOf(data);
        
        if(index === -1){
            return;
        }

        $rootScope.array.splice(index, 1);
        $rootScope.total -= data.price;
        sessionFactory.removeSession(data);
    };

    return factory;
});

app.factory("sessionFactory", function($rootScope){
    var factory = {};
    var storage = JSON.parse(localStorage.getItem('session'));

    factory.addSession = function(data){
         
        storage.push(data);
        localStorage.setItem('session', JSON.stringify(storage));
    }
    
    factory.removeSession = function(data){  
        var index = storage.indexOf(data);
        storage.splice(index, 1);
        localStorage.setItem('session', JSON.stringify(storage));
        console.log(storage);

    }

    return factory;
}); 

// //Get all products
app.controller("GetProducts",function($scope,$http,$location){
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=apparel', fillHeader)
        .then(function(response){
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
        
        })
            $scope.getId=function(id){
            console.log(id)
            $location.path("/products/" + id)
        };
    })


// //Get one product
app.controller("GetOneProduct",function($scope,$http,$routeParams,$rootScope, cartFactory){
    var id=$routeParams.id;

    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/'+id,fillHeader)
        .then(function(response){
            $scope.singleProduct = response.data.data;
        });

    $scope.initializeStorage = function(){
        // var array = [];
        // localStorage.setItem('session', JSON.stringify(array))

    };

    $scope.addItem=function(data){
        cartFactory.add(data);
    };
});
app.controller("CartController",function($scope,$http,$routeParams,$rootScope, cartFactory){

    $scope.removeItem = function(data) {
        cartFactory.remove(data);   
    }
    
})

// //Get all invoices
app.controller("GetInvoices",function($scope,$http){
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/all', fillHeader)
        .then(function(response){
            $scope.invoices=response.data.data
        });
});

 //Post Invoice
app.controller("PostProduct",function($scope,$http,$location,$rootScope){
    var data = {
        price : $rootScope.total
    }
    $scope.Poster = function(){
        $http({ 
            method: 'POST', 
            url: 'http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices',fillHeader,
            headers: {
                'Filter' : 'f0414a37-8143-11e7-8e40-12dbaf53d968' 
            }, 
            data: data 
        })
        .then(function(response){
        
        })
        $location.path("/invoices")
    }

})
app.filter('MonetaryUnit', function () {
    return function(amount) {
        var string = amount.toString();
        return string.slice(0,-2)   
    };
});

app.controller("CheckOut", function($scope, myFactory){
    var cvc = document.getElementById("cvc");
    
    cvc.addEventListener("click", function(){
        var inputVal = document.getElementById("inputVal").value;
        console.log(inputVal);
        myFactory.getCardBrand(inputVal);  
    });
    
});

app.factory('myFactory', function () {
    var service = {};

    service.getCardBrand = function(num){
        var brand,
            patterns = [
                { name: 'amex', pattern: /^3[47]/ },
                { name: 'dankort', pattern: /^5019/ },
                { name: 'dinersclub', pattern: /^(36|38|30[0-5])/ },
                { name: 'discover', pattern: /^(6011|65|64[4-9]|622)/ },
                { name: 'jcb', pattern: /^(35|1800|2131)/ },
                { name: 'laser', pattern: /^(6706|6771|6709)/ },
                { name: 'maestro', pattern: /^(5018|5020|5038|6304|6703|6759|676[1-3])/}, 
                { name: 'elo', pattern: /^4011|438935|45(1416|76|7393)|50(4175|6699|67|90[4-7])|63(6297|6368)/ },
                { name: 'mastercard', pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/ },
                { name: 'unionpay', pattern: /^62/ },
                { name: 'visaelectron', pattern: /^4(026|17500|405|508|844|91[37])/ },
                { name: 'visa', pattern: /^4/ }
            ];

        patterns.some(function(p) {
            if (p.pattern.test(num)) {
                brand = p.name;
                return true;
            }
        });

        if(brand === "discover"){
            var disc = document.getElementById("disc-img");
            $(disc).css("border", "4px yellow solid");
            console.log("This is a discover");
        } else if(brand === "visa"){
            console.log("this is a visa");
            var visa = document.getElementById("visa-img");
            $(visa).css("border", "4px yellow solid");
        } else if(brand === "amex"){
            var amex = document.getElementById("AmExp-img");
            $(amex).css("border", "4px yellow solid")
            console.log("this is amex");
        } else if(brand === "mastercard"){
            console.log("this is a mastercard");
        }

        
    }

    return service;
  });
