<template>
    <header class="main-header">
        <a href="javascript:void(0)" class="sidebar-toggle" data-toggle="offcanvas" role="button"></a>
        <a v-link="{ name: 'index' }" class="logo">云蜂车共享客户版</a>
        <p v-if="username" class="loginUser">欢迎回来，<span>{{ username }}</span></p>
    </header>
</template>

<script>
    export default{
        data() {
            return {
                user: 'connie'
            };
        },
        props: ['username']
    };
</script>