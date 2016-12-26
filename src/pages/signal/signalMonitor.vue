<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-default">
                    <div class="box-header with-border">
                        <h3 class="box-title">搜索</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>选择车辆的VIN码</label>
                                    <select class="form-control" v-model="params.eventStatus">
                                        <option value="KNB20198752343234">KNB20198752343234</option>
                                        <option value="WDB2012012DK23KR0">WDB2012012DK23KR0</option>
                                        <option value="DES9384728EK3OFM4">DES9384728EK3OFM4</option>
                                        <option value="WOD2493041F94MR42">WOD2493041F94MR42</option>
                                        <option value="OEK4825831F244F4F">OEK4825831F244F4F</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 30px;">
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="整车数据">
                                    <option value="">车辆状态</option>
                                    <option value="">充电状态</option>
                                    <option value="">运行模式</option>
                                    <option value="">车速</option>
                                    <option value="">累计里程</option>
                                    <option value="">总电压</option>
                                    <option value="">总电流</option>
                                    <option value="">SOC</option>
                                    <option value="">DC-DC状态</option>
                                    <option value="">档位</option>
                                    <option value="">绝缘电阻</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="驱动电机数据">
                                    <option value="">驱动电机个数</option>
                                    <option value="">驱动电机总成信息列表</option>
                                    <option value="">驱动电机序号</option>
                                    <option value="">驱动电机状态</option>
                                    <option value="">驱动电机控制器温度</option>
                                    <option value="">驱动电机转速</option>
                                    <option value="">驱动电机转矩</option>
                                    <option value="">驱动电机温度</option>
                                    <option value="">电机控制器输入电压</option>
                                    <option value="">电机控制器直流母线电流</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="燃料电池数据">
                                    <option value="">燃料电池电压</option>
                                    <option value="">燃料电池电流</option>
                                    <option value="">燃料消耗率</option>
                                    <option value="">燃料电池温度探针总数</option>
                                    <option value="">探针温度值</option>
                                    <option value="">氢系统中最高温度</option>
                                    <option value="">氢系统中最高温度探针代号</option>
                                    <option value="">氢气最高浓度</option>
                                    <option value="">氢气最高浓度传感器代号</option>
                                    <option value="">氢气最高压力</option>
                                    <option value="">氢气最高压力传感器代号</option>
                                    <option value="">高压DC/DC 状态</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="发动机数据">
                                    <option value="">发动机状态</option>
                                    <option value="">曲向转速</option>
                                    <option value="">燃料消耗率</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="车辆位置数据">
                                    <option value="">定位状态</option>
                                    <option value="">经度</option>
                                    <option value="">纬度</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="极值数据">
                                    <option value="">最高电压电池子系统号</option>
                                    <option value="">最高电压电池单体代号</option>
                                    <option value="">电池单体电压最高值</option>
                                    <option value="">最低电压电池子系统号</option>
                                    <option value="">最低电压电池单体代号</option>
                                    <option value="">电池单体电压最低值</option>
                                    <option value="">最高温度子系统号</option>
                                    <option value="">最高温度探针序号</option>
                                    <option value="">最高温度值</option>
                                    <option value="">最低温度子系统号</option>
                                    <option value="">最低温度探针序号</option>
                                    <option value="">最低温度值</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="selectpicker" multiple data-actions-box="true" title="报警数据">
                                    <option value="">最高报警等级</option>
                                    <option value="">通用报警标志</option>
                                    <option value="">可充电储能装置故障总数N1</option>
                                    <option value="">可充电储能装置故障代码列表</option>
                                    <option value="">驱动电机故障总数N2</option>
                                    <option value="">驱动电机故障代码列表</option>
                                    <option value="">发动机故障总数N3</option>
                                    <option value="">发动机故障列表</option>
                                    <option value="">其他故障总数N4</option>
                                    <option value="">其他故障代码列表</option>
                                </select>
                            </div>
                            <div class="col-md-12 btn-toolbar" style="margin-top: 20px;">
                                <button type="button" class="btn btn-primary pull-right" @click="searchSubmit">搜索</button>
                                <button type="button" class="btn btn-default pull-right" @click="searchReset">重置</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <grid :grid-columns=gridColumns :grid-data=vehicleEventList :grid-opts=options :pagination=pagination :loading=loading>
                <h3 slot="box-title" class="box-title">车辆事件列表</h3>
            </grid>
        </div>
    </section>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import grid from '../../components/Grid.vue';
import api from '../../components/apiConfig';
import common from '../../components/common';
import '../../components/filter';
import '../../vendors/plugins/special/bootstrap-select';
import '../../components/Loading.vue';
import '../../vendors/plugins/special/classie';
export default {
    data: function() {
        return {
            gridColumns: [{
                title: '节点名',
                name: 'eleName'
            }, {
                title: '信号名',
                name: 'signalName'
            }, {
                title: '信号值',
                name: 'signalValue'
            }],
            vehicleEventList: [],
            pagination: {
                pageSize: '',
                totalSize: '',
                page: ''
            },
            loading: true,
            params: {
                carPlate: null,
                startTime: '',
                endTime: '',
                eventStatus: ''
            },
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
        grid
    },
    route: {
        data: function(transition) {
            var self = this;
            if (common.noLoginRedirect()) {
                this.params.carPlate = this.$route.query.carPlate;
                this.params.startTime = this.$route.query.startTime;
                this.params.endTime = this.$route.query.endTime;
                this.params.eventStatus = this.$route.query.eventStatus;
                // 获取ajax请求参数
                var params = this.$route.query;
                // TODO 需要对接userId
                // params.userId = common.getUserId();
                self.loading = true;
                commonAjax.ajaxGetJson("../src/pages/signal/signalMonitor.json", params, function(data) {
                    var result = {
                        'vehicleEventList': data.rows,
                        'pagination': {
                            'pageSize': data.pageSize,
                            'totalSize': data.totalRows,
                            'page': data.pageNo
                        },
                        'loading': false
                    };
                    transition.next(result);
                });
                this.initDateTime();
            }
        }
    },
    methods: {
        searchReset: function() {
            this.params = {
                carPlate: null,
                eventStatus: null,
                startTime: undefined,
                endTime: undefined
            };
        },
        searchSubmit: function() {
            this.$route.query.pageNo = 1;
            this.$route.query.pageSize = this.pagination.pageSize;
            this.$route.query.carPlate = this.params.carPlate;
            this.$route.query.eventStatus = this.params.eventStatus;
            if (this.params.startTime !== '' && this.params.startTime !== undefined) {
                this.$route.query.startTime = Date.parse(this.params.startTime);
            } else {
                this.$route.query.startTime = this.params.startTime;
            }
            if (this.params.endTime !== '' && this.params.endTime !== undefined) {
                this.$route.query.endTime = Date.parse(this.params.endTime);
            } else {
                this.$route.query.endTime = this.params.endTime;
            }
            var params = this.$route.query;
            router.go({
                query: params
            });
        },
        initDateTime: function() {
            // 设置日期控件初始值
            var startTime = parseInt(this.$route.query.startTime, 10);
            if (startTime > 1) {
                var normaldate = common.formatDateTime(startTime);
                this.params.startTime = normaldate;
                $('#startTime').datetimepicker('update');
                $('#endTime').datetimepicker('setStartDate', normaldate);
            }
            var endTime = parseInt(this.$route.query.endTime, 10);
            if (endTime > 1) {
                normaldate = common.formatDateTime(endTime);
                this.params.endTime = normaldate;
                $('#endTime').datetimepicker('update');
                $('#startTime').datetimepicker('setEndDate', normaldate);
            }
        },
        setEndTime: function() {
            alert(1);
        }
    },
    events: {
        // 分页监听事件，用于监听分页参数变动
        // 注意：事件名不能更改，利用路由的query对象传递页数参数
        setPage: function(index) {
            this.$route.query.pageNo = index;
            this.$route.query.pageSize = this.pagination.pageSize;
            var params = this.$route.query;
            router.go({
                query: params
            });
        }
    },
    ready: function() {
        // To style only <select>s with the selectpicker class
        // http://silviomoreto.github.io/bootstrap-select/
        $('.selectpicker').selectpicker();

        setTimeout(function () {
            var tr = $(".table tbody").find("tr");
            for (var i in tr) {
                if(i == 0) tr.eq(i).find("td").eq(0).attr("rowspan","11");
                if(i > 0 && i < 11) tr.eq(i).find("td").eq(0).remove();

                if(i == 11) tr.eq(i).find("td").eq(0).attr("rowspan","10");
                if(i > 11 && i < 21) tr.eq(i).find("td").eq(0).remove();

                if(i == 21) tr.eq(i).find("td").eq(0).attr("rowspan","12");
                if(i > 21 && i < 33) tr.eq(i).find("td").eq(0).remove();

                if(i == 33) tr.eq(i).find("td").eq(0).attr("rowspan","3");
                if(i > 33 && i < 36) tr.eq(i).find("td").eq(0).remove();

                if(i == 36) tr.eq(i).find("td").eq(0).attr("rowspan","3");
                if(i > 36 && i < 39) tr.eq(i).find("td").eq(0).remove();

                if(i == 39) tr.eq(i).find("td").eq(0).attr("rowspan","3");
                if(i > 39 && i < 42) tr.eq(i).find("td").eq(0).remove();

                if(i == 42) tr.eq(i).find("td").eq(0).attr("rowspan","9");
                if(i > 42 && i < 51) tr.eq(i).find("td").eq(0).remove();

                if(i == 51) tr.eq(i).find("td").eq(0).attr("rowspan","6");
                if(i > 51 && i < 57) tr.eq(i).find("td").eq(0).remove();
            }
        },200);

//        function loaddata() {
//            common.UI.setcornerload();
//            setTimeout(function () {
//                common.UI.setcornerload();
//            },500);
//        }
//        setInterval(loaddata,4000);

    }
};
</script>
