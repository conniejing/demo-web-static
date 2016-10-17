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
                            <dd v-text="leaseOrder.orderId"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车牌</dt>
                            <dd v-text="leaseOrder.carId"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>租车人</dt>
                            <dd v-text="leaseOrder.renterName"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>订单状态</dt>
                            <dd v-if="leaseOrder.status==='NEW'">等待车主审核</dd>
                            <dd v-if="leaseOrder.status==='ALLOWED'">车主同意租车</dd>
                            <dd v-if="leaseOrder.status==='NOTALLOWED'">车主不同意租车</dd>
                            <dd v-if="leaseOrder.status==='LOANCAR'">车主已交车</dd>
                            <dd v-if="leaseOrder.status==='LEASED'">用车人已拿车</dd>
                            <dd v-if="leaseOrder.status==='RETURNCAR'">用车人已还车</dd>
                            <dd v-if="leaseOrder.status==='FINISH'">车主已收车--完成</dd>

                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="col-md-12">
                        <button v-if="leaseOrder.status==='NEW'" type="button" class="btn btn-primary"@click="allowed">通过用车申请</button>
                        <button v-if="leaseOrder.status==='NEW'" type="button" class="btn btn-primary"@click="notAllowed">拒绝用车申请</button>
                        <button v-if="leaseOrder.status==='ALLOWED'" type="button" class="btn btn-primary"@click="loanCar">车主交车</button>
                        <button v-if="leaseOrder.status==='RETURNCAR'" type="button" class="btn btn-primary"@click="finish">车主确认收车</button>
                        <!--
                            --NEW("用车人申请待审核"),显示通过或者拒绝用车申请
                            --ALLOWED("车主审核通过"),显示车主交车
                            NOTALLOWED("车主审核未通过"),不显示操作
                            LOANCAR("车主交车待确认"),不显示操作
                            LEASED("用车人确认拿车---用车中"), 不显示操作
                            --RETURNCAR("用车人还车--待确认还车"),显示：车主确认收车
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
                //顶部消息提示数据
                leaseOrder: {
                    carId: '',
                    orderId: '',
                    renterName: '',
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
            //
        },
        route: {
            data: function(transition){
                if(common.noLoginRedirect()){
                    url = api.leaseOrder.info;

                    var routePath = transition.to.path;
                    var pathArray = routePath.split('/');
                    var secPath = pathArray[2];
                    if(secPath === "edit"){
                        this.areaControl.edit = true;
                    }else{
                        this.areaControl.edit = false;
                    }

                    var orderId = transition.to.params.id;

                    url = common.replaceUrl(url, [{"key": "orderId", "value": orderId}]);
                    commonAjax.ajaxGetJson(url, null, function(data){

                        //调用 transition.next(data) 会为组件的 data 相应属性赋值。
                        //例如，使用 { a: 1, b: 2 } ，路由会调用
                        //component.$set('a', 1) 以及 component.$set('b', 2) 。
                        //在调用 transition.next() 组装好data
                        var total = {
                            "leaseOrder":data
                        }
                        transition.next(total);
                    });
                }
            }
        },
        methods: {
            allowed: function(){
                var self = this;
                var orderId = self.leaseOrder.orderId;
                var vehicleId = self.leaseOrder.carId;
                var url = common.replaceUrl(api.order.handleNewOrder, [{'key':'orderId', 'value': orderId}]);
                commonAjax.ajaxPUTForm(url, {"status":'ALLOWED'}, function success(){
                    self.callout.success = "处理成功";
                    if(common.noLoginRedirect()){
                        url = common.replaceUrl(api.leaseOrder.info, [{"key": "orderId", "value": orderId}]);
                        commonAjax.ajaxGetJson(url, null, function(data){
                            self.$set('leaseOrder', data);
                        });
                    }

                }, null);
            },
            notAllowed: function(){
                var self = this;
                var orderId = self.leaseOrder.orderId;
                var vehicleId = self.leaseOrder.carId;
                var url = common.replaceUrl(api.order.handleNewOrder, [{'key':'orderId', 'value': orderId}]);
                commonAjax.ajaxPUTForm(url, {"status":'NOTALLOWED'}, function success(){
                    self.callout.success = "处理成功";
                    if(common.noLoginRedirect()){
                        url = common.replaceUrl(api.leaseOrder.info, [{"key": "orderId", "value": orderId}]);
                        commonAjax.ajaxGetJson(url, null, function(data){
                            self.$set('leaseOrder', data);
                        });
                    }
                }, null);
            },
            loanCar: function(){
                var self = this;
                var orderId = self.leaseOrder.orderId;
                var vehicleId = self.leaseOrder.carId;
                var url = common.replaceUrl(api.order.loanCar, [{'key':'orderId', 'value': orderId}]);
                commonAjax.ajaxPUTForm(url, null, function success(){
                    self.callout.success = "处理成功";
                    if(common.noLoginRedirect()){
                        url = common.replaceUrl(api.leaseOrder.info, [{"key": "orderId", "value": orderId}]);
                        commonAjax.ajaxGetJson(url, null, function(data){
                            self.$set('leaseOrder', data);
                        });
                    }
                }, null);
            },
            finish: function(){
                var self = this;
                var orderId = self.leaseOrder.orderId;
                var vehicleId = self.leaseOrder.carId;
                var url = common.replaceUrl(api.order.finish, [{'key':'orderId', 'value': orderId}]);
                commonAjax.ajaxPUTForm(url, null, function success(){
                    self.callout.success = "处理成功";
                    if(common.noLoginRedirect()){
                        url = common.replaceUrl(api.leaseOrder.info, [{"key": "orderId", "value": orderId}]);
                        commonAjax.ajaxGetJson(url, null, function(data){
                            self.$set('leaseOrder', data);
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