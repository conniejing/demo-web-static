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
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>开始时间</label>
                                    <input id="startTime" type="text" class="form-control" v-model="params.startTime" />
                                </div>
                                <div class="form-group">
                                    <label>结束时间</label>
                                    <input id="endTime" type="text" class="form-control" v-model="params.endTime" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>车牌</label>
                                    <input type="text" class="form-control" placeholder="" v-model="params.carPlate">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>处理状态</label>
                                    <select class="form-control" v-model="params.eventStatus">
                                        <option value="UNHANDLE">待处理</option>
                                        <option value="HANDLE">已处理</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 btn-toolbar">
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
export default {
    data: function() {
        return {
            gridColumns: [{
                title: '车牌',
                name: 'carPlate'
            }, {
                title: '上报时间',
                name: 'time',
                filter: 'date'
            }, {
                title: '内容',
                name: 'content'
            }, {
                title: '处理状态',
                name: 'handleStatus',
                type: 'enum',
                HANDLE: '处理中'
            }],
            options: {
                title: '操作',
                templates: {
                    info: function(item){
                        return `<a v-link="{ path: '/vehicle/event/id?id=${item.id}'}">详情</a>`;
                    }
                }
            },
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
                commonAjax.ajaxGetJson(api.vehicle.eventList, params, function(data) {
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
        $('#startTime').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            autoclose: true,
            minuteStep: 1
        });
        $('#endTime').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            autoclose: true,
            minuteStep: 1
        });
        this.initDateTime();
        // 结束时间需大于开始时间
        $(document).on('change', '#startTime', function() {
            var TimeValue = $(this).val();
            if (TimeValue !== '') {
                $('#endTime').datetimepicker('setStartDate', TimeValue);
            }
        });
        $(document).on('change', '#endTime', function() {
            var TimeValue = $(this).val();
            if (TimeValue !== '') {
                $('#startTime').datetimepicker('setEndDate', TimeValue);
            }
        });
    }
};
</script>
