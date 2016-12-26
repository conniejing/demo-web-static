<style>
.marker {
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

.box-header .box-title {
    font-size: 14px;
    font-weight: bold;
}

.date {
    display: inline-block;
}

.data-panel {
    overflow: auto;
    max-height: 105px;
}

.content-panel {
    width: 250px;
    max-height: 200px;
    margin: 0;
}
</style>
<template>
    <section class="content-header">
        <h1>监控车辆</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-body">
                <div class="row form-group">
                    <div class="col-md-12">
                        <v-form v-ref:form :action="formParam.submitUrl" :method="formParam.submitMethod" :data-type="formParam.dataType">
                            <div class="col-md-4">
                                <v-select label="选择车辆的VIN码" name="car" :value.sync="tmpValue.car" placeholder="--请选择--" :items="tmpValue.carList"></v-select>
                            </div>
                            <div class="col-md-2" style="margin-top: 20px;">
                                <v-checkbox label="" name="all" :value.sync="tmpValue.all" :text="tmpValue.allText"></v-checkbox>
                            </div>
                            <div class="col-md-2" style="margin-top:24px">
                                <button type="submit" class="btn btn-primary" @click.stop.prevent="submit">确定</button>
                            </div>
                        </v-form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <map v-ref:map height="500px" img-class="imgClass"></map>
                    </div>
                </div>
            </div>
        </div>
        <div class="hide">
            <div v-for="item in carPoint" :id="item.vin" class="box box-primary content-panel">
                <div class="box-header with-border">
                    <h5 class="box-title">VIN: {{item.vin}}</h3>
                    <div class="pull-right">预警</div>
                </div>
                <div class="box-body">
                    <div>
                        <p class="date">{{item.date}}</p>
                        <div class="pull-right">
                            <button type="button" @click.stop.prevent="openParam()">选择参数</button>
                        </div>
                    </div>
                    <div class="data-panel">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                        <div>0</div>
                    </div>
                </div>
            </div>
        </div>     
    </section>
</template>
<script>
import common from '../../components/common';
import Map from '../../components/Map.vue';
import formComps from '../../components/mixins/formComps.js'; // form mixins

export default {
    mixins: [formComps],
    data: function() {
        return {
            // 地图数据
            mapData: {
                latitude: 30.590358,
                longitude: 104.071556
            },
            amap: null,

            // formParam
            formParam: {
                submitUrl: '',
                submitMethod: '',
                dataType: '',
                message: ''
            },
            tmpValue: {
                car: '',
                carList: [{
                    id: 'KNB20198752343234',
                    text: 'KNB20198752343234'
                }, {
                    id: 'WDB2012012DK23KR0',
                    text: 'WDB2012012DK23KR0'
                }, {
                    id: 'DES9384728EK3OFM4',
                    text: 'DES9384728EK3OFM4'
                }, {
                    id: 'WOD2493041F94MR42',
                    text: 'WOD2493041F94MR42'
                }, {
                    id: 'OEK4825831F244F4F',
                    text: 'OEK4825831F244F4F'
                }],
                all: false,
                allText: '监控全部车辆'
            },
            markers: {},
            // ajax获取
            carPoint: [
                {
                    vin: 'KNB20198752343234',
                    point: [104.07185, 30.587346],
                    date: '2013/04/23 12:33:23'
                },
                {
                    vin: 'WDB2012012DK23KR0',
                    point: [103.986084,30.658871],
                    date: '2013/04/23 12:33:23',
                    warning: 1
                },
                {
                    vin: 'DES9384728EK3OFM4',
                    point: [104.034836,30.719986],
                    date: '2013/04/23 12:33:23',
                    warning: 2
                },
                {
                    vin: 'WOD2493041F94MR42',
                    point: [104.192078,30.706408],
                    date: '2013/04/23 12:33:23'
                },
                {
                    vin: 'OEK4825831F244F4F',
                    point: [104.154999,30.636128],
                    date: '2013/04/23 12:33:23'
                }
            ]
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
        submit: function() {
            this.clearPoint();

            this.$refs.map.setVehicleData(this.carPoint);
            if(this.tmpValue.all){
                var self = this;
                // 监控全部
                // TODO: ajax获取所有车辆point
                for(var i = 0; i < self.carPoint.length; i++){
                    self.getPointLabel({
                        'vin': self.carPoint[i].vin,
                        'point': self.carPoint[i].point,
                        'data': self.carPoint[i]
                    });
                }
            }else{
                // 监控this.tmpValue.car
                // TODO: ajax获取当前车辆point
                var point;
                var data;
                for(var i = 0; i < this.carPoint.length; i++){
                    if(this.tmpValue.car === this.carPoint[i].vin){
                        point = this.carPoint[i].point;
                        data = this.carPoint[i];
                    }
                }
                var parma = {
                    'vin': this.tmpValue.car,
                    'point': point,
                    'data': data
                }
                // this.getPoint(parma);
                this.getPointLabel(parma);
            }
        },
        // 打开参数面板
        openParam: function(vin){
            console.warn(11);
        },
        // 地图定位
        getPoint: function(parma) {
            var opts = {
                point: parma.point,
                zoom: 12
            }
            var marker = this.$refs.map.getPoint(opts);
            this.markers[parma.vin] = marker;
        },
        // 清空地图标记
        clearPoint: function() {
            var self = this;
            Object.keys(self.markers).map(function(value){
                self.$refs.map.removePoint(self.markers[value]);
            });
        },
        // 地图定位标签
        getPointLabel: function(parma) {
            var id = parma.vin;
            var outerHTML = document.getElementById(id).outerHTML;
            var opts = {
                point: parma.point,
                zoom: 12,
                content: outerHTML,
                data: parma
            }
            var marker = this.$refs.map.getPoint(opts);
            this.markers[parma.vin] = marker;
        }
    }
}
</script>
