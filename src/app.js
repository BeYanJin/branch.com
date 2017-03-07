/**
姓名：谈裕锦
时间：2017.01.07
目的：新建ng-app模块，并对该模块进行一系列配置工作，包括：路由机制等。
*/

var myApp = angular.module("myApp", ['oc.lazyLoad', 'ui.router',
            'myApp.controllers', 'myApp.directives', 'myApp.services',
            'ngMessages', 'ngAnimate', 'ngRoute', 'infinite-scroll']);

// 动态加载控制器
myApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // $ocLazyLoad returns a promise that will be rejected when there is an error but if you set debug to true, $ocLazyLoad will also log all errors to the console.
        debug: false,
        // $ocLazyLoad can broadcast an event when you load a module, a component or a file (js/css/template). It is disabled by default, set events to true to activate it. The events are ocLazyLoad.moduleLoaded, ocLazyLoad.moduleReloaded, ocLazyLoad.componentLoaded, ocLazyLoad.fileLoaded
        events: false,
        modules: [
            {
                name: 'loginModule',
                files: ['scripts/controllers/login/controller.js',
                        'scripts/directives/login/directive.js',
                        'styles/css/login/style.css',
                        'styles/css/login/res.css']
            },
            {
                name: 'navModule',
                files: ['scripts/controllers/top-nav/controller.js',
                        'scripts/directives/top-nav/directive.js',
                        'styles/css/top-nav/style.css',
                        'styles/css/top-nav/res.css']
            },
            {
                name: 'storylistsModule',
                files: ['scripts/controllers/storylists/controller.js',
                        'scripts/directives/storylists/directive.js',
                        'scripts/directives/search-box/directive.js',
                        'styles/css/search-box/style.css',
                        'styles/css/storylists/style.css',
                        'styles/css/storylists/res.css']
            },
            {
                name: 'readingModule',
                files: ['scripts/controllers/reading/controller.js',
                        'scripts/directives/reading/directive.js',
                        'scripts/directives/search-box/directive.js',
                        'styles/css/search-box/style.css',
                        'styles/css/reading/style.css',
                        'styles/css/reading/res.css']
            },
            {
                name: 'writingModule',
                files: ['scripts/controllers/writing/controller.js',
                        'scripts/directives/writing/directive.js',
                        'styles/css/writing/style.css',
                        'styles/css/writing/res.css']
            },
            {
                name: 'trackModule',
                files: ['scripts/controllers/track/controller.js',
                        'scripts/directives/track/directive.js',
                        'styles/css/track/style.css',
                        'styles/css/track/res.css']
            },
            {
                name: 'collectionModule',
                files: ['scripts/controllers/collection/controller.js',
                        'scripts/directives/collection/directive.js',
                        'styles/css/collection/style.css',
                        'styles/css/collection/res.css']
            },
            {
                name: 'homeModule',
                files: ['scripts/controllers/home/controller.js',
                        'scripts/directives/home/directive.js',
                        'styles/css/home/style.css',
                        'styles/css/home/res.css']
            },
            {
                name: 'settingModule',
                files: ['scripts/controllers/setting/controller.js',
                        'scripts/directives/setting/directive.js',
                        'styles/css/setting/style.css',
                        'styles/css/setting/res.css']
            }
        ],
    });
}]);

myApp.config(['$locationProvider', '$urlMatcherFactoryProvider', function ($locationProvider, $urlMatcherFactoryProvider) {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
}]);


myApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('storylists');
        $stateProvider
        .state('login', {
            // 该视图会使用下面resolve方法加载的控制器
            url: '',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            // 路由在“渲染”(render)之前会执行resolve对象中的这些方法(通常返回的都是promise对象）
            resolve: {
                loadLoginModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // 你可以动态(懒)加载已有的模块
                    return $ocLazyLoad.load('loginModule');
                }]
            }
        })
        .state('content', {
            url: '/',
            abstract: true,
            views: {
                "": {
                    templateUrl: 'layouts/content-layout.html'
                },
                "header@content": {
                    templateUrl: 'views/top-nav.html',
                    controller: 'navCtrl'
                }
            },
            resolve: {
                loadNavModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('navModule');
                }]
            }
        })
        .state('content.storylists', {
            url: 'storylists',
            views: {
                "body@content": {
                    templateUrl: 'views/storylists.html',
                    controller: 'storylistsCtrl'
                }
            },
            resolve: {
                loadStorylistsModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('storylistsModule');
                }]
            }
        })
        .state('content.reading', {
            url: 'reading',
            views: {
                "body@content": {
                    templateUrl: 'views/reading.html',
                    controller: 'readingCtrl'
                }
            },
            resolve: {
                loadreadingModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('readingModule');
                }]
            }
        })
        .state('content.writing', {
            url: 'writing',
            views: {
                "body@content": {
                    templateUrl: 'views/writing.html',
                    controller: 'writingCtrl'
                }
            },
            resolve: {
                loadwritingModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('writingModule');
                }]
            }
        })
        .state('content.track', {
            url: 'track',
            views: {
                "body@content": {
                    templateUrl: 'views/track.html',
                    controller: 'trackCtrl'
                }
            },
            resolve: {
                loadTrackModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('trackModule');
                }]
            }
        })
        .state('content.collection', {
            url: 'collection',
            views: {
                "body@content": {
                    templateUrl: 'views/collection.html',
                    controller: 'collectionCtrl'
                }
            },
            resolve: {
                loadCollectionModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('collectionModule');
                }]
            }
        })
        .state('content.home', {
            url: 'home',
            views: {
                "body@content": {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                }
            },
             resolve: {
                loadHomeModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('homeModule');
                }]
            }
        })
        .state('content.setting', {
            url: 'setting',
            views: {
                "body@content": {
                    templateUrl: 'views/setting.html',
                    controller: 'settingCtrl'
                },
                "body@content.setting": {
                    templateUrl: 'templates/setting/password.html'
                }
            },
            resolve: {
                loadSettingModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('settingModule');
                }]
            }
        })
        .state('content.setting.basic', {
            url: '',
            views: {
                "body@content.setting": {
                    templateUrl: 'templates/setting/basic.html'
                }
            }
        }).state('content.setting.data', {
            url: '',
            views: {
                "body@content.setting": {
                    templateUrl: 'templates/setting/data.html'
                }
            }
        }).state('content.setting.password', {
            url: '',
            views: {
                "body@content.setting": {
                    templateUrl: 'templates/setting/password.html'
                }
            }
        }).state('content.setting.account', {
            url: '',
            views: {
                "body@content.setting": {
                    templateUrl: 'templates/setting/account.html'
                }
            }
        });
    }
]);