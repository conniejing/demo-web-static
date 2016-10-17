<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">车单信息</h3>
            </div>
            <div class="dl-horizontal">
                <div class="box-body">
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车单号</dt>
                            <dd v-text="rentOrder.orderId"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车牌</dt>
                            <dd v-text="rentOrder.vehicle.carPlate"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车主</dt>
                            <dd v-text="rentOrder.renterName"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>订单状态</dt>
                            <dd v-if="rentOrder.status==='NEW'">等待车主审核</dd>
                            <dd v-if="rentOrder.status==='ALLOWED'">车主同意租车</dd>
                            <dd v-if="rentOrder.status==='NOTALLOWED'">车主不同意租车</dd>
                            <dd v-if="rentOrder.status==='LOANCAR'">车主已交车</dd>
                            <dd v-if="rentOrder.status==='LEASED'">用车人已拿车</dd>
                            <dd v-if="rentOrder.status==='RETURNCAR'">用车人已还车</dd>
                            <dd v-if="rentOrder.status==='FINISH'">车主已收车--完成</dd>

                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="col-md-12">

                        <button v-if="rentOrder.status==='LOANCAR'" type="button" class="btn btn-primary" @click="leased">用车人拿车</button>
                        <button v-if="rentOrder.status==='LEASED'" type="button" class="btn btn-primary" @click="returnCar">用车人还车</button>


                        <!--
                               NEW("用车人申请待审核"),不显示操作
                               ALLOWED("车主审核通过"),不显示操作
                               NOTALLOWED("车主审核未通过"),不显示操作
                               --LOANCAR("车主交车待确认"),显示 ： LEASED("用车人确认拿车")
                               --LEASED("用车人确认拿车"), 显示 ：RETURNCAR("用车人还车")
                               RETURNCAR("用车人还车"),不显示操作
                               FINISH("车主已收车--完成");不显示操作
                        -->
                        <button type="button" class="btn btn-default" onClick="history.back()">返回</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div id="map" style="width:100%;min-height:500px;"></div>
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

    //列表信息获取url
    var url = null;

    export default{
        data: function(){
            return {
                rentOrder: {
                    carId: '',
                    orderId: '',
                    renterName: '',
                    vehicle: {},
                    leaseholder: ''
                },
                //顶部消息提示数据
                callout: {
                    failed: '',
                    info: '',
                    warning: '',
                    success: '',
                    autoclose: true
                },
                areaControl: {
                    edit: false
                }
            }
        },
        components: {
            callout
        },
        route: {
            data: function(transition){
                if(common.noLoginRedirect()){
                    url = api.rentOrder.info;

                    var routePath = transition.to.path;
                    var pathArray = routePath.split('/');
                    var firstPath = pathArray[1];
                    var secPath = pathArray[2];
                    if(secPath === "edit"){
                        this.areaControl.edit = true;
                    }else{
                        this.areaControl.edit = false;
                    }

                    var orderId = transition.to.params.id;

                    url = common.replaceUrl(url, [{"key": "orderId", "value": orderId}]);

                    commonAjax.ajaxGetJson(url, null, function(data){
                        var total = {
                            "rentOrder":data
                        }
                        transition.next(total);
                    });
                }
            }
        },
        methods: {
            leased: function(){
                var self = this;
                var orderId = this.rentOrder.orderId;
                var url = common.replaceUrl(api.order.leased, [{"key": "orderId", "value": orderId}]);
                commonAjax.ajaxPUT(url, {}, function success(){
                    self.callout.success = "处理成功";
                    if(common.noLoginRedirect()){
                        url = common.replaceUrl(api.rentOrder.info, [{"key": "orderId", "value": orderId}]);
                        commonAjax.ajaxGetJson(url, null, function(data){
                            self.$set('rentOrder', data);
                        });
                    }
                }, null);
            },
            returnCar: function(){
                var self = this;
                var orderId = this.rentOrder.orderId;
                var url = common.replaceUrl(api.order.returnCar, [{"key": "orderId", "value": orderId}]);
                commonAjax.ajaxPUT(url, {}, function success(){
                    self.callout.success = "处理成功";
                    if(common.noLoginRedirect()){
                        url = common.replaceUrl(api.rentOrder.info, [{"key": "orderId", "value": orderId}]);
                        commonAjax.ajaxGetJson(url, null, function(data){
                            self.$set('rentOrder', data);
                        });
                    }
                }, null);
            }
        },
        ready: function(){
            this.map = $("#map").yfmap();
            this.map.setLuShu('天府广场','三圣乡');
        }
    }
</script>