angular.module('myApp.services', [])

// 文件读取（promise封装）
.factory('fileReaderService', ["$q", "$log", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply( function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply( function () {
                deferred.reject(reader.result);
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };

    return {
        readAsDataURL: readAsDataURL
    };
}])


// User model service
.factory('User', ['$http', function ($http) {
    function User () {

    };
    User.prototype = {
        load: function (id) {
            var scope = this;
            $http.get()
            .success(function(userData) {
                scope.setData(userData);
            });
        },
        delete: function () {
            $http.delete();
        },
        update: function() {
            $http.put();
        }
    };
    return User;
}])


// Article model service
.factory('Article', ['$http', function ($http) {
    function Article () {

    };
    Article.prototype = {
        load: function (id) {
            var scope = this;
            $http.get()
            .success(function(articleData) {
                scope.setData(articleData);
            });
        },
        delete: function () {
            $http.delete();
        },
        update: function() {
            $http.put();
        },
        getImageUrl: function(width, height) {
            return ;
        }
    };
    return article;
}]);