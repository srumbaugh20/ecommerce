angular.module('templatescache', []).run(['$templateCache', function($templateCache) {$templateCache.put('./app/about.html','<section class="lede section--padding-both">\r\n    <div class="container">\r\n        <p>Hello From the About Page</p>\r\n    </div>\r\n</section>\r\n\r\n');
$templateCache.put('./app/contact.html','<section class="lede section--padding-both">\r\n    <div class="container">\r\n        <p>Hello From the Contact Page</p>\r\n    </div>\r\n</section>\r\n');
$templateCache.put('./app/home.html','HOME PAGE HERE\r\n');
$templateCache.put('./app/temple-page.html','<!-- individul temple pages -->\r\n<div class="individualtemples">\r\n  <img src="{{singletemple.imageurl}}" />\r\n  <div class="templename">\r\n    {{singletemple.name}}\r\n\r\n  </div>\r\n</div>\r\n');
$templateCache.put('./app/temple-tmpl.html','<!-- loads all temples using ng-repeat -->\r\n\r\n  <div>\r\n\r\n  <div class="individualtemples">\r\n    <img src="{{temple.imageurl}}" ui-sref=\'templedetails({id:temple.id})\' />\r\n    <div class="templename">\r\n      {{temple.name}}\r\n\r\n    </div>\r\n </div>\r\n\r\n\r\n\r\n  </div>\r\n');
$templateCache.put('./app/temples.html','<!-- temple art page -->\r\n<div class="templegrid" >\r\n<div ng-repeat= \'temple in temples\'>\r\n\r\n\r\n        <directive></directive>\r\n</div>\r\n</div>\r\n');}]);