<template>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 v-else class="box-title">车辆信息</h3>
            </div>
            <div class="dl-horizontal">
                <div class="box-body">
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车牌</dt>
                            <dd v-text="vehicle.carPlate"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>购买时间</dt>
                            <dd v-text="vehicle.buyCarTime | date"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车型</dt>
                            <dd v-text="vehicle.modelId"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车主</dt>
                            <dd v-text="vehicle.userId"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>最近租赁时间</dt>
                            <dd v-text="vehicle.rentDate"></dd>
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
    export default{
        data: function(){
            return {
                vehicle: {
                    carPlate: '',
                    vehicleIdentification: '',
                    modelId: '',
                    batteryModel: '',
                    buyCarTime: '',
                    userId:''
                },
                //顶部消息提示数据
                callout: {
                    failed: '',
                    info: '',
                    warning: '',
                    success: '',
                    autoclose: true
                }
            }
        },
        components: {
            //
        },
        route: {
            data: function(transition){
                if(common.noLoginRedirect()){
                    var vehicleId = transition.to.params.id;
                    var url = common.replaceUrl(api.rentedVehicle.info, [{"key": "id", "value": vehicleId}]);
                    commonAjax.ajaxGetJson(url, null, function(data){
                        var total = {
                            "vehicle" : data
                        }
                        transition.next(total);
                    });
                }
            }
        },
        methods: {
            //
        }
    }
</script>