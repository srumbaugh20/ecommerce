angular.module('templatescache', []).run(['$templateCache', function($templateCache) {$templateCache.put('./app/about.html','<div>\r\n\r\n\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="about">My Story</a></li>\r\n</ul>\r\n\r\n<div class="divider"></div>\r\n\r\n<div class="about-three-photos-top" style="margin-left: 5%">\r\n    <div class="about-photo1"></div>\r\n    <div class="about-photo2"></div>\r\n    <div class="about-photo3"></div>\r\n  </div>\r\n\r\n<section class="lede section--padding-both">\r\n    <div class="aboutcontainer">\r\n        <p>\r\n        As a child, I was always in love with drawing and color. My only memory of kindergarten is the smell of new crayons and giant easels with pots of paint to play with. As a young girl, I spent hours designing gowns on paper. In 6th grade, I had the opportunity to paint a life size mural with five other students at a special needs school, which still stands today. In high school I secretly dawdled my time away drawing portraits of other students which my classmates would buy for 25\xA2 each! As a young mother I became mesmerized by watercolor and was determined to learn how to paint in that medium. I kept dreaming of this while raising 5 daughters. In 2004 I had a beautiful experience which prompted me to go forward with this dream, and I was promised I would be blessed as I shared my talents. This was overwhelming, as I had no idea how to go about it! After asking for divine guidance, I sat down not even knowing what to paint and a miracle happened- it began to \u201Cmagically\u2019 flow in the form of flowers, a passion of mine. I began to share these pictures with many friends.\r\n      </p> <b></b>\r\n\r\n      <p>\r\n      Soon after, my 51 year old husband was suddenly diagnosed with terminal cancer. As I cared for him the next 2 years I was emotionally unable to paint, which continued 3 more years as I grieved and cared for my 10 year old son. About that time a very dear friend challenged me to paint the temples, to which I promptly replied I wasn\u2019t capable or qualified to do! However, I again petitioned the heavens to teach me and \u201Cguide\u201D my brush. In December 2007, I very timidly began. The result has been the great blessing of beginning to heal from grief and loss through art. I remembered the promise that \u201CI would be blessed\u201D!</p> <b></b>\r\n\r\n      <p>\r\n      Today, my only \u201Ctraining\u201D continues in the form of asking for guidance each time I paint. Each painting truly comes from my heart. The same friend that challenged me to paint the temples challenges me to paint them as fast as the prophet builds them! I secretly wish I could visit every one! My goal is to paint every temple with the hope that they will be a blessing to all I am able to share them with.\r\n    </p> <b></b>\r\n      <p>\r\n\r\n      </p>\r\n      <p>\r\n        Debbie Russell-Walsch </p>\r\n    </div>\r\n</section>\r\n\r\n<div class="about-three-photos-bottom" style="margin-right: 5%">\r\n    <div class="about-photo4"></div>\r\n    <div class="about-photo5"></div>\r\n    <div class="about-photo6"></div>\r\n  </div>\r\n');
$templateCache.put('./app/cart.html','<div style="font-family: \'Montserrat\'; color: #29388A;">\r\n\r\n\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="cart">Cart</a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n<h2 style="margin-left:15px;">Shopping Cart</h2>\r\n<div style="margin-left:15px; margin-right: 15px;">\r\n    <table class="table">\r\n        <tr>\r\n            <th>Image</th>\r\n            <th>Name</th>\r\n            <th>Description</th>\r\n            <th>Size</th>\r\n            <th>Qty</th>\r\n            <th>Cost</th>\r\n            <th>Total</th>\r\n            <th></th>\r\n        </tr>\r\n        <tr ng:repeat="item in cart track by $index">\r\n          <td>\r\n            <img src="{{item.image}}" style="width:73.1px; height:100px"/>\r\n          </td>\r\n          <td style="font-weight: bold;">\r\n            {{item.name}}\r\n          </td>\r\n            <td>\r\n              {{item.descript}}\r\n            </td>\r\n            <td>\r\n              {{item.size.size}}\r\n            </td>\r\n            <td><input type="number" ng-change="quantityupdate($index)" ng:model="item.quantity" ng:required class="input-mini" min="1"></td>\r\n            <td>\r\n              {{item.size.price | currency}}\r\n            </td>\r\n            <td>{{item.quantity * item.size.price | currency}}</td>\r\n            <td><button class="btn btn-primary" ng-click="remove($index)">Remove</button>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td><b>Flat-rate shipping:</b></td>\r\n            <td>$3</td>\r\n            <td></td>\r\n        </tr>\r\n        <tr>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td><p ng-show="showMessage">{{msg}}</p></td>\r\n            <td><b>Total:</b></td>\r\n            <td>{{grandtotal | currency}}</td>\r\n            <td><button class="btn btn-primary" ui-sref="checkout">Checkout</button>\r\n        </tr>\r\n    </table>\r\n</div>\r\n</div>\r\n');
$templateCache.put('./app/checkout.html','\r\n<div style="font-family: \'Montserrat\'; color: #29388A;">\r\n\r\n\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="cart">Cart</a></li>\r\n  <li><a ui-sref="checkout">Checkout</a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n<h2 style="margin-left:15px;">Checkout</h2>\r\n<div style="margin-left:15px; margin-right: 15px;">\r\n    <table class="table">\r\n        <tr>\r\n            <th>Image</th>\r\n            <th>Name</th>\r\n            <th>Description</th>\r\n            <th>Size</th>\r\n            <th>Qty</th>\r\n            <th>Cost</th>\r\n            <th>Total</th>\r\n            <th></th>\r\n        </tr>\r\n        <tr ng:repeat="item in cart track by $index">\r\n          <td>\r\n            <img src="{{item.image}}" style="width:73.1px; height:100px"/>\r\n          </td>\r\n          <td style="font-weight: bold;">\r\n            {{item.name}}\r\n          </td>\r\n            <td>\r\n              {{item.descript}}\r\n            </td>\r\n            <td>\r\n              {{item.size.size}}\r\n            </td>\r\n            <td>{{item.quantity}}</td>\r\n            <td>\r\n              {{item.size.price | currency}}\r\n            </td>\r\n            <td>{{item.quantity * item.size.price | currency}}</td>\r\n\r\n\r\n        </tr>\r\n        <tr>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td><b>Flat-rate shipping:</b></td>\r\n            <td>$3</td>\r\n        </tr>\r\n        <tr>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td><b>Total:</b></td>\r\n            <td>{{grandtotal | currency}}</td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n\r\n<div style="width:80%; margin-left: auto; margin-right: auto;">\r\n  <form ng-submit="charge()" id="payment_form" style="margin-right: 15px;">\r\n      <div class="form-container">\r\n        <div class="personal-information" style="margin-bottom: 15px;">\r\n        <h1 >Shipping Information</h1>\r\n        </div> <!-- end of personal-information -->\r\n        <input id="input-field" type="text" name="name" ng-model="payment.name" required="required" autocomplete="on" maxlength="45" placeholder="Name"/>\r\n        <input id="input-field" type="text" name="streetaddress" ng-model="payment.address" required="required" autocomplete="on" maxlength="45" placeholder="Streed Address"/>\r\n        <input id="column-left" type="text" name="city" ng-model="payment.city" required="required" autocomplete="on" maxlength="20" placeholder="City"/>\r\n        <select id="column-right" required="required" ng-model="payment.state" style="border-color: #ededf0; height: 58px; margin-right: 30px; ">\r\n            <option value="" disabled>Select state</option>\r\n            <option value="AL">Alabama</option>\r\n            <option value="AK">Alaska</option>\r\n            <option value="AZ">Arizona</option>\r\n            <option value="AR">Arkansas</option>\r\n            <option value="CA">California</option>\r\n            <option value="CO">Colorado</option>\r\n            <option value="CT">Connecticut</option>\r\n            <option value="DE">Delaware</option>\r\n            <option value="DC">District Of Columbia</option>\r\n            <option value="FL">Florida</option>\r\n            <option value="GA">Georgia</option>\r\n            <option value="HI">Hawaii</option>\r\n            <option value="ID">Idaho</option>\r\n            <option value="IL">Illinois</option>\r\n            <option value="IN">Indiana</option>\r\n            <option value="IA">Iowa</option>\r\n            <option value="KS">Kansas</option>\r\n            <option value="KY">Kentucky</option>\r\n            <option value="LA">Louisiana</option>\r\n            <option value="ME">Maine</option>\r\n            <option value="MD">Maryland</option>\r\n            <option value="MA">Massachusetts</option>\r\n            <option value="MI">Michigan</option>\r\n            <option value="MN">Minnesota</option>\r\n            <option value="MS">Mississippi</option>\r\n            <option value="MO">Missouri</option>\r\n            <option value="MT">Montana</option>\r\n            <option value="NE">Nebraska</option>\r\n            <option value="NV">Nevada</option>\r\n            <option value="NH">New Hampshire</option>\r\n            <option value="NJ">New Jersey</option>\r\n            <option value="NM">New Mexico</option>\r\n            <option value="NY">New York</option>\r\n            <option value="NC">North Carolina</option>\r\n            <option value="ND">North Dakota</option>\r\n            <option value="OH">Ohio</option>\r\n            <option value="OK">Oklahoma</option>\r\n            <option value="OR">Oregon</option>\r\n            <option value="PA">Pennsylvania</option>\r\n            <option value="RI">Rhode Island</option>\r\n            <option value="SC">South Carolina</option>\r\n            <option value="SD">South Dakota</option>\r\n            <option value="TN">Tennessee</option>\r\n            <option value="TX">Texas</option>\r\n            <option value="UT">Utah</option>\r\n            <option value="VT">Vermont</option>\r\n            <option value="VA">Virginia</option>\r\n            <option value="WA">Washington</option>\r\n            <option value="WV">West Virginia</option>\r\n            <option value="WI">Wisconsin</option>\r\n            <option value="WY">Wyoming</option>\r\n        </select>\r\n        <input id="input-field" type="text" name="zipcode" ng-model="payment.zipcode" required="required" autocomplete="on" pattern="[0-9]*" maxlength="5" placeholder="ZIP code"/>\r\n        <input id="input-field" type="email" name="email" ng-model="payment.email" required="required" autocomplete="on" maxlength="40" placeholder="Email"/>\r\n\r\n          <!-- <div class="card-wrapper"></div> -->\r\n          <div class="personal-information" style="margin-bottom: 15px;">\r\n            <h1 >Payment Information</h1>\r\n          </div>\r\n            <input id="column-left" type="text" name="first-name" placeholder="First Name" required="required"/>\r\n            <input id="column-right" type="text" name="last-name" placeholder="Last Name" required="required"/>\r\n            <input id="input-field" type="text" name="number" ng-model="payment.card.number" placeholder="Card Number" required="required"/>\r\n            <div>\r\n            <input id="column-left" type="text" name="expiry" ng-model="payment.card.exp_month" placeholder="MM" required="required">\r\n            <input id="column-left" type="text" name="expiry" ng-model="payment.card.exp_year" placeholder="YY" required="required">\r\n            </div>\r\n            <input id="column-left" type="text" name="cvc" placeholder="CCV" required="required"/>\r\n            <input id="input-button" type="submit" value="Submit" style="font-family: \'Montserrat\'; " required="required"/>\r\n    </form>\r\n</div>\r\n\r\n\r\n\r\n\r\n</div>\r\n');
$templateCache.put('./app/confirmed.html','');
$templateCache.put('./app/contact.html','<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="contact">Contact</a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n\r\n<div class="aboutcontainer">\r\n    <p>Feel free to contact me about any question or comment that you have. I\'m also willing to fulfill special orders or requests.</p>\r\n    <br>\r\n    <p> {{contact.name}} </p><b></b>\r\n    <p> {{contact.line_1}} </p><b></b>\r\n    <p> {{contact.line_2}} </p><b></b>\r\n    <p> {{contact.email}} </p><b></b>\r\n    <p> Tel: {{contact.phone}} </p><b></b>\r\n</div>\r\n');
$templateCache.put('./app/header.html','<div ng-controller="headerCtrl">\r\n  <div class="logoheader" style="margin-left:10%">\r\n  <div class="logodiv">\r\n      <div class="logoimage">\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <div class="menucontainer" >\r\n    <div class="menubar">\r\n      <a class="menu-links" ui-sref="home">Home</a>\r\n      <a class="menu-links" style="margin-left:15px; " ui-sref="watercolors">Watercolors</a>\r\n      <a class="menu-links" style="margin-left:15px; " ui-sref="temples">Temple Art</a>\r\n      <a class="menu-links" style="margin-left:15px; " ui-sref="about">My Story</a>\r\n      <a class="menu-links" style="margin-left:15px; " ui-sref="contact">Contact</a>\r\n\r\n    </div>\r\n  </div>\r\n  <div class="cartcontainer" ui-sref="cart" style="margin-bottom:15px;">\r\n    <a class="menu-links" ui-sref="cart" ng-model ng-cloak> Cart {{cartnumber}} </a>\r\n    <div class="cartIcon"></div>\r\n  </div>\r\n  </div>\r\n');
$templateCache.put('./app/home.html','<div class="divider" style="margin-top: 30px"></div>\r\n\r\n<div class="homeheader"></div>\r\n\r\n<!-- <div class="threeimages">\r\n    <div class="box1"></div>\r\n    <div class="box2"></div>\r\n    <div class="box3"></div>\r\n</div> -->\r\n\r\n\r\n\r\n<div class="media" style="width: 33.33%; height: 33vh; display: inline-block; float: left; background: url(/images/box1.jpg); background-repeat: no-repeat;background-size: cover;\tbackground-position: center center;">\r\n  <div class="media__body" ui-sref="watercolors">\r\n    <h1>Watercolors</h1>\r\n    <p style="font-size: 12px;">Click here to see all of Debbie\'s watercolor paintings inspired by the world around her</p>\r\n  </div>\r\n</div>\r\n<div class="media" style="width: 33.33%; height: 33vh; display: inline-block; float: left; background: url(/images/box2.jpg); background-repeat: no-repeat; background-size: cover;\tbackground-position: center center;">\r\n  <div class="media__body" ui-sref="temples">\r\n    <h1 style="line-height: 100%">LDS Temple Paintings</h1>\r\n    <p style="font-size: 12px;">Click here to see all of Debbie\'s watercolor paintings of LDS temples from around the world</p>\r\n  </div>\r\n</div>\r\n<div class="media" style="width: 33.34%; height: 33vh; display: inline-block; float: left; background: url(/images/box3.jpg); background-repeat: no-repeat;background-size: cover;\tbackground-position: center center;">\r\n  <div class="media__body" ui-sref="about">\r\n    <h1>My Story</h1>\r\n    <p style="font-size: 12px;">Click here to learm more about Debbie and what inspires her</p>\r\n  </div>\r\n</div>\r\n');
$templateCache.put('./app/loginModalTemplate.html','<div>\r\n  <form ng-submit="LoginModalCtrl.submit(_email, _password)">\r\n    <input type="email" ng-model="_email" />\r\n    <input type="password" ng-model="_password" />\r\n    <button>Submit</button>\r\n  </form>\r\n  <button ng-click="LoginModalCtrl.cancel()">Cancel</button>\r\n</div>\r\n');
$templateCache.put('./app/orders.html','<div style="font-family: \'Montserrat\'; color: #29388A; width:100%; margin-right: 15px;">\r\n\r\n  <ul class="breadcrumb">\r\n    <li><a ui-sref="home">Home</a></li>\r\n    <li><a ui-sref="orders">Orders</a></li>\r\n  </ul>\r\n\r\n  <div class="divider"></div>\r\n\r\n  <h2 style="margin: 15px;">ORDERS</h2>\r\n\r\n  <div class="orderdiv">\r\n    <div class="orderbox" ng-repeat="item in orders track by $index">\r\n      <div style="float: left; margin-right: 15px; margin-bottom:15px;">\r\n        <p><b>Order number: </b>{{item.id}}</p>\r\n        <p><b>Name: </b>{{item.name}}</p>\r\n        <p><b>Email: </b>{{item.email}}</p>\r\n        <p><b>Address: </b>{{item.address}}</p>\r\n        <p><b>Amount paid: </b>{{item.amount_paid | currency}}</p>\r\n\r\n        <button class="btn" ng-click="remove($index)">Delete</button>\r\n      </div>\r\n      <div  ng-repeat="stuff in item.cart " style="display: inline-block; width:auto; float: left; margin-right: 15px;">\r\n        <img src="{{stuff.image}}" class="orderpic"/>\r\n        <div style="float:left;">\r\n          <ul>\r\n            <li>Name: {{stuff.name}}</li>\r\n            <li>Size: {{stuff.size.size}}</li>\r\n            <li>Quantity: {{stuff.quantity}}</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n');
$templateCache.put('./app/temple-page.html','<!-- individul temple pages -->\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="temples">Temple Art</a></li>\r\n  <li style="font-size:16px;"><a> {{singleitem.name}} </a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n\r\n<div class="templedetails">\r\n\r\n  <div class="itemdetails">\r\n      <div class="templename">\r\n        <p style="font-size: 35px; margin-bottom: 15px; line-height: 100%;">\r\n        {{singleitem.name}}\r\n        </p>\r\n        <b></b>\r\n        <p style="margin-bottom: 15px;">\r\n        {{singleitem.descript}}\r\n        </p>\r\n        <b></b>\r\n        <p>\r\n        {{price}}\r\n        </p>\r\n      </div>\r\n      <div class="orderoptions">\r\n\r\n          <select placeholder="Select Size" class="itemsizeselector" ng-options="size.size for size in sizes track by size.price" ng-model="size_option" ng-change="select_size()">\r\n            <option value="" disabled>Select size</option>\r\n          </select>\r\n          <form class="quantityoption">\r\n          Quantity:\r\n          <input type="number" name="points" min="1" max="100" step="1" value="1" ng-model="quantity">\r\n          </form>\r\n      </div>\r\n      <div style="height: 25px;">\r\n        <p class="templename" ng-show="showMessage" style="margin-bottom:15px;">\r\n          {{msg}}\r\n        </p>\r\n      </div>\r\n      <button class="addtocartbutton" ng-click="addtocart();">Add to cart</button>\r\n      <div style="margin-left: 15px; margin-top: 30px;">\r\n        <p style="margin-bottom:5px; font-family: \'Montserrat\'; font-size: 16px; color: #29388A; width:100%;"><b>Share this</b></p>\r\n        <div class="social2">\r\n          <a class="FB2" href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com"></a>\r\n          <!-- <a class="IG2"></a> -->\r\n          <a class="PN2" href="javascript:void((function()%7Bvar%20e=document.createElement(\'script\');e.setAttribute(\'type\',\'text/javascript\');e.setAttribute(\'charset\',\'UTF-8\');e.setAttribute(\'src\',\'http://assets.pinterest.com/js/pinmarklet.js?r=\'+Math.random()*99999999);document.body.appendChild(e)%7D)());"></a>\r\n        </div>\r\n      </div>\r\n  </div>\r\n\r\n    <img src="{{singleitem.imageurl}}" class="individualtemplesimage"/>\r\n\r\n\r\n</div>\r\n');
$templateCache.put('./app/temple-tmpl.html','<!-- loads all temples using ng-repeat -->\r\n\r\n  <div class="individualtemples">\r\n\r\n  <div>\r\n    <img src="{{temple.imageurl}}" class="templeimage" ui-sref=\'templedetails({id:temple.id})\' />\r\n    <div class="templename" ui-sref=\'templedetails({id:temple.id})\'>\r\n      <b>{{temple.name }}</b>\r\n\r\n    </div>\r\n </div>\r\n\r\n\r\n\r\n  </div>\r\n');
$templateCache.put('./app/temples.html','<!-- temple art page -->\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="temples">Temple Art</a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n\r\n<input class="filter-input" ng-model="byName" placeholder="Filter by temple name"/>\r\n<div class="scrollbox">\r\n  <div class="imageheadercontainer">\r\n    <div class="imageheader"></div>\r\n  </div>\r\n<div class="templediv" >\r\n<div ng-repeat= \'temple in temples | filter: byName\'>\r\n\r\n        <directive></directive>\r\n</div>\r\n</div>\r\n</div>\r\n');
$templateCache.put('./app/watercolor-page.html','<!-- individul temple pages -->\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="watercolors">Watercolors</a></li>\r\n  <li style="font-size:16px;"><a> {{singleitem.name}} </a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n\r\n<div class="templedetails">\r\n\r\n<div class="itemdetails">\r\n    <div class="templename">\r\n      <p style="font-size: 35px; margin-bottom: 15px; line-height: 100%;">\r\n      {{singleitem.name}}\r\n      </p>\r\n      <b></b>\r\n      <p style="margin-bottom: 15px;">\r\n      {{singleitem.descript}}\r\n      </p>\r\n      <b></b>\r\n      <p>\r\n      {{price}}\r\n      </p>\r\n    </div>\r\n    <div class="orderoptions">\r\n\r\n        <select placeholder="Select Size" class="itemsizeselector" ng-options="size.size for size in sizes track by size.price" ng-model="size_option" ng-change="select_size()">\r\n          <option value="" disabled>Select size</option>\r\n        </select>\r\n        <form class="quantityoption">\r\n        Quantity:\r\n        <input type="number" name="points" min="1" max="100" step="1" value="1" ng-model="quantity">\r\n        </form>\r\n    </div>\r\n    <div style="height: 25px;">\r\n      <p class="templename" ng-show="showMessage" style="margin-bottom:15px;">\r\n        {{msg}}\r\n      </p>\r\n    </div>\r\n    <button class="addtocartbutton" ng-click="addtocart();">Add to cart</button>\r\n    <div style="margin-left: 15px; margin-top: 30px;">\r\n      <p style="margin-bottom:5px; font-family: \'Montserrat\'; font-size: 16px; color: #29388A; width:100%;"><b>Share this</b></p>\r\n      <div class="social2">\r\n        <a class="FB2" href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com"></a>\r\n        <!-- <a class="IG2"></a> -->\r\n        <a class="PN2" href="javascript:void((function()%7Bvar%20e=document.createElement(\'script\');e.setAttribute(\'type\',\'text/javascript\');e.setAttribute(\'charset\',\'UTF-8\');e.setAttribute(\'src\',\'http://assets.pinterest.com/js/pinmarklet.js?r=\'+Math.random()*99999999);document.body.appendChild(e)%7D)());"></a>\r\n      </div>\r\n    </div>\r\n</div>\r\n\r\n  <img src="{{singleitem.imageurl}}" class="individualtemplesimage"/>\r\n\r\n\r\n</div>\r\n');
$templateCache.put('./app/watercolors-tmpl.html','<!-- loads all temples using ng-repeat -->\r\n\r\n  <div class="individualtemples">\r\n\r\n  <div>\r\n    <img src="{{watercolor.imageurl}}" class="templeimage" ui-sref=\'watercolordetails({id:watercolor.id})\' />\r\n    <div class="templename" style="margin-bottom: 15px;" ui-sref=\'watercolordetails({id:watercolor.id})\'>\r\n      {{watercolor.name}}\r\n\r\n    </div>\r\n </div>\r\n\r\n\r\n\r\n  </div>\r\n');
$templateCache.put('./app/watercolors.html','<!-- watercolors art page -->\r\n<ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="watercolors">Watercolors</a></li>\r\n</ul>\r\n<div class="divider"></div>\r\n\r\n<div class="scrollbox">\r\n  <div class="imageheadercontainer">\r\n    <div class="imageheader2"></div>\r\n  </div>\r\n<div class="templediv" >\r\n<div ng-repeat= \'watercolor in watercolors\'>\r\n\r\n        <waterdirective></waterdirective>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<!-- <ul class="breadcrumb">\r\n  <li><a ui-sref="home">Home</a></li>\r\n  <li><a ui-sref="temples">Temple Art</a></li>\r\n</ul>\r\n<div class="scrollbox">\r\n<div class="templediv" >\r\n<div ng-repeat= \'temple in temples\'>\r\n\r\n\r\n        <directive></directive>\r\n</div>\r\n</div>\r\n</div> -->\r\n');}]);