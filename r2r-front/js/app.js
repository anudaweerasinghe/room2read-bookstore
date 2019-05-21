var r2rapp = angular.module('r2rapp', ['ui.router']);

r2rapp.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url:'/home?query',
            params:{query:null},
            templateUrl: 'home.html',
            controller: 'homeController'

        })

        .state('product', {
            url:'/product?id',
            params:{id:null},
            templateUrl: 'product.html',
            controller: 'productController'

        })

        .state('contact', {
            url:'/contact',
            templateUrl: 'contact.html',
            controller: 'contactController'

        })

        .state('about', {
            url:'/about',
            templateUrl: 'about.html',
            controller: 'aboutController'

        })

});

r2rapp.controller('homeController', function ($state, $http, $scope, $stateParams) {

    if (window.screen.width > 590) { // 768px portrait
        $scope.laptop = true;
        console.log($scope.laptop);
    } else if (window.screen.width < 400) {
        $scope.mobile = true;
        console.log($scope.mobile);
    } else {
        $scope.laptop = true;
        console.log($scope.laptop);
    }

    var query1 = $stateParams.query;

    if (query1 === undefined || query1 === null) {

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/store-api/trending'
        }).then(function successCallback(response) {

            $scope.books = response.data;
            console.log($scope.books)

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Retrieving Product Data");

        });
    }else if(query1 === "drama"||query1 === "science-fiction"||query1 === "adventure"||query1 === "romance"||query1 === "children's-books"||query1 === "non-fiction"||query1 === "mystery"||query1 === "horror"||query1 === "fantasy"||query1 === "realistic-fiction"){
        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/store-api/categories?category='+query1
        }).then(function successCallback(response) {

            $scope.books = response.data;
            console.log($scope.books)

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Retrieving Product Data");

        });
    }else{
        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/store-api/search?query='+query1
        }).then(function successCallback(response) {

            $scope.books = response.data;
            console.log($scope.books)

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Retrieving Product Data");

        });
    }

    $scope.searchBooks = function () {
        window.location.replace("http://127.0.0.1/r2r-front/#!home?query="+$scope.searchquery);

    };


});

r2rapp.controller('productController', function ($state, $http, $scope, $stateParams) {

    if (window.screen.width > 590) { // 768px portrait
        $scope.laptop = true;
        console.log($scope.laptop);
    }else if(window.screen.width < 400){
        $scope.mobile = true;
        console.log($scope.mobile);
    } else{
        $scope.laptop = true;
        console.log($scope.laptop);
    }
    var id1 = $stateParams.id;
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/store-api/book-details?id='+id1
    }).then(function successCallback(response) {

        $scope.product=response.data;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving match-details");

    });

    $scope.makeOrder = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080/store-api/order',
            data: {
                "bookId": id1,
                "customerEmail": $scope.email,
                "customerName": $scope.name,
                "customerPhone": $scope.phone
            }
        }).then(function successCallback(response) {
            alert('Your Order was placed Successfully! Please pick up your item at the Library at The Overseas School of Colombo and pay on pick up. Your order will be cancelled if it is not picked up within 7 days.');
            window.location.replace("http://127.0.0.1/r2r-front/");


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("We encountered an error while saving your information.");
            console.log(response)
        });
    };

    $scope.searchBooks = function () {
        window.location.replace("http://127.0.0.1/r2r-front/#!home?query="+$scope.searchquery);

    };


});

r2rapp.controller('contactController', function ($state, $http, $scope) {

    if (window.screen.width > 590) { // 768px portrait
        $scope.laptop = true;
        console.log($scope.laptop);
    }else if(window.screen.width < 400){
        $scope.mobile = true;
        console.log($scope.mobile);
    } else{
        $scope.laptop = true;
        console.log($scope.laptop);
    }
});

