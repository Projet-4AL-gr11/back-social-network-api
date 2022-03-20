'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back-social-network-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' : 'data-target="#xs-controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' :
                                            'id="xs-controllers-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' : 'data-target="#xs-injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' :
                                        'id="xs-injectables-links-module-AppModule-6164d259b70f0573616e345b442988b20a7d6f0a8dd45cb6e958166d1c958100de5531f3476559828a14f47faef493c774774da4a313e4b4cf53b7c839618c05"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' : 'data-target="#xs-controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' :
                                            'id="xs-controllers-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' : 'data-target="#xs-injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' :
                                        'id="xs-injectables-links-module-AuthModule-3fa5959e240a6426e1d535deea7a274f93a96be78d33aab2245b2b981f5eebea8e094525b7652ed05a22679ef6a6a2689aab49db35ecb62ee6c5fec4e71443c3"' }>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FriendshipModule.html" data-type="entity-link" >FriendshipModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' : 'data-target="#xs-controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' :
                                            'id="xs-controllers-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' }>
                                            <li class="link">
                                                <a href="controllers/FriendshipController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FriendshipController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' : 'data-target="#xs-injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' :
                                        'id="xs-injectables-links-module-FriendshipModule-1e41bda8b692114e397a203518863eb384b399e6cf38d529504693e1180e1a5c3d4d73f0e5cf4be18696b59ba70a9fd63c1f96f9e330fab82ed0afa4a94f8605"' }>
                                        <li class="link">
                                            <a href="injectables/FriendshipService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FriendshipService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' : 'data-target="#xs-controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' :
                                            'id="xs-controllers-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' : 'data-target="#xs-injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' :
                                        'id="xs-injectables-links-module-UserModule-f74d206c7c8bbc40a2c69643cf5b31d82e75741f4cde4b9af45798871580fc987b746e811ad6a6441564fa73e857f036a3dd4efedfd8d049c30d5c1553ff8075"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Friendship.html" data-type="entity-link" >Friendship</a>
                                </li>
                                <li class="link">
                                    <a href="entities/FriendshipRequest.html" data-type="entity-link" >FriendshipRequest</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AcceptFriendshipRequestCommand.html" data-type="entity-link" >AcceptFriendshipRequestCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/AcceptFriendshipRequestEvent.html" data-type="entity-link" >AcceptFriendshipRequestEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AcceptFriendshipRequestEventHandler.html" data-type="entity-link" >AcceptFriendshipRequestEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/AcceptFriendshipRequestHandler.html" data-type="entity-link" >AcceptFriendshipRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthService.html" data-type="entity-link" >AuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelFriendshipRequestCommand.html" data-type="entity-link" >CancelFriendshipRequestCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelFriendshipRequestEvent.html" data-type="entity-link" >CancelFriendshipRequestEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelFriendshipRequestEventHandler.html" data-type="entity-link" >CancelFriendshipRequestEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelFriendshipRequestHandler.html" data-type="entity-link" >CancelFriendshipRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserCommand.html" data-type="entity-link" >DeleteUserCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserHandler.html" data-type="entity-link" >DeleteUserHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorEventHandler.html" data-type="entity-link" >ErrorEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorsEvent.html" data-type="entity-link" >ErrorsEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/FriendshipDto.html" data-type="entity-link" >FriendshipDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FriendshipRequestDto.html" data-type="entity-link" >FriendshipRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetReceivedFriendshipHandler.html" data-type="entity-link" >GetReceivedFriendshipHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetReceivedFriendshipRequestQuery.html" data-type="entity-link" >GetReceivedFriendshipRequestQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSentFriendshipRequestHandler.html" data-type="entity-link" >GetSentFriendshipRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSentFriendshipRequestQuery.html" data-type="entity-link" >GetSentFriendshipRequestQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetStatusFriendshipHandler.html" data-type="entity-link" >GetStatusFriendshipHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetStatusFriendshipQuery.html" data-type="entity-link" >GetStatusFriendshipQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserHandler.html" data-type="entity-link" >GetUserHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserIfRefreshTokenMatchesHandler.html" data-type="entity-link" >GetUserIfRefreshTokenMatchesHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserIfRefreshTokenMatchesQuery.html" data-type="entity-link" >GetUserIfRefreshTokenMatchesQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserQuery.html" data-type="entity-link" >GetUserQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterCommand.html" data-type="entity-link" >RegisterCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterHandler.html" data-type="entity-link" >RegisterHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveFriendshipCommand.html" data-type="entity-link" >RemoveFriendshipCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveFriendshipEvent.html" data-type="entity-link" >RemoveFriendshipEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveFriendshipEventHandler.html" data-type="entity-link" >RemoveFriendshipEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveFriendshipHandler.html" data-type="entity-link" >RemoveFriendshipHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveRefreshTokenCommand.html" data-type="entity-link" >RemoveRefreshTokenCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveRefreshTokenHandler.html" data-type="entity-link" >RemoveRefreshTokenHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendFriendshipRequestCommand.html" data-type="entity-link" >SendFriendshipRequestCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendFriendshipRequestEvent.html" data-type="entity-link" >SendFriendshipRequestEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendFriendshipRequestEventHandler.html" data-type="entity-link" >SendFriendshipRequestEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendFriendshipRequestHandler.html" data-type="entity-link" >SendFriendshipRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetCurrentRefreshTokenCommand.html" data-type="entity-link" >SetCurrentRefreshTokenCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetCurrentRefreshTokenHandler.html" data-type="entity-link" >SetCurrentRefreshTokenHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserCommand.html" data-type="entity-link" >UpdateUserCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserHandler.html" data-type="entity-link" >UpdateUserHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserListResponse.html" data-type="entity-link" >UserListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepositoryMock.html" data-type="entity-link" >UserRepositoryMock</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthenticationGuard.html" data-type="entity-link" >JwtAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthenticationGuard.html" data-type="entity-link" >LocalAuthenticationGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RequestUser.html" data-type="entity-link" >RequestUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});