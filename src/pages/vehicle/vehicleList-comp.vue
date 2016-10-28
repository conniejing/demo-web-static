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
                                    <label>车牌</label>
                                    <input type="text" class="form-control" placeholder="" v-model="params.carPlate">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>车辆审核状态</label>
                                    <select class="form-control" v-model="params.auditStatus">
                                        <option value="UNAUDITED">待审核</option>
                                        <option value="AUDIT">已审核</option>
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
            <grid :grid-columns=gridColumns :grid-data=vehicleList :grid-opts=options :pagination=pagination :loading=loading>
                <h3 slot="box-title" class="box-title">车辆列表</h3>
                <div slot="action-button">
                    <button type="button" class="btn btn-default halfCircle" v-link="{ path: '/vehicle/add' }">新增 <i class="fa fa-plus"></i></button>
                </div>
            </grid>
        </div>
    </section>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import common from '../../components/common';
import callout from '../../components/Callout.vue';
import grid from '../../components/Grid.vue';
import api from '../../components/apiConfig';
import '../../components/filter';
import vex from '../../vendors/vex/vex.combined.js';
vex.defaultOptions.className = 'vex-theme-os';
export default {
    data: function() {
        return {
            gridColumns: [{
                title: '车牌',
                name: 'carPlate'
            }, {
                title: '购买时间',
                name: 'buyCarTime',
                filter: 'date'
            }, {
                title: '车型',
                name: 'modelId'
            }, {
                title: '电池型号',
                name: 'batteryModel'
            }, {
                title: '车辆审核状态',
                name: 'auditStatus',
                type: 'enum',
                UNAUDITED: '待审核',
                AUDIT: '已审核'
            }, {
                title: '保险期限',
                name: 'insuranceTime',
                filter: 'date'
            }],
            options: {
                title: "操作",
                templates: {
                    info: function(item) {
                        return `<a href='#!/vehicle/info/${item.id}'>详情</a>`;
                    },
                    edit: function(item) {
                        if(sessionStorage.getItem('userRole') !== 'admin'){
                            return `<a href='#!/vehicle/edit/${item.id}'>修改</a>`;
                        }
                        return '';
                    },
                    remove: function(item) {
                        if(sessionStorage.getItem('userRole') !== 'admin'){
                            return `<a href='javascript:void(0);' @click.stop.prevent='$parent.remove(${item.id})'>删除</a>`;
                        }
                        return '';
                    },
                    monitor: function(item) {
                        return `<a href='#!/vehicle/monitor/${item.id}'>定位</a>`;
                    },
                    event: function(item) {
                        return `<a href='#!/vehicle/event?carPlate=${item.carPlate}'>事件</a>`;
                    }
                }
            },
            vehicleList: [],
            pagination: {
                pageSize: '',
                totalSize: '',
                page: ''
            },
            loading: true,
            params: {
                carPlate: '',
                auditStatus: ''
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
        callout,
        grid
    },
    route: {
        data: function(transition) {
            var self = this;
            if (common.noLoginRedirect()) {
                // 通过路由的query对象设置初始搜索参数
                this.params.carPlate = this.$route.query.carPlate;
                this.params.auditStatus = this.$route.query.auditStatus;
                // 获取ajax请求参数
                var params = this.$route.query;
                params.userId = '301';
                // TODO 需要对接userId
                // params.userId = common.getUserId();
                self.loading = true;
                setTimeout(function(){
                    commonAjax.ajaxGetJson(api.vehicle.list, params, function(data) {
                        var total = {
                            'vehicleList': data.rows,
                            'pagination': {
                                'pageSize': data.pageSize,
                                'totalSize': data.totalRows,
                                'page': data.pageNo
                            },
                            'loading': false
                        };
                        transition.next(total);
                    });
                },3000);
                
            }
        }
    },
    methods: {
        searchReset: function() {
            this.params = {
                carPlate: null,
                auditStatus: null
            };
        },
        searchSubmit: function() {
            this.$route.query.pageNo = 1;
            this.$route.query.pageSize = this.pagination.pageSize;
            this.$route.query.carPlate = this.params.carPlate;
            this.$route.query.auditStatus = this.params.auditStatus;
            var params = this.$route.query;
            console.dir(params);
            router.go({
                query: params
            });
        },
        remove: function(id) {
            if (common.noLoginRedirect()) {
                var self = this;
                var url = api.vehicle.remove;
                vex.dialog.confirm({
                    message: '确认删除？',
                    callback: function(value) {
                        if (value) {
                            commonAjax.ajaxDELETE(url + id, null, function() {
                                // 此回调函数会触发两次，因为后台返回格式未按照要求返回
                                var dialog = vex.dialog.alert({
                                    message: '删除成功！',
                                    buttons: []
                                });
                                setTimeout(function() {
                                    dialog.close();
                                    // router.go('/vehicle/list');
                                }, 1000);
                                var params = self.$route.query;
                                commonAjax.ajaxGetJson(api.vehicle.list, params, function(data) {
                                    var total = {
                                        'vehicleList': data.rows,
                                        'pagination': {
                                            'pageSize': data.pageSize,
                                            'totalSize': data.totalRows,
                                            'page': data.pageNo
                                        }
                                    };
                                    self.$set('vehicleList', total.vehicleList);
                                    self.$set('pagination', total.pagination);
                                });
                            });
                        }
                    }
                });
            }
        }
    }
};
</script>
