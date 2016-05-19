angular.module('mlb.controllers', ['mlb.services'])

// APP CONTROLLER =============================================
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// HOME CONTROLLER =============================================
  .controller('HomeCtrl', function($scope, $stateParams, API) {
    //get All Categories
    API.getAllCategories().success(function (data, status, headers, config) {
      $scope.listCategories = [];

      for (var i = 0; i < data.length; i++) {
        $scope.listCategories.push(data[i]);
      };
    }).error(function (data, status, headers, config) {
      $rootScope.notify("Oops something went wrong !! Please try again later");
    });

    //get favorites Meals
    API.getAllMeals().success(function (data, status, headers, config) {
      $scope.listFavMeals = [];

      console.log(data);
      for (var i = 0; i < data.length/3; i++) {
        $scope.listFavMeals.push(data[i]);
      };
      
    }).error(function (data, status, headers, config) {
      $rootScope.notify("Oops something went wrong !! Please try again later");
    });
  })
/*end:home controller*/

// MEAL CONTROLLER =============================================
  .controller('MealsCtrl', function($scope, API, $window) {

    //Add to cart when click on button
    var shoppingCart = [];

    $scope.addToCart = function(meal){
      console.log(meal); 

      if(shoppingCart.indexOf( meal ) == -1){
        shoppingCart.push(meal);
      }else{
        console.log("This meal is est déjà dans l'array");
      }

     /* $window.localStorage.shoppingCart = shoppingCart;
      console.log("****** shoppingCart *******");
      console.log(shoppingCart);*/

      
    } /*end:addToCart() */


    API.getAllMeals().success(function (data, status, headers, config) {
      $scope.listMeals = [];

      for (var i = 0; i < data.length/3; i++) {
        $scope.listMeals.push(data[i]);
      };
      
    }).error(function (data, status, headers, config) {
      $rootScope.notify("Oops something went wrong !! Please try again later");
    });
  })
/*end:meal controller*/

// MEAL DETAIL CONTROLLER ======================================
  .controller('MealDetailCtrl', function($scope, $stateParams, API) {
    $scope.oneMeal = {};
    console.log("******* State params :id ******* ");
    console.log($stateParams.id);

    var idMeal = $stateParams.id;

    API.getOneMeal(idMeal).success(function (data, status, headers, config) {
      $scope.oneMeal = data[0];
      console.log("**** $scope.oneMeal ****");
      console.log($scope.oneMeal);

    }).error(function (data, status, headers, config) {
      $rootScope.notify("Oops something went wrong !! Please try again later");
    });
  })
/*end:meal-detail controller*/

// BEVERAGES CONTROLLER ========================================
  .controller('BeveragesCtrl', function($scope, API) {
    API.getAllMeals().success(function (data, status, headers, config) {
      $scope.listBeverages = [];
      console.log(data);
      for (var i = 0; i < data.length/3; i++) {
        $scope.listBeverages.push(data[i]);
      };   
    }).error(function (data, status, headers, config) {
      $rootScope.notify("Oops something went wrong !! Please try again later");
    });
  })
/*end:beverages-controller*/




// SHOPPING CART CONTROLLER =====================================
  .controller('ShoppingCartCtrl', function($scope, $stateParams, API, $window) {
   
    var shoppingCartUser = [];
    shoppingCartUser = $window.localStorage.shoppingCart;

    console.log(shoppingCartUser);

  });
/*end:beverages-controller*/