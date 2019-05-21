var r2rAdminApp = angular.module('r2rAdminApp', ['ui.router', 'ngCookies']);

r2rAdminApp.config(function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController',
            resolve: {authenticate: authenticate}

        })

        .state('inventory', {
            url: '/inventory',
            templateUrl: 'inventory.html',
            controller: 'inventoryController',
            resolve: {authenticate: authenticate}

        })
        .state('add-book', {
            url: '/add-book',
            templateUrl: 'add-book.html',
            controller: 'addBookController',
            resolve: {authenticate: authenticate}

        })

        .state('edit-book', {
            url: '/edit-book?id',
            templateUrl: 'edit-book.html',
            controller: 'editBookController',
            params:{id:null},
            resolve: {authenticate: authenticate}


        })

        .state('pending-orders', {
            url: '/pending-orders',
            templateUrl: 'pending-orders.html',
            controller: 'pendingOrdersController',
            resolve: {authenticate: authenticate}

        })

        .state('completed-orders', {
            url: '/completed-orders',
            templateUrl: 'completed-orders.html',
            controller: 'completedOrdersController',
            resolve: {authenticate: authenticate}

        })
});

function authenticate($q, $http, $state, $timeout, $cookies) {
    var uname = $cookies.get("uname");
    var password = $cookies.get("password");

    if (uname != null && password != null) {

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080/admin-api/login',
            data:{
                "uname": uname,
                "password": password
            },
            transformResponse: []
        }).then(function successCallback(response) {
            return $q.when()
        }, function errorCallback(response) {
            alert("Fail");
            // The next bit of code is asynchronously tricky.

            $timeout(function () {
                // This code runs after the authentication promise has been rejected.
                // Go to the log-in page
                $state.go('login')
            });

            // Reject the authentication promise to prevent the state from loading
            return $q.reject()
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    } else {
        $state.go('login')

    }
}

r2rAdminApp.controller('loginController', function ($scope, $http, $cookies, $state) {


    $scope.login = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080/admin-api/login',
            data:{
                "uname": $scope.username,
                "password": $scope.password
            },
            transformResponse: []
        }).then(function successCallback(response) {

            // $cookies.put("key", $scope.key);
            $cookies.put("uname", $scope.username);
            $cookies.put("password", $scope.password);

            $state.go('home');


            console.log("User Verified!!");


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Login Failed, Please try again");
            console.log(response)

        });

    }


});

r2rAdminApp.controller('homeController', function ($scope, $http, $cookies, $state) {


    $scope.manageInventory = function () {

        $state.go('inventory');

    };

    $scope.completedOrders = function () {

        $state.go('completed-orders');

    };

    $scope.pendingOrders = function () {

        $state.go('pending-orders');

    };
    $scope.logout = function () {

        $cookies.remove("uname");
        $cookies.remove("password");
        $state.go('login')

    };
});

r2rAdminApp.controller('inventoryController', function ($scope, $http, $cookies, $state) {

    $scope.logout = function () {

        $cookies.remove("uname");
        $cookies.remove("password");
        $state.go('login')

    };
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/admin-api/get-books'
    }).then(function successCallback(response) {

        $scope.books = response.data;
        console.log($scope.books)

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Inventory Data");

    });

    $scope.goHome = function () {

        $state.go('home');

    };

    $scope.addBook = function () {

        $state.go('add-book');

    };
    $scope.editListing = function (id) {

        $state.go('edit-book', {id:id});

    };
});

r2rAdminApp.controller('editBookController', function ($scope, $http, $cookies, $state, $stateParams) {

    $scope.logout = function () {

        $cookies.remove("uname");
        $cookies.remove("password");
        $state.go('login')

    };
    var id1 = $stateParams.id;
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/store-api/book-details?id='+id1
    }).then(function successCallback(response) {

        $scope.book=response.data;
        $scope.name=$scope.book.name;
        $scope.picurl=$scope.book.picurl;
        $scope.trendingStatus=$scope.book.trendingStatus;
        $scope.category=$scope.book.category;
        $scope.details=$scope.book.details;
        $scope.price=$scope.book.price;
        $scope.author=$scope.book.author;
        $scope.activeStatus=$scope.book.activeStatus;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving match-details");

    });

    $scope.editListing = function () {

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080/admin-api/edit-book',
            data: {
                "id": id1,
                "name": $scope.name,
                "picurl": $scope.picurl,
                "trendingStatus": $scope.trendingStatus,
                "activeStatus": $scope.activeStatus,
                "category": $scope.category,
                "details": $scope.details,
                "price": $scope.price,
                "author": $scope.author
            }
        }).then(function successCallback(response) {
            alert('Databases Successfully Updated');
            $state.go('inventory');

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("We encountered an error while saving your information.");
            console.log(response)
        });
    };


    $scope.goHome = function () {

        $state.go('home');

    };
});


r2rAdminApp.controller('addBookController', function ($scope, $http, $cookies, $state) {
    $scope.logout = function () {

        $cookies.remove("uname");
        $cookies.remove("password");
        $state.go('login')

    };
    $scope.createListing = function () {

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080/admin-api/new-book',
            data: {
                "name": $scope.name,
                "picurl": $scope.picurl,
                "trendingStatus": $scope.trendingStatus,
                "category": $scope.category,
                "details": $scope.details,
                "price": $scope.price,
                "author": $scope.author
            }
        }).then(function successCallback(response) {
            alert('Databases Successfully Updated');
            $state.go('inventory');

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("We encountered an error while saving your information.");
            console.log(response)
        });
    };


    $scope.goHome = function () {

        $state.go('home');

    };
});


r2rAdminApp.controller('pendingOrdersController', function ($scope, $http, $cookies, $state) {
    $scope.logout = function () {

        $cookies.remove("uname");
        $cookies.remove("password");
        $state.go('login')

    };

    $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/admin-api/get-pending-orders'
    }).then(function successCallback(response) {

        $scope.orders = response.data;
        console.log($scope.orders)

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Pending Order Data");

    });

    $scope.cancelOrder = function (orderId) {

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/admin-api/cancel-order?id='+orderId
        }).then(function successCallback(response) {

            alert("Order Cancellation Success");
            $state.go('home');

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Cancelling Orders");

        });
    };

    $scope.completeOrder = function (orderId) {

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/admin-api/complete-order?id='+orderId
        }).then(function successCallback(response) {

            alert("Order Completed!");
            $state.go('home');

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Completing Orders");

        });
    };


    $scope.goHome = function () {

        $state.go('home');

    };
});

r2rAdminApp.controller('completedOrdersController', function ($scope, $http, $cookies, $state) {
    $scope.logout = function () {

        $cookies.remove("uname");
        $cookies.remove("password");
        $state.go('login')

    };

    $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/admin-api/get-complete-orders'
    }).then(function successCallback(response) {

        $scope.orders = response.data;
        console.log($scope.orders)

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Completed ORder Data");

    });

    $scope.goHome = function () {

        $state.go('home');

    };
});
