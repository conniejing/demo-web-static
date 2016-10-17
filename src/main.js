require('./css/default.css');

// import commonAjax from './components/commonAjax';
// import api from './components/apiConfig';
import common from './components/common';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueValidator from 'vue-validator';

Vue.use(VueRouter);
Vue.use(VueValidator);

//公用组件
import MyHeader from './components/Header.vue';
import MyFooter from './components/Footer.vue';
import MySidebar from './components/Sidebar.vue';
import MySidebarAdmin from './components/SidebarAdmin.vue';

var nickName = common.getUserName();
var currentSidebar = sessionStorage.getItem('userRole') === "admin" ? "MySidebarAdmin" : "MySidebar";

// 路由器需要一个根组件。
var App = Vue.extend({
    data: function() {
        return {
            nickName: nickName,
            currentSidebar: currentSidebar
        }
    },
    components: {
        MyHeader,
        MyFooter,
        MySidebar,
        MySidebarAdmin
    },
    events: {
        setNickName: function(name) {
            this.nickName = name;
        },
        setSidebar: function(role) {
            if (role === "admin") {
                this.currentSidebar = "MySidebarAdmin";
            } else {
                this.currentSidebar = "MySidebar";
            }
        }
    }
});


// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter({
    linkActiveClass: 'active'
});

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
router.map({
    '/index': {
        name: 'index',
        component: {
            template: "<section class='content-header'><h1>首页</h1></section>"
        }
    },
    '/login': {
        component: function(resolve) {
            require(['./pages/auth/login.vue'], resolve);
        }
    },
    //车辆管理 - 我的车
    '/vehicle': {
        name: 'vehicle',
        component: function(resolve) {
            // require(['./pages/vehicle/vehicle.vue'],resolve);
            require.ensure([], function() {
                resolve(require('./pages/vehicle/vehicle.vue'));
            }, 'vehicle-chunk');
        },
        subRoutes: {
            //车辆列表
            '/list': {
                name: 'vehicleList',
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/vehicleList.vue'));
                    }, 'vehicle-chunk');
                }
            },
            //车辆详情
            '/info/:id': {
                name: 'vehicleInfo',
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/vehicleInfo.vue'));
                    }, 'vehicle-chunk');
                }
            },
            //发布车辆
            '/add': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/vehicleForm.vue'));
                    }, 'vehicle-chunk');
                }
            },
            //修改车辆
            '/edit/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/vehicleForm.vue'));
                    }, 'vehicle-chunk');
                }
            },
            '/monitor': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/monitor.vue'));
                    }, 'vehicle-chunk');
                },
                subRoutes: {
                    '/:id': {
                        component: function(resolve) {
                            require.ensure([], function() {
                                resolve(require('./pages/vehicle/monitor.vue'));
                            }, 'vehicle-chunk');
                        }
                    }
                }
            },
            //车辆事件列表
            '/event': {
                name: 'vehicleEvent',
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/vehicleEventList.vue'));
                    }, 'vehicle-chunk');
                }
            },
            //车辆事件详情
            '/event/:id': {
                name: 'eventInfo',
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/vehicleEventInfo.vue'));
                    }, 'vehicle-chunk');
                }
            }
        }
    },
    //车辆管理 - 我租的车
    '/rentedVehicle': {
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('./pages/rentedVehicle/rentedVehicle.vue'));
            }, 'rentedVehicle-chunk');
        },
        //子路由，会在父路由的<router-view>节点进行渲染
        subRoutes: {
            //车辆列表
            '/list': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentedVehicle/rentedVehicleList.vue'));
                    }, 'rentedVehicle-chunk');
                }
            },
            //车辆详情
            '/info/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentedVehicle/rentedVehicleInfo.vue'));
                    }, 'rentedVehicle-chunk');
                }
            },
            //车辆定位
            '/monitor': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/vehicle/monitor.vue'));
                    }, 'vehicle-chunk');
                }
            }
        }
    },
    // //订单中心 - 租入车单
    '/rentOrder': {
        name: 'rentOrder',
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('./pages/rentOrder/rentOrder.vue'));
            }, 'rentOrder-chunk');
        },
        subRoutes: {
            //车单列表
            '/list': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/rentOrderList.vue'));
                    }, 'rentOrder-chunk');
                }
            },
            //车单处理
            '/edit/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/rentOrderInfo.vue'));
                    }, 'rentOrder-chunk');
                }
            },
            //车单详情
            '/info/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/rentOrderInfo.vue'));
                    }, 'rentOrder-chunk');
                }
            },
            //查询统计
            '/statistics': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/rentStatistics.vue'));
                    }, 'rentOrder-chunk');
                }
            }
        }
    },
    //订单中心 - 租车车单
    '/leaseOrder': {
        name: 'leaseOrder',
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('./pages/rentOrder/rentOrder.vue'));
            }, 'leaseOrder-chunk');
        },
        subRoutes: {
            //车单列表
            '/list': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/leaseOrderList.vue'));
                    }, 'leaseOrder-chunk');
                }
            },
            //车单处理
            '/edit/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/leaseOrderInfo.vue'));
                    }, 'leaseOrder-chunk');
                }
            },
            //车单详情
            '/info/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/leaseOrderInfo.vue'));
                    }, 'leaseOrder-chunk');
                }
            },
            //查询统计
            '/statistics': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentOrder/leaseStatistics.vue'));
                    }, 'leaseOrder-chunk');
                }
            }
        }
    },
    //订单中心 - 我要租车
    '/rentCar': {
        name: 'rentCar',
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('./pages/rentCar/rentCar.vue'));
            }, 'rentCar-chunk');
        },
        subRoutes: {
            //车单列表
            '/list': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentCar/rentCarList.vue'));
                    }, 'rentCar-chunk');
                }
            },
            '/info/:id': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/rentCar/rentCarInfo.vue'));
                    }, 'rentCar-chunk');
                }
            },
            //车辆定位
            '/monitor/:id': {
                component: function(resolve) {
                    require(['./pages/vehicle/monitor.vue'], resolve);
                }
            }
        }
    },
    //个人中心
    '/auth': {
        name: 'auth',
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('./pages/auth/auth.vue'));
            }, 'auth-chunk');
        },
        subRoutes: {
            //我的信息
            '/myInfo': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/auth/myInfo.vue'));
                    }, 'auth-chunk');
                }
            },
            //修改密码
            '/password': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/auth/changePWD.vue'));
                    }, 'auth-chunk');
                }
            },
            // 消息中心
            '/notification': {
                component: function(resolve) {
                    require.ensure([], function() {
                        resolve(require('./pages/auth/notification.vue'));
                    }, 'auth-chunk');
                }
            }
        }
    },
    //demo的路由地址
    '/demo': {
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('./pages/demo/demo.vue'));
            }, 'demo-chunk');
        }
    }
});
router.redirect({
    '*': '/index'
});
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');

window.router = router;
