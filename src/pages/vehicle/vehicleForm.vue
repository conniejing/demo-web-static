<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 v-if="$route.params.id" class="box-title">修改车辆</h3>
                <h3 v-else class="box-title">新增车辆</h3>
            </div>
            <validator name="validation">
                <form>
                    <div class="box-body">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>车牌</label>
                                <input type="text" class="form-control" placeholder="川A 12345" v-model="vehicle.carPlate" v-validate:car-plate="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.carPlate.required">{{ $validation.carPlate.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>车架号</label>
                                <input type="text" class="form-control" v-model="vehicle.vin" v-validate:vin="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.vin.required">{{ $validation.vin.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>车型</label>
                                <select class="form-control" v-model="vehicle.modelId" v-validate:model-id="['required']" initial="off">
                                    <option value=1>云蜂-V1</option>
                                    <option value=2>云蜂-V2</option>
                                    <option value=3>云蜂-V3</option>
                                    <option value=4>云蜂-V4</option>
                                </select>
                            </div>
                            <div class="errors">
                                <p v-show="$validation.modelId.required">{{ $validation.modelId.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>电池型号</label>
                                <select class="form-control" v-model="vehicle.batteryModel" v-validate:battery-model="['required']" initial="off">
                                    <option v-for="batteryModel in batteryModelList" :value="batteryModel.value" v-text="batteryModel.name"></option>
                                </select>
                            </div>
                            <div class="errors">
                                <p v-show="$validation.batteryModel.required">{{ $validation.batteryModel.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>购买时间</label>
                                <div class="input-group date">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="text" class="form-control pull-right" id="datepicker" v-model="vehicle.buyBatteryTime" v-validate:buy-battery-time="['required']" initial="off">
                                </div>
                            </div>
                            <div class="errors">
                                <p v-show="$validation.buyBatteryTime.required">{{ $validation.buyBatteryTime.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>车辆价格</label>
                                <input type="text" class="form-control" v-model="vehicle.totalPrice" v-validate:total-price="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.totalPrice.required">{{ $validation.totalPrice.required }}</p>
                            </div>
                        </div>
                        <!--<div class="col-md-12">
                            <div class="form-group">
                                <label>图片</label>
                                <input type="file" class="form-control" accept="image/*">
                            </div>
                        </div>-->
                    </div>
                    <div class="box-footer">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary" @click.stop.prevent="onSubmit">保存</button>
                            <button type="button" class="btn btn-default" onClick="history.back()">取消</button>
                        </div>
                    </div>
                </form>
            </validator>
        </div>
    </section>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import callout from '../../components/Callout.vue';
import api from '../../components/apiConfig';
import common from '../../components/common';
import '../../components/commonValidator';
import '../../components/filter';
import vex from '../../vendors/vex/vex.combined.js';
vex.defaultOptions.className = 'vex-theme-os';
// json假数据
import batteryModelJson from './batteryModel.json';
var vehicleId;
export default {
    data: function() {
        return {
            vehicle: {
                id: '',
                userId: '', // 车主ID
                carPlate: '', // 车牌
                totalPrice: '', // 车辆价格
                buyBatteryTime: new Date().getTime(), // 电池购买时间
                insuranceTime: new Date().getTime(), // 保险期限
                engineSn: 'C190C8008', // 发动机型号
                vin: '', // 车架号
                vehiclePic: 'http://pic2.cxtuku.com/00/15/70/b899a1c581a5.jpg', // 车辆图片
                modelId: '', // 车型ID
                batteryModel: '', // 电池类型
                buyCarTime: '', // 购买时间
                auditStatus: 'UNAUDITED', // 审核状态
                useStatus: null // 使用状态
            },
            callout: {
                failed: '',
                info: '',
                warning: '',
                success: '',
                autoclose: true
            },
            batteryModelList: []
        };
    },
    components: {
        callout
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                var data = {};
                // 获取电池型号json
                // commonAjax.ajaxGetJson(api.vehicle.batteryList, null, function(result){
                //     data.batteryModelList = result.data.batteryModelList;
                // });
                // json假数据
                data.batteryModelList = batteryModelJson.data.batteryModelList;
                // 获取搜索条件id
                vehicleId = transition.to.params.id;
                // 修改vehicle信息，新增不执行
                if (vehicleId) {
                    // 获取车辆json
                    var url = common.replaceUrl(api.vehicle.info, [{
                        'key': 'id',
                        'value': vehicleId
                    }]);
                    commonAjax.ajaxGetJson(url, null, function(result) {
                        data.vehicle = result;
                        data.vehicle.buyCarTime = common.formatDate(data.vehicle.buyCarTime);
                        data.vehicle.buyBatteryTime = common.formatDate(data.vehicle.buyBatteryTime);
                    });
                } else {
                    data.vehicle = {};
                }
                transition.next(data);
            }
        }
    },
    methods: {
        onSubmit: function() {
            var self = this;
            var vehiclePost = Object.assign({}, self.vehicle);
            vehiclePost.userId = common.getUserId();
            vehiclePost.buyCarTime = Date.parse(self.vehicle.buyCarTime);
            vehiclePost.buyBatteryTime = Date.parse(self.vehicle.buyBatteryTime);
            this.$validate(true, function(e) {
                if (!self.$validation.invalid) {
                    if (vehicleId) {
                        commonAjax.ajaxPUTForm(api.vehicle.update, vehiclePost, function() {
                            var dialog = vex.dialog.alert({
                                message: '修改成功！',
                                buttons: []
                            });
                            setTimeout(function() {
                                dialog.close();
                                router.go('/vehicle/list');
                            }, 1000);
                        });
                    } else {
                        commonAjax.ajaxPostJson(api.vehicle.add, vehiclePost, function() {
                            var dialog = vex.dialog.alert({
                                message: '发布车辆成功！',
                                buttons: []
                            });
                            setTimeout(function() {
                                dialog.close();
                                router.go('/vehicle/list');
                            }, 1000);
                        });
                    }
                }
            });
        }
    },
    ready: function() {
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            todayBtn: 'linked',
            autoclose: true
        });
        // 设置日期控件初始值
        var date = new Date(this.vehicle.purchasingDate);
        if (this.vehicle.purchasingDate) {
            $('#datepicker').datepicker('update', date);
        }
    }
};
</script>
