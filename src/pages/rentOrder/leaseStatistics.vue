<template>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">租出车单统计</h3>
            </div>
            <div class="dl-horizontal">
                <div class="box-body">
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>租出次数</dt>
                            <dd v-text="total.rentTimes + ' 次'"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>租出时间总和</dt>
                            <dd v-text="total.rentAmountMinutes + ' 分钟'"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>总里程</dt>
                            <dd v-text="total.allMeliage + ' 公里'"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>租出总费用</dt>
                            <dd v-text="total.allPrice + ' 元'"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车辆事件</dt>
                            <dd></dd>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <validator name="validation">
                        <div class="col-md-4">
                            <div class="input-group date pull-right">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control" id="datepicker" v-model="date" v-validate:date="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.date.required">{{ $validation.date.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button type="button" class="btn btn-primary" @click.stop.prevent="search">统计</button>
                        </div>
                    </validator>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import common from '../../components/common';
    import commonAjax from '../../components/commonAjax';
    import api from '../../components/apiConfig';
    export default{
        data: function(){
            return {
                total: {
                    rentTimes: 0,
                    rentAmountMinutes: 0,
                    allMeliage: 0,
                    allPrice: 0
                },
                carPlate: '',
                date: new Date(),
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

                    var params = {
                        userId: '301',
                        month: Date.parse(this.date)
                    }
                    commonAjax.ajaxGetJson(api.leaseOrder.statistics, params, function(data){

                        //调用 transition.next(data) 会为组件的 data 相应属性赋值。
                        //例如，使用 { a: 1, b: 2 } ，路由会调用
                        //component.$set('a', 1) 以及 component.$set('b', 2) 。
                        //在调用 transition.next() 组装好data
                        var total = {
                            "total":data
                        }
                        transition.next(total);
                    });
                }
            }
        },
        methods: {
            search: function() {
                var self= this;
                if (!self.$validation.invalid) {
                    var params = {
                        userId: JSON.parse(sessionStorage.getItem('user')).userId,
                        month: Date.parse(self.date)
                    }
                    commonAjax.ajaxGetJson(api.leaseOrder.statistics, params, function (data) {
                        self.$set('total', data);
                    });
                }
            }
        },
        ready: function() {
            $('#datepicker').datepicker({
                language: "zh-CN",
                format: "yyyy-mm",
                startView: 1,
                minViewMode: 1,
                autoclose: true,
                todayHighlight: true
            });
            //设置日期控件初始值
            var date = new Date();
            $('#datepicker').datepicker('update', date);
        }
    }
</script>