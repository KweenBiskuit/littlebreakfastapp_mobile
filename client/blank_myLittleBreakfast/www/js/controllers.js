angular.module('littlebreakfast.controllers', ['littlebreakfast.services'])

//AUTHENTIFICATION ===========================================

// SIGN IN Ctrl ------------------------
.controller('SignInCtrl', function ($rootScope, $scope, API, $window) {
    // if the user is already logged in, take him to his todolists
    if ($rootScope.isSessionActive()) {
        $window.location.href = ('#/todolist');
    }

    $scope.user = {
        email: "",
        password: ""
    };

    //ValidateUser
    $scope.validateUser = function () {
        var email = this.user.email;
        var password = this.user.password;

        if(!email || !password) {
          $rootScope.notify("Please enter valid credentials");
          return false;
      }
      $rootScope.show('Please wait.. Authenticating');

      API.signin({
        email: email,
        password: password
    }).success(function (data) {
            $rootScope.setToken(email); // create a session kind of thing on the client side
            console.log(" User logged !");
            $rootScope.hide();
            // $window.location.href = ('#/todolist');

            // similar behavior as clicking on a link
            $window.alert("Ceci est un test de l'objet windows");

            $window.location.href = "#/meals";

        }).error(function (error) {
            $rootScope.hide();
            console.log("Invalid Username or password")
            $rootScope.notify("Invalid Username or password");
        });
    }
    // end:validateUser
})

// SIGN UP Ctrl ------------------------
.controller('SignUpCtrl', function ($rootScope, $scope, API, $window) {
    $scope.user = {
        email: "",
        password: "",
        name: ""
    };

    $scope.createUser = function () {
      var email = this.user.email;
      var password = this.user.password;
      var uName = this.user.name;
      if(!email || !password || !uName) {
          $rootScope.notify("Please enter valid data");
          return false;
      }
      $rootScope.show('Please wait.. Registering');
      API.signup({
        email: email,
        password: password,
        name: uName
    }).success(function (data) {
                $rootScope.setToken(email); // create a session kind of thing on the client side
                $rootScope.hide();
                $window.location.href = ('#/bucket/list');
            }).error(function (error) {
                $rootScope.hide();
                if(error.error && error.error.code == 11000)
                {
                    $rootScope.notify("A user with this email already exists");
                }
                else
                {
                    $rootScope.notify("Oops something went wrong, Please try again!");
                }
                
            });
        }
    })

// TODOLIST Ctrl ===========================================
    // MY ToDoLIST Ctrl ------------------------
    .controller('myListCtrl', function ($rootScope, $scope, API, $timeout, $ionicModal, $window) {
        $rootScope.$on('fetchAll', function(){
           API.getAll($rootScope.getToken()).success(function (data, status, headers, config) {
            $rootScope.show("Please wait... Processing");
            $scope.list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].isCompleted == false) {
                    $scope.list.push(data[i]);
                }
            };
            if($scope.list.length == 0)
            {
                $scope.noData = true;
            }
            else
            {
                $scope.noData = false;
            }

            $ionicModal.fromTemplateUrl('templates/newItem.html', function (modal) {
                $scope.newTemplate = modal;
            });

            $scope.newTask = function () {
                $scope.newTemplate.show();
            };
            $rootScope.hide();
        }).error(function (data, status, headers, config) {
            $rootScope.hide();
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    });

        $rootScope.$broadcast('fetchAll');

        $scope.markCompleted = function (id) {
            $rootScope.show("Please wait... Updating List");
            API.putItem(id, {
                isCompleted: true
            }, $rootScope.getToken())
            .success(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.doRefresh(1);
            }).error(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.notify("Oops something went wrong!! Please try again later");
            });
        };



        $scope.deleteItem = function (id) {
            $rootScope.show("Please wait... Deleting from List");
            API.deleteItem(id, $rootScope.getToken())
            .success(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.doRefresh(1);
            }).error(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.notify("Oops something went wrong!! Please try again later");
            });
        };

    })

    // Completed TODO Ctrl ------------------------ 
    .controller('completedCtrl', function ($rootScope,$scope, API, $window) {
        $rootScope.$on('fetchCompleted', function () {
            API.getAll($rootScope.getToken()).success(function (data, status, headers, config) {
                $scope.list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].isCompleted == true) {
                        $scope.list.push(data[i]);
                    }
                };
                if(data.length > 0 & $scope.list.length == 0)
                {
                    $scope.incomplete = true;
                }
                else
                {
                    $scope.incomplete= false;
                }

                if(data.length == 0)
                {
                    $scope.noData = true;
                }
                else
                {
                    $scope.noData = false;
                }
            }).error(function (data, status, headers, config) {
                $rootScope.notify("Oops something went wrong!! Please try again later");
            });

        });

        $rootScope.$broadcast('fetchCompleted');
        $scope.deleteItem = function (id) {
            $rootScope.show("Please wait... Deleting from List");
            API.deleteItem(id, $rootScope.getToken())
            .success(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.doRefresh(2);
            }).error(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.notify("Oops something went wrong!! Please try again later");
            });
        };
    })

    // New TODO Ctrl ------------------------ 
    .controller('newCtrl', function ($rootScope, $scope, API, $window) {
        $scope.data = {
            item: ""
        };

        $scope.close = function () {
            $scope.modal.hide();
        };

        $scope.createNew = function () {
          var item = this.data.item;
          if (!item) return;
          $scope.modal.hide();
          $rootScope.show();

          $rootScope.show("Please wait... Creating new");

          var form = {
            item: item,
            isCompleted: false,
            user: $rootScope.getToken(),
            created: Date.now(),
            updated: Date.now()
        }

        API.saveItem(form, form.user)
        .success(function (data, status, headers, config) {
            $rootScope.hide();
            $rootScope.doRefresh(1);
        })
        .error(function (data, status, headers, config) {
            $rootScope.hide();
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    };
})