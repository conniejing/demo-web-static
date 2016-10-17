<template>
    <section class="content">
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
                                <dd v-text="vehicle.buyCarTime | date"></dd>
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
                        <button type="button" class="btn btn-default" onClick="history.back()">返回</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import api from '../../components/apiConfig';
import common from '../../components/common';
import '../../components/filter';
export default {
    data: function() {
        return {
            vehicle: {
                carPlate: '',
                vin: '',
                modelId: '',
                batteryModel: '',
                buyBatteryTime: '',
                vehiclePic: ''
            }
        };
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
                    var vehicle = {
                        'vehicle': data
                    };
                    transition.next(vehicle);
                });
            }
        }
    }
};
</script>
