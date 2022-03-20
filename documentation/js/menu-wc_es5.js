'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">back-social-network-api documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' : 'data-target="#xs-controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' : 'id="xs-controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AppController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' : 'data-target="#xs-injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' : 'id="xs-injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AppService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthModule.html\" data-type=\"entity-link\" >AuthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' : 'data-target="#xs-controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' : 'id="xs-controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AuthController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' : 'data-target="#xs-injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' : 'id="xs-injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/JwtRefreshTokenStrategy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >JwtRefreshTokenStrategy</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/LocalStrategy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LocalStrategy</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/FriendshipModule.html\" data-type=\"entity-link\" >FriendshipModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' : 'data-target="#xs-controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' : 'id="xs-controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/FriendshipController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FriendshipController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' : 'data-target="#xs-injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' : 'id="xs-injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/FriendshipService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FriendshipService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UserModule.html\" data-type=\"entity-link\" >UserModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' : 'data-target="#xs-controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' : 'id="xs-controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/UserController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' : 'data-target="#xs-injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' : 'id="xs-injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#entities-links"' : 'data-target="#xs-entities-links"', ">\n                                <span class=\"icon ion-ios-apps\"></span>\n                                <span>Entities</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"entities/Friendship.html\" data-type=\"entity-link\" >Friendship</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"entities/FriendshipRequest.html\" data-type=\"entity-link\" >FriendshipRequest</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"entities/User.html\" data-type=\"entity-link\" >User</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/AcceptFriendshipRequestCommand.html\" data-type=\"entity-link\" >AcceptFriendshipRequestCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AcceptFriendshipRequestEvent.html\" data-type=\"entity-link\" >AcceptFriendshipRequestEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AcceptFriendshipRequestEventHandler.html\" data-type=\"entity-link\" >AcceptFriendshipRequestEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AcceptFriendshipRequestHandler.html\" data-type=\"entity-link\" >AcceptFriendshipRequestHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CancelFriendshipRequestCommand.html\" data-type=\"entity-link\" >CancelFriendshipRequestCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CancelFriendshipRequestEvent.html\" data-type=\"entity-link\" >CancelFriendshipRequestEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CancelFriendshipRequestEventHandler.html\" data-type=\"entity-link\" >CancelFriendshipRequestEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CancelFriendshipRequestHandler.html\" data-type=\"entity-link\" >CancelFriendshipRequestHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DeleteUserCommand.html\" data-type=\"entity-link\" >DeleteUserCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DeleteUserHandler.html\" data-type=\"entity-link\" >DeleteUserHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ErrorEventHandler.html\" data-type=\"entity-link\" >ErrorEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ErrorsEvent.html\" data-type=\"entity-link\" >ErrorsEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FriendshipDto.html\" data-type=\"entity-link\" >FriendshipDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FriendshipRequestDto.html\" data-type=\"entity-link\" >FriendshipRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetReceivedFriendshipHandler.html\" data-type=\"entity-link\" >GetReceivedFriendshipHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetReceivedFriendshipRequestQuery.html\" data-type=\"entity-link\" >GetReceivedFriendshipRequestQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetSentFriendshipRequestHandler.html\" data-type=\"entity-link\" >GetSentFriendshipRequestHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetSentFriendshipRequestQuery.html\" data-type=\"entity-link\" >GetSentFriendshipRequestQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetStatusFriendshipHandler.html\" data-type=\"entity-link\" >GetStatusFriendshipHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetStatusFriendshipQuery.html\" data-type=\"entity-link\" >GetStatusFriendshipQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetUserHandler.html\" data-type=\"entity-link\" >GetUserHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetUserIfRefreshTokenMatchesHandler.html\" data-type=\"entity-link\" >GetUserIfRefreshTokenMatchesHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetUserIfRefreshTokenMatchesQuery.html\" data-type=\"entity-link\" >GetUserIfRefreshTokenMatchesQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetUserQuery.html\" data-type=\"entity-link\" >GetUserQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RegisterCommand.html\" data-type=\"entity-link\" >RegisterCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RegisterHandler.html\" data-type=\"entity-link\" >RegisterHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RemoveFriendshipCommand.html\" data-type=\"entity-link\" >RemoveFriendshipCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RemoveFriendshipEvent.html\" data-type=\"entity-link\" >RemoveFriendshipEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RemoveFriendshipEventHandler.html\" data-type=\"entity-link\" >RemoveFriendshipEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RemoveFriendshipHandler.html\" data-type=\"entity-link\" >RemoveFriendshipHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RemoveRefreshTokenCommand.html\" data-type=\"entity-link\" >RemoveRefreshTokenCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RemoveRefreshTokenHandler.html\" data-type=\"entity-link\" >RemoveRefreshTokenHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SendFriendshipRequestCommand.html\" data-type=\"entity-link\" >SendFriendshipRequestCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SendFriendshipRequestEvent.html\" data-type=\"entity-link\" >SendFriendshipRequestEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SendFriendshipRequestEventHandler.html\" data-type=\"entity-link\" >SendFriendshipRequestEventHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SendFriendshipRequestHandler.html\" data-type=\"entity-link\" >SendFriendshipRequestHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SetCurrentRefreshTokenCommand.html\" data-type=\"entity-link\" >SetCurrentRefreshTokenCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SetCurrentRefreshTokenHandler.html\" data-type=\"entity-link\" >SetCurrentRefreshTokenHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SignInDto.html\" data-type=\"entity-link\" >SignInDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SignUpDto.html\" data-type=\"entity-link\" >SignUpDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateUserCommand.html\" data-type=\"entity-link\" >UpdateUserCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateUserDto.html\" data-type=\"entity-link\" >UpdateUserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateUserHandler.html\" data-type=\"entity-link\" >UpdateUserHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UserDto.html\" data-type=\"entity-link\" >UserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UserListResponse.html\" data-type=\"entity-link\" >UserListResponse</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UserRepositoryMock.html\" data-type=\"entity-link\" >UserRepositoryMock</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UserResponse.html\" data-type=\"entity-link\" >UserResponse</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/JwtAuthenticationGuard.html\" data-type=\"entity-link\" >JwtAuthenticationGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/JwtRefreshGuard.html\" data-type=\"entity-link\" >JwtRefreshGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/JwtStrategy.html\" data-type=\"entity-link\" >JwtStrategy</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LocalAuthenticationGuard.html\" data-type=\"entity-link\" >LocalAuthenticationGuard</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/RequestUser.html\" data-type=\"entity-link\" >RequestUser</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TokenPayload.html\" data-type=\"entity-link\" >TokenPayload</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));