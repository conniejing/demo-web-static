<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <ul class="sidebar-menu">
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/vehicle' || $route.matched[0].handler.path ==='/rentedVehicle' }">
                    <a href="#">
                        <span>车辆管理</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li :class="{ 'active' : $route.matched[0].handler.path ==='/vehicle' }">
                            <a href="#">我的车
                                <span class="pull-right-container">
                                  <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li>
                                    <a v-link="{ path: '/vehicle/add' }">发布车辆</a>
                                </li>
                                <li>
                                    <a v-link="{ name: 'vehicleList' }">车辆列表</a>
                                </li>
                                <li>
                                    <a v-link="{ path: '/vehicle/monitor' }">定位监控</a>
                                </li>
                                <li>
                                    <a v-link="{ path: '/vehicle/event' }">车辆事件</a>
                                </li>
                            </ul>
                        </li>
                        <li :class="{ 'active' : $route.matched[0].handler.path ==='/rentedVehicle' }">
                            <a href="#">我租的车
                                <span class="pull-right-container">
                                  <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li>
                                    <a v-link="{ path: '/rentedVehicle/list' }">车辆列表</a>
                                </li>
                                <li>
                                    <a v-link="{ path: '/rentedVehicle/monitor' }">定位监控</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/auth' }">
                    <a href="#">
                        <span>个人中心</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a v-link="{ path: '/auth/myInfo' }">我的信息</a>
                        </li>
                        <li>
                            <a v-link="{ path: '/auth/password' }">修改密码</a>
                        </li>
                        <li>
                            <a v-link="{ path: '/auth/notification' }">消息中心</a>
                        </li>
                    </ul>
                </li>
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/rentOrder' || $route.matched[0].handler.path ==='/leaseOrder' || $route.matched[0].handler.path ==='/rentCar' }">
                    <a href="#">
                        <span>订单中心</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li :class="{ 'active' : $route.matched[0].handler.path ==='/rentOrder' }">
                            <a href="#">租入车单
                                <span class="pull-right-container">
                                  <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li>
                                    <a v-link="{ path: '/rentOrder/statistics' }">查询统计</a>
                                </li>
                                <li>
                                    <a v-link="{ path: '/rentOrder/list' }">车单列表</a>
                                </li>
                            </ul>
                        </li>
                        <li :class="{ 'active' : $route.matched[0].handler.path ==='/leaseOrder' }">
                            <a href="#">租出车单
                                <span class="pull-right-container">
                                  <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li>
                                    <a v-link="{ path: '/leaseOrder/statistics' }">查询统计</a>
                                </li>
                                <li>
                                    <a v-link="{ path: '/leaseOrder/list' }">车单列表</a>
                                </li>
                            </ul>
                        </li>
                        <li :class="{ 'active' : $route.matched[0].handler.path ==='/rentCar' }">
                            <a v-link="{ path: '/rentCar/list' }">我要租车</a>
                        </li>
                    </ul>
                </li>
                <li class="treeview">
                    <a v-link="{ path: '/demo' }">
                        <span>demo演示</span>
                    </a>
                </li>
                <li class="treeview">
                    <a href="#" @click.stop.prevent="logout">
                        <span>登出</span>
                    </a>
                </li>
            </ul>
        </section>
    </aside>
</template>
<script>
import commonAjax from './commonAjax';
import api from './apiConfig';

export default {
    methods: {
        logout: function() {
            commonAjax.ajaxGetJson(api.auth.logout, {}, function(data) {});
            sessionStorage.removeItem('user');
            this.$dispatch('setNickName', '');
            router.go({
                path: '/login'
            });
        }
    }
};
</script>
