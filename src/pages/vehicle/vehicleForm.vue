<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 v-if="$route.params.id" class="box-title">修改车辆</h3>
                <h3 v-else class="box-title">新增车辆</h3>
            </div>
            <v-form v-ref:vehicleForm :action="formParam.submitUrl" :method="formParam.submitMethod" :data-type="formParam.dataType" :message="formParam.message">
                <div class="box-body">
                    <div class="col-md-6">
                        <v-input label="车牌" field-type="text" name="carPlate" placeholder="川A ABC12" :value.sync="vehicle.carPlate" :validator="{ required: true}"></v-input>
                    </div>
                    <div class="col-md-6">
                        <v-input label="车架号" field-type="text" name="vin" :value.sync="vehicle.vin" :validator="{ required: true, minlength: 10}"></v-input>
                    </div>
                    <div class="col-md-6">
                        <v-select label="车型" name="modelId" :value.sync="vehicle.modelId" placeholder="--请选择车型--" :items="vehicleModelList" :validator="{ required: true }"></v-select>
                    </div>
                    <div class="col-md-6">
                        <v-select label="电池型号" name="batteryModel" :value.sync="vehicle.batteryModel" placeholder="--请选择电池型号--" :items="batteryModelList" :validator="{ required: true }"></v-select>
                    </div>
                    <div class="col-md-6">
                        <vue-datetime-picker label="购买时间" v-ref:picker1 name="picker1" :value.sync="vehicle.buyBatteryTime" language="zh-CN" :validator="{ required: true }">
                        </vue-datetime-picker>
                    </div>
                    <div class="col-md-6">
                        <v-input label="车辆价格" field-type="number" name="totalPrice" placeholder="川A ABC12" :value.sync="vehicle.totalPrice" :validator="{ required: true, min: 0}"></v-input>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary" @click.stop.prevent="onSubmit">保存</button>
                        <button type="button" class="btn btn-default" onClick="history.back()">取消</button>
                    </div>
                </div>
            </v-form>
        </div>
        <!-- <div class="box box-primary collapsed-box">
                   <div class="box-header with-border">
                       <h3 v-if="$route.params.id" class="box-title">修改车辆</h3>
                       <h3 v-else class="box-title">新增车辆</h3>
                       <div class="box-tools pull-right">
                           <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                       </div>
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
                                           <option v-for="batteryModel in batteryModelList" :value="batteryModel.id" v-text="batteryModel.text"></option>
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
                               <div class="col-md-12">
                                   <div class="form-group">
                                       <label>图片</label>
                                       <input type="file" class="form-control" accept="image/*">
                                   </div>
                               </div>
                           </div>
                           <div class="box-footer">
                               <div class="col-md-12">
                                   <button type="submit" class="btn btn-primary" @click.stop.prevent="onSubmit">保存</button>
                                   <button type="button" class="btn btn-default" onClick="history.back()">取消</button>
                               </div>
                           </div>
                       </form>
                   </validator>
               </div>  -->
    </section>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import api from '../../components/apiConfig';
import common from '../../components/common';
import '../../components/commonValidator';
import '../../components/filter';
import vex from '../../vendors/vex/vex.combined.js';
import formComps from '../../components/mixins/formComps.js';
vex.defaultOptions.className = 'vex-theme-os';
// json假数据
import batteryModelJson from './batteryModel.json';
var vehicleId;
export default {
    mixins: [formComps],
    data: function() {
        return {
            vehicle: {
                id: '',
                userId: '', // 车主ID
                carPlate: '', // 车牌
                totalPrice: '', // 车辆价格
                buyBatteryTime: null /*new Date().getTime()*/ , // 电池购买时间
                insuranceTime: null /*new Date().getTime()*/, // 保险期限
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
            batteryModelList: [],
            vehicleModelList: [{
                id: 105259,
                text: '云蜂-V1'
            }, {
                id: 2,
                text: '云蜂-V2'
            }, {
                id: 3,
                text: '云蜂-V3'
            }, {
                id: 4,
                text: '云蜂-V4'
            }],
            formParam: {
                submitUrl: '',
                submitMethod: '',
                dataType: '',
                message: ''
            }
        };
    },
    route: {
        data: function(transition) {
            var data = this.$data;
            if (common.noLoginRedirect()) {
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
                    // Test coding begin
                    data.formParam = {
                            submitUrl: api.vehicle.update,
                            submitMethod: 'PUT',
                            dataType: 'formData',
                            message: '修改成功！'
                        }
                        // Test coding end
                } else {
                    // Test coding begin
                    data.formParam = {
                            submitUrl: api.vehicle.add,
                            submitMethod: 'POST',
                            dataType: 'json',
                            message: '发布车辆成功！'
                        }
                        // Test coding end
                }
                transition.next(data);
            }
        }
    },
    methods: {
        /*onSubmit: function() {
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
        }*/
        onSubmit: function() {
            var self = this;
            var vehiclePost = Object.assign({}, self.vehicle);
            vehiclePost.userId = common.getUserId();
            vehiclePost.buyCarTime = Date.parse(self.vehicle.buyCarTime);
            vehiclePost.buyBatteryTime = Date.parse(self.vehicle.buyBatteryTime);
            if (this.$refs.vehicleform.validateForm()) {
                this.$refs.vehicleform.submitForm(vehiclePost);
            }
        }
    }
};
</script>
