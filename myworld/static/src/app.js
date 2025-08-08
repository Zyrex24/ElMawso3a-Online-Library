// ElMawso3a Frontend App - AngularJS 1.8.x
(function() {
    'use strict';
    
    // Initialize AngularJS app
    var app = angular.module('elmawso3aApp', []);
    
    // Language service
    app.service('LanguageService', function() {
        var currentLang = localStorage.getItem('language') || 'en';
        
        this.getCurrentLanguage = function() {
            return currentLang;
        };
        
        this.setLanguage = function(lang) {
            currentLang = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.body.className = document.body.className.replace(/\blang-\w+\b/g, '') + ' lang-' + lang;
        };
        
        this.toggleLanguage = function() {
            var newLang = currentLang === 'en' ? 'ar' : 'en';
            this.setLanguage(newLang);
            return newLang;
        };
    });
    
    // Main controller
    app.controller('MainController', ['$scope', 'LanguageService', function($scope, LanguageService) {
        $scope.currentLang = LanguageService.getCurrentLanguage();
        
        $scope.toggleLanguage = function() {
            $scope.currentLang = LanguageService.toggleLanguage();
            // Reload page to apply language changes
            window.location.reload();
        };
        
        // Initialize language on load
        LanguageService.setLanguage($scope.currentLang);
    }]);
    
    // Search controller
    app.controller('SearchController', ['$scope', function($scope) {
        $scope.searchQuery = '';
        $scope.searchCategory = 'title';
        
        $scope.performSearch = function() {
            if ($scope.searchQuery.trim()) {
                var url = '/books/?search_query=' + encodeURIComponent($scope.searchQuery) + 
                         '&search_category=' + encodeURIComponent($scope.searchCategory);
                window.location.href = url;
            }
        };
    }]);
    
    // Cart controller
    app.controller('CartController', ['$scope', '$http', function($scope, $http) {
        $scope.cartItems = [];
        $scope.loading = false;
        
        $scope.addToCart = function(bookId) {
            $scope.loading = true;
            
            // Use Django's CSRF token
            var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            
            $http({
                method: 'POST',
                url: '/add-to-cart/',
                data: 'book_id=' + bookId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken
                }
            }).then(function(response) {
                $scope.loading = false;
                // Show success message or update UI
                alert('Book added to cart successfully!');
            }).catch(function(error) {
                $scope.loading = false;
                alert('Error adding book to cart');
            });
        };
        
        $scope.clearCart = function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                $scope.loading = true;
                
                var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                
                $http({
                    method: 'POST',
                    url: '/clear-cart/',
                    headers: {
                        'X-CSRFToken': csrfToken
                    }
                }).then(function(response) {
                    $scope.loading = false;
                    window.location.reload();
                }).catch(function(error) {
                    $scope.loading = false;
                    alert('Error clearing cart');
                });
            }
        };
    }]);
    
    // Admin controller
    app.controller('AdminController', ['$scope', function($scope) {
        $scope.sidebarOpen = true;
        
        $scope.toggleSidebar = function() {
            $scope.sidebarOpen = !$scope.sidebarOpen;
        };
        
        $scope.confirmDelete = function(itemType, itemName) {
            return confirm('Are you sure you want to delete this ' + itemType + ': ' + itemName + '?');
        };
    }]);
    
    // Directives
    app.directive('focusOn', function() {
        return function(scope, elem, attr) {
            scope.$on(attr.focusOn, function(e) {
                elem[0].focus();
            });
        };
    });
    
    // Initialize on DOM ready
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['elmawso3aApp']);
    });
    
})();

// Vanilla JS for immediate functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Form validation enhancements
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
