// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('littlebreakfast', 
  ['ionic', 'littlebreakfast.services', 'littlebreakfast.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// ROUTING of the APP =======================
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  // AUTH routing -----------------------
  .state('auth', {
    url: "/auth",
    abstract: true,
    templateUrl: "templates/auth/auth.html"
  })
  .state('auth.signin', {
    url: '/signin',
    views: {
      'auth-signin': {
        templateUrl: 'templates/auth/auth-signin.html',
        controller: 'SignInCtrl'
      }
    }
  })
  .state('auth.signup', {
    url: '/signup',
    views: {
      'auth-signup': {
        templateUrl: 'templates/auth/auth-signup.html',
        controller: 'SignUpCtrl'
      }
    }
  })
  // TODOLIST routing -----------------------
  .state('todolist', {
    url: "/todolist",
    abstract: true,
    templateUrl: "templates/todolists/todolist.html"
  })
  .state('todolist.list', {
    url: '/list',
    views: {
      'todolist-list': {
        templateUrl: 'templates/todolists/todolist-list.html',
        controller: 'myListCtrl'
      }
    }
  })
  .state('todolist.completed', {
    url: '/completed',
    views: {
      'todolist-completed': {
        templateUrl: 'templates/todolists/todolist-completed.html',
        controller: 'completedCtrl'
      }
    }
  })
  // MEALS routing -----------------------
  .state('meals', {
    url: '/meals',
    views: {
      'meals': {
        templateUrl: 'templates/meals/meals.html',
        controller: 'mealCtrl'
      }
    }
  })




  $urlRouterProvider.otherwise('/auth/signin');
});
