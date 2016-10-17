<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">定位监控</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="pad bg-blue left-panel" style="min-height: 390px">
                                    <div class="form-group">
                                        <select class="form-control" @change="getMonitor" v-model="vehicle.id">
                                            <option v-for="plateNumber in plateNumberList" :value="plateNumber.id" v-text="plateNumber.carPlate"></option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <dt>胎压：</dt>
                                        <dd v-text="vehicle.tirePressure"></dd>
                                    </div>
                                    <div class="form-group">
                                        <dt>水温：</dt>
                                        <dd v-text="vehicle.waterTemperature"></dd>
                                    </div>
                                    <div class="form-group">
                                        <dt>经度：</dt>
                                        <dd v-text="vehicle.longitude"></dd>
                                    </div>
                                    <div class="form-group">
                                        <dt>纬度：</dt>
                                        <dd v-text="vehicle.latitude"></dd>
                                    </div>
                                    <div class="form-group">
                                        <dt>速度：</dt>
                                        <dd v-text="vehicle.mileage"></dd>
                                    </div>
                                    <div class="form-group">
                                        <dt>时间：</dt>
                                        <dd v-text="vehicle.time | dateTime"></dd>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div id="map" style="width:100%;min-height:500px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import common from '../../components/common';
import api from '../../components/apiConfig';
import '../../components/filter';
import '../../components/commonMap';
export default {
    data: function() {
        return {
            plateNumberList: [],
            vehicle: {
                id: '',
                carPlate: '',
                tirePressure: '',
                temperature: '',
                longitude: '',
                latitude: '',
                speed: '',
                datetime: ''
            },
            map: {}
        };
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                var vehicleId = transition.to.params.id;
                var data = {};
                // var vehicleUrl = api.vehicle.plateList;
                // 没有mock数据，用车辆接口模拟
                var vehicle_params = {
                    userId: common.getUserId(),
                    pageSize: 5 // 没有mock数据，用车辆接口模拟5条数据
                };
                commonAjax.ajaxGetJson(api.vehicle.list, vehicle_params, function(result) {
                    if (vehicleId) {
                        var plateNumberList = [];
                        var rows = result.rows;
                        for (var i = 0, len = result.rows.length; i < len; i++) {
                            if (vehicleId === rows[i].id) {
                                plateNumberList[0] = rows[i];
                                data.plateNumberList = plateNumberList;
                            }
                        }
                    } else {
                        data.plateNumberList = result.rows;
                    }
                });
                if (vehicleId) {
                    var params = {
                        id: vehicleId
                    };
                    commonAjax.ajaxGetJson(api.vehicle.monitor, params, function(result) {
                        data.vehicle = result;
                        // setTimeout(function () {
                        //     self.map.clearOverlays().addMarker(self.vehicle.longitude, self.vehicle.latitude);
                        // },1000);
                        // self.map.clearOverlays().addMarker(self.vehicle.longitude, self.vehicle.latitude);
                    });
                    data.vehicle.id = vehicleId;
                }
                transition.next(data);
            }
        },
        // 当组件被创建而且将要切换进入的时候被调用
        // 对外提供组件对象
        activate: function(transition) {
            exports.vComp = this;
            transition.next();
        }
    },
    methods: {
        getMonitor: function() {
            var self = this;
            var params = {
                id: this.vehicle.id
            };
            commonAjax.ajaxGetJson(api.vehicle.monitor, params, function(result) {
                self.$set('vehicle', result);
                self.map.clearOverlays().addMarker(self.vehicle.longitude, self.vehicle.latitude);
                // setTimeout(function () {
                //     self.map.clearOverlays().addMarker(self.vehicle.longitude, self.vehicle.latitude);
                // },1000)
            });
        }
    },
    ready: function() {
        var self = this;
        self.map = $('#map').yfmap();
        if (this.vehicle.id) {
            self.map.clearOverlays().addMarker(self.vehicle.longitude, self.vehicle.latitude);
        }
    }
};
</script>
