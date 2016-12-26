<style>
.tab-list {
    list-style: none;
    padding-left: 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
}

.tab-list > li {
    position: relative;
    display: block;
    float: left;
    margin-bottom: -1px;
}

.tab-list > li > a {
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-right: 2px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
}

.tab-list>li.active>a,
.tab-list>li.active>a:focus,
.tab-list>li.active>a:hover {
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
}
</style>
<template>
    <div>
        <ul class="tab-list fn-clear">
            <li><a href="#">Tab1</a></li>
            <li><a href="#">Tab2</a></li>
            <li><a href="#">Tab3</a></li>
            <li><a href="#">Tab4</a></li>
            <li><a href="#">Tab5</a></li>
        </ul>
        <div class="tab-content">
            <div>1111111111111111111111111</div>
            <div>2222222222222222222222222</div>
            <div>33333333333333333333333333</div>
            <div>4444444444444444444444444</div>
            <div>555555555555555555555555555</div>
        </div>
    </div>
    <div>
        <h2>test</h2>
        <select v-for="i in num" :name="i" :id="i" @change="select(i)">
            <option v-for="data in items[i]" value="data.id" >{{data.value}}</options>
        </select>
    </div>
</template>
<script>
export default {
    props: {},
    data: function() {
        return {
            num: 3,
            data0: [{
                id: 1,
                value: 1
            }, {
                id: 2,
                value: 2
            }],
            data1: [{
                id: 3,
                value: 3
            }, {
                id: 4,
                value: 4
            }],
            data2: [{
                id: 5,
                value: 5
            }, {
                id: 6,
                value: 6
            }],
            url1: 'aaa.json',
            url2: 'bbb.json'
        }
    },
    computed: {
        items: function() {
            var tmp = [];
            for (var i = 0; i < this.num; i++){
                tmp[i] = this["data"+i];
            }
            return tmp;
        }
    },
    ready: function(){
        console.dir(this.items);
    },
    methods: {
        select: function(id) {
            alert(id);
        }
    }
}
</script>
