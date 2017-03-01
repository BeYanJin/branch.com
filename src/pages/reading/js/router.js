myApp.config(['$stateProvider'
    function ($stateProvider) {
        $stateProvider
        .state('login', {
            url: '',
            templateUrl: 'modules/login/login.html',
            controller: 'loginCtrl'
        });
    }
]);