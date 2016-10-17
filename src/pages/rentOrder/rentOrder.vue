<template>
    <section class="content-header">
        <h1 v-if="$route.matched[0].handler.path ==='/rentOrder'">租入车单</h1>
        <h1 v-if="$route.matched[0].handler.path ==='/leaseOrder'">租出车单</h1>
    </section>
    <router-view></router-view>
</template>