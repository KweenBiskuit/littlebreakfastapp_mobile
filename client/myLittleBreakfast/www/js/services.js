angular.module('mlb.services', [])
.factory('Utilities', function($rootScope, $http, $ionicLoading, $window){

    //UTILITIES shared through the app
    $rootScope.show = function (text) {
        $rootScope.loading = $ionicLoading.show({
            content: text ? text : 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    };

    $rootScope.hide = function () {
        $ionicLoading.hide();
    };

    $rootScope.logout = function () {
        $rootScope.setToken("");
        $window.location.href = '#/auth/signin';
    };

    $rootScope.notify =function(text){
        $rootScope.show(text);
        $window.setTimeout(function () {
          $rootScope.hide();
      }, 1999);
    };

    $rootScope.doRefresh = function (tab) {
        if(tab == 1)
            $rootScope.$broadcast('fetchAll');
        else
            $rootScope.$broadcast('fetchCompleted');

        $rootScope.$broadcast('scroll.refreshComplete');
    };

    $rootScope.setToken = function (token) {
        return $window.localStorage.token = token;
    }

    $rootScope.getToken = function () {
        return $window.localStorage.token;
    }

    $rootScope.isSessionActive = function () {
        return $window.localStorage.token ? true : false;
    }
})
.factory('API', function ($rootScope, $http, $ionicLoading, $window) {
    //definition de l'url du server
    // var base = "http://localhost:9804";
    var base = "https://mylittlebreakfast-serv.herokuapp.com";

    return {
    // API Authentification ----------------------
    signin: function (form) {
        return $http.post(base+'/api/auth/login', form);
    },
    signup: function (form) {
        return $http.post(base+'/api/auth/register', form);
    },
    // API Meals -------------------
    getAllMeals: function () {
        console.log("API Get all meals called");
        return $http.get(base+'/api/meals', {
            method: 'GET'
        });
    },
    getOneMeal: function (id) {
        return $http.get(base+'/api/meal/' + id, {
            method: 'GET'
        });
    },
    saveMeal: function (form) {
        return $http.post(base+'/api/meal', form, {
            method: 'POST'
        });
    },
    putMeal: function (id, form) {
        return $http.put(base+'/api/meal/' + id, form, {
            method: 'PUT'
        });
    },
    deleteMeal: function (id) {
        return $http.delete(base+'/api/meal/' + id, {
            method: 'DELETE'
        });
    },

    // API Categories -------------------
    getAllCategories: function () {
        console.log("API Get all categorys called");
        return $http.get(base+'/api/categories', {
            method: 'GET'
        });
    },
    getOneCategory: function (id) {
        return $http.get(base+'/api/category/' + id, {
            method: 'GET'
        });
    },
    saveCategory: function (form) {
        return $http.post(base+'/api/category', form, {
            method: 'POST'
        });
    },
    putCategory: function (id, form) {
        return $http.put(base+'/api/category/' + id, form, {
            method: 'PUT'
        });
    },
    deleteCategory: function (id) {
        return $http.delete(base+'/api/category/' + id, {
            method: 'DELETE'
        });
    },

    // API Shopping Cart -------------------
    getAllCarts: function () {
        console.log("API Get all shopping carts called");
        return $http.get(base+'/api/carts', {
            method: 'GET'
        });
    },
    getOneCart: function (userToken) {
        return $http.get(base+'/api/carts/' + userToken, {
            method: 'GET'
        });
    },
    saveCart: function (form) {
        return $http.post(base+'/api/cart', form, {
            method: 'POST'
        });
    },
    saveOneItemInCart : function (userToken, item) {
        return $http.put(base+'/api/cart/' + userToken, item, {  
            method: 'POST'
        });
    },
    removeOneItemFromCart : function(idCart){
        return $http.put(base+'/api/carts/' + idCart)
    }



} 
});