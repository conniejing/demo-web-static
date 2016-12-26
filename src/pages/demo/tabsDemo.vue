<template>
    <section class="content-header">
        <h1>Tabs</h1>
    </section>
    <section class="content">
        <div class="box box-widget" style="padding:20px;">
            <tabs>
                
            </tabs>
        </div>
    </section>
</template>
<script>
import Tabs from '../../components/Tabs.vue';
export default {
    data: function() {
        return {
            b: 1
        }
    },
    computed: {
        a: function(){
            return this.b + 1;
        }
    },
    components: {
        Tabs
    // },
    // init:function(){
    //     console.info(this.a);
    // },
    // created:function(){
    //     console.info(this.a);
    // },
    // beforeCompile:function(){
    //     console.info(this.a);
    // },
    // compiled:function(){
    //     console.info(this.a);
    // },
    // ready:function(){
    //     console.info(this.a);
    }
}
</script>
