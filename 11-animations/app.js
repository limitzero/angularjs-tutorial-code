'use strict';

angular.module('tutorialApp', ['ngResource','ngAnimate'])
  .factory('Cart', function() {
    var items = [];
    return {
      getItems: function() {
        return items;
      },
      addArticle: function(article) {
        items.push(article);
      },
      sum: function() {
        return items.reduce(function(total, article) {
          return total + article.price;
        }, 0);
      }
    };
  })
  .factory('Article',["$resource",function($resource) {
    return $resource('articles.json', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }])
  .controller('ArticlesCtrl', function($scope, Article, Cart){
    $scope.cart = Cart;
    $scope.articles = Article.query();
  })
  .controller('CartCtrl', function($scope, Cart){
    $scope.cart = Cart;
  });
