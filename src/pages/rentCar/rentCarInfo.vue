<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 v-else class="box-title">车辆信息</h3>
            </div>
            <div class="dl-horizontal">
                <div class="box-body">
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="form-group">
                                <dt>车牌</dt>
                                <dd v-text="vehicle.carPlate"></dd>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <dt>车架号</dt>
                                <dd v-text="vehicle.vin"></dd>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <dt>车型</dt>
                                <dd v-text="vehicle.modelId"></dd>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <dt>电池型号</dt>
                                <dd v-text="vehicle.batteryModel"></dd>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <dt>购买时间</dt>
                                <dd v-text="vehicle.buyBatteryTime | dateTime"></dd>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>图片</label>
                            <div>
                                <img :src="vehicle.vehiclePic" width="256">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="col-md-12">
                        <button v-if="vehicle.useStatus==='UNUSED'" type="button" class="btn btn-primary" @click="onSubmit">确认租车</button>
                        <button type="button" class="btn btn-default" onClick="history.back()">返回</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import common from '../../components/common';
import commonAjax from '../../components/commonAjax';
import callout from '../../components/Callout.vue';
import api from '../../components/apiConfig';
import '../../components/filter';
export default {
    data: function() {
        return {
            vehicle: {
                carPlate: '',
                vin: '',
                vehicleId: '',
                modelId: '',
                batteryModel: '',
                buyBatteryTime: '',
                vehiclePic: ''
            },
            // 顶部消息提示数据
            callout: {
                failed: '',
                info: '',
                warning: '',
                success: '',
                autoclose: true
            }
        };
    },
    components: {
        callout
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                var vehicleId = transition.to.params.id;
                var url = common.replaceUrl(api.vehicle.info, [{
                    'key': 'id',
                    'value': vehicleId
                }]);
                commonAjax.ajaxGetJson(url, null, function(data) {
                    data.vehicleId = vehicleId;
                    var vehicle = {
                        'vehicle': data
                    };
                    transition.next(vehicle);
                });
            }
        }
    },
    methods: {
        onSubmit: function() {
            var self = this;
            var vehicleId = this.vehicle.vehicleId;
            commonAjax.ajaxPostForm(api.order.new, {
                'vehicleId': vehicleId
            }, function success() {
                self.callout.success = '申请成功';
                if (common.noLoginRedirect()) {
                    var url = common.replaceUrl(api.vehicle.info, [{
                        'key': 'id',
                        'value': vehicleId
                    }]);
                    commonAjax.ajaxGetJson(url, null, function(data) {
                        self.$set('vehicle', data);
                    });
                }
            }, null);
        }
    }
};
</script>
