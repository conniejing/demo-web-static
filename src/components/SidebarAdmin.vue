<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <ul class="sidebar-menu">
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/vehicle' }">
                    <a href="#">
                        <span>车辆管理</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a v-link="{ path: '/vehicle/list' }">车辆列表</a>
                        </li>
                        <li>
                            <a v-link="{ path: '/vehicle/event' }">车辆事件</a>
                        </li>
                    </ul>
                </li>
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/auth' || $route.matched[0].handler.path ==='/customer' || $route.matched[0].handler.path ==='/admin' }">
                    <a href="#">
                        <span>用户管理</span>
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
                        <!--<li>-->
                        <!--<a v-link="{ path: '/admin/list' }">管理员列表</a>-->
                        <!--</li>-->
                        <!-- <li>
                            <a v-link="{ path: '/customer/list' }">用户列表</a>
                        </li> -->
                    </ul>
                </li>
                <!-- <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/rentOrder' }">
                    <a href="#">
                        <span>租车管理</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a v-link="{ path: '/rentOrder/list' }">订单列表</a>
                        </li>
                        <li>
                            <a v-link="{ path: '/rentOrder/leaseStatistics' }">车主统计</a>
                        </li>
                        <li>
                            <a v-link="{ path: '/rentOrder/rentStatistics' }">租车人统计</a>
                        </li>
                    </ul>
                </li> -->
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/mapCar' }">
                    <a v-link="{ path: '/mapCar' }">
                        <span>车辆当前位置</span>
                    </a>
                </li>
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/signalSearch' }">
                    <a v-link="{ path: '/signalSearch' }">
                        <span>远程信号查询</span>
                    </a>
                </li>
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/signalMonitor' }">
                    <a v-link="{ path: '/signalMonitor' }">
                        <span>远程信号实时监控</span>
                    </a>
                </li>
                <li class="treeview" :class="{ 'active' : $route.matched[0].handler.path ==='/signalOrder' }">
                    <a v-link="{ path: '/signalOrder' }">
                        <span>信号故障报警查询</span>
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
