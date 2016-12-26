<style>
.marker {
    color: #000;
    padding: 4px 10px;
    border: 1px solid #fff;
    white-space: nowrap;
    font-size: 12px;
    font-family: "";
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
    position: absolute;
    top: 5px;
    left: 25px;
}
</style>
<template>
    <section class="content-header">
        <h1>地图Demo</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">高德地图</h3>
            </div>
            <div class="box-body">
                <div class="row form-group">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary" @click="getPoint">定位</button>
                        <button type="button" class="btn btn-primary" @click="getPointLabel">定位带标签</button>
                        <button type="button" class="btn btn-primary" @click="getLine">获取路径</button>
                        <button type="button" class="btn btn-primary" @click="polyline">轨迹回放</button>
                        <template v-if="lineMarker">
                            <button type="button" class="btn btn-default" @click="polylineStart">开始</button>
                            <button type="button" class="btn btn-default" @click="polylineEnd">停止</button>
                        </template>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <map v-ref:map height="500px" img-class="imgClass"></map> 
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import common from '../../components/common';
import Map from '../../components/Map.vue';
export default {
    data: function() {
        return {
            // 地图数据
            mapData: {
                latitude: 30.590358,
                longitude: 104.071556
            },
            amap: null,
            lineArr: [
                [116.380478, 39.864765],
                [116.381439, 39.864838],
                [116.38752, 39.86512],
                [116.387901, 39.870514],
                [116.388519, 39.870773],
                [116.396164, 39.871372],
                [116.42189, 39.871246],
                [116.421494, 39.870499],
                [116.418259, 39.906261],
                [116.418663, 39.906364],
                [116.418259, 39.906261],
                [116.418419, 39.901207],
                [116.419655, 39.90115],
                [116.420746, 39.901794],
                [116.423256, 39.903545],
                [116.424843, 39.903435],
                [116.425514, 39.904137],
                [116.427277, 39.904163]
            ],
            lineMarker: null
        };
    },
    components: {
        Map
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                transition.next();
            }
        }
    },
    methods: {
        // 地图定位
        getPoint: function() {
            var opts = {
                point: [104.07185, 30.587346],
                zoom: 10
            }
            this.$refs.map.getPoint(opts);
        },
        // 地图定位标签
        getPointLabel: function() {
            var opts = {
                point: [104.091608, 30.636805],
                content: "这里是四川大学"
            }
            this.$refs.map.getPoint(opts);
        },
        // 地图路径规划
        getLine: function() {
            var opts = {
                start: [116.369028, 39.870042],
                end: [116.337281, 39.923719]
            }
            this.$refs.map.getLine(opts);
        },
        // 回放轨迹
        polyline: function() {
            var opts = {
                zoom: 13,
                lineArr: this.lineArr
            }
            this.lineMarker = this.$refs.map.polyline(opts);
        },
        polylineStart: function() {
            this.lineMarker.moveAlong(this.lineArr, 500);
        },
        polylineEnd: function() {
            this.lineMarker.stopMove();
        }
    }
}
</script>
