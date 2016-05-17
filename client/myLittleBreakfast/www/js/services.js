angular.module('littlebreakfast.services', [])
.factory('API', function ($rootScope, $http, $ionicLoading, $window) {
        //definition de l'url du server
        var base = "http://localhost:9804";

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

return {
// API Authentification -------------------
        signin: function (form) {
            return $http.post(base+'/api/auth/login', form);
        },
        signup: function (form) {
            return $http.post(base+'/api/auth/register', form);
        },
// API TodoLists -------------------
        getAllTodos: function (email) {
            return $http.get(base+'/api/todoLists/list', {
                method: 'GET',
                params: {
                    token: email
                }
            });
        },
        getOneTodo: function (id, email) {
            return $http.get(base+'/api/todoLists/list/item/' + id, {
                method: 'GET',
                params: {
                    token: email
                }
            });
        },
        saveTodo: function (form, email) {
            return $http.post(base+'/api/todoList/list/item', form, {
                method: 'POST',
                params: {
                    token: email
                }
            });
        },
        putTodo: function (id, form, email) {
            return $http.put(base+'/api/todoList/list/item/' + id, form, {
                method: 'PUT',
                params: {
                    token: email
                }
            });
        },
        deleteTodo: function (id, email) {
            return $http.delete(base+'/api/todoList/list/item/' + id, {
                method: 'DELETE',
                params: {
                    token: email
                }
            });
        },
// API Meals -------------------
        /*getAllMeals: function () {
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
}*/


}



});