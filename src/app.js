/**
姓名：谈裕锦
时间：2017.01.07
目的：新建ng-app模块，并对该模块进行一系列配置工作，包括：路由机制等。
*/

var myApp = angular.module("myApp", ['oc.lazyLoad', 'ui.router',
            'branchCtrls', 'branchDirectives', 'branchServices',
            'ngMessages', 'ngAnimate', 'ngRoute']);

// 动态加载控制器
myApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // $ocLazyLoad returns a promise that will be rejected when there is an error but if you set debug to true, $ocLazyLoad will also log all errors to the console.
        // debug: true,
        // $ocLazyLoad can broadcast an event when you load a module, a component or a file (js/css/template). It is disabled by default, set events to true to activate it. The events are ocLazyLoad.moduleLoaded, ocLazyLoad.moduleReloaded, ocLazyLoad.componentLoaded, ocLazyLoad.fileLoaded
        events: false,
        modules: [
            {
                name: 'loginModule',
                files: ['pages/login/js/login-controller.js',
                        'pages/login/css/style.css',
                        'pages/login/css/res.css']
            },
            {
                name: 'navModule',
                files: ['pages/top-nav/js/top-nav-controller.js',
                        'pages/top-nav/css/style.css',
                        'pages/top-nav/css/res.css']
            },
            {
                name: 'storylistsModule',
                files: ['pages/storylists/js/storylists-controller.js',
                        'components/search-box/css/style.css',
                        'pages/storylists/css/style.css',
                        'pages/storylists/css/res.css']
            },
            {
                name: 'readingModule',
                files: ['pages/Storylists/reading/js/reading-controller.js',
                        'pages/storylists/reading/css/style.css',
                        'pages/storylists/reading/css/res.css']
            },
            {
                name: 'writingModule',
                files: ['pages/writing/js/writing-controller.js',
                        'pages/writing/css/style.css',
                        'pages/writing/css/res.css']
            },
            {
                name: 'trackModule',
                files: ['pages/track/js/track-controller.js',
                        'pages/track/css/style.css',
                        'pages/track/css/res.css']
            },
            {
                name: 'collectionModule',
                files: ['pages/collection/js/collection-controller.js',
                        'pages/collection/css/style.css',
                        'pages/collection/css/res.css']
            },
            {
                name: 'settingModule',
                files: ['pages/setting/js/setting-controller.js',
                        'pages/setting/css/style.css',
                        'pages/setting/css/res.css']
            }
        ],
    });
}]);

myApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('signin');
        $stateProvider
        .state('login', {
            // 该视图会使用下面resolve方法加载的控制器
            url: '',
            templateUrl: 'pages/login/login.html',
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
                    templateUrl: 'pages/top-nav/top-nav.html',
                    controller: 'navCtrl'
                }
            },
            resolve: {
                loadNavModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('navModule');
                }]
            }
        })
        .state('content.signin', {
            url: 'signin',
            views: {
                "body@content": {
                    templateUrl: 'pages/storylists/storylists.html',
                    controller: 'storylistsCtrl',
                }
            },
            resolve: {
                loadStorylistsModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('storylistsModule');
                }]
            }
        })
        .state('content.storylists', {
            url: 'storylists',
            views: {
                "body@content": {
                    templateUrl: 'pages/storylists/storylists.html',
                    controller: 'storylistsCtrl',
                }
            },
            resolve: {
                loadStorylistsModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('storylistsModule');
                }]
            }
        })
        .state('content.storylists.reading', {
            url: '/reading',
            views: {
                "body@content": {
                    templateUrl: 'pages/storylists/reading/reading.html',
                    controller: 'readingCtrl',
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
                    templateUrl: 'pages/writing/writing.html',
                    controller: 'writingCtrl',
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
                    templateUrl: 'pages/track/track.html',
                    controller: 'trackCtrl',
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
                    templateUrl: 'pages/collection/collection.html',
                    controller: 'collectionCtrl',
                }
            },
            resolve: {
                loadCollectionModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('collectionModule');
                }]
            }
        })
        .state('content.setting', {
            url: 'setting',
            views: {
                "body@content": {
                    templateUrl: 'pages/setting/setting.html',
                    controller: 'settingCtrl',
                }
            },
            resolve: {
                loadSettingModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('settingModule');
                }]
            }
        });
    }
]);