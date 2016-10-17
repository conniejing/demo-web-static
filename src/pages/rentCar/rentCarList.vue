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
                    <div class="box-body form-horizontal">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label col-md-2">车型</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="params.vehicleModel">
                                            <option value="1">云蜂-V1</option>
                                            <option value="2">云蜂-V2</option>
                                            <option value="3">云蜂-V3</option>
                                            <option value="4">云蜂-V4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 btn-toolbar">
                                <button type="button" class="btn btn-primary pull-right" @click="searchSubmit">搜索</button>
                                <button type="button" class="btn btn-default pull-right" @click="searchReset">重置</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">车辆列表</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table id="vehicleList" class="table table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th>车牌</th>
                                        <th>购买时间</th>
                                        <th>车型</th>
                                        <th>车主</th>
                                        <th>车价</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="vehicle in vehicleList">
                                        <td v-text="vehicle.carPlate"></td>
                                        <td v-text="vehicle.buyCarTime"></td>
                                        <td v-text="vehicle.modelId"></td>
                                        <td v-text="vehicle.userId"></td>
                                        <td v-text="vehicle.totalPrice"></td>
                                        <td>
                                            <a v-link="{ path: '/rentCar/monitor/' + vehicle.id }">定位</a>
                                            <a v-link="{ path: '/rentCar/info/' + vehicle.id }">我要租车</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-12 tableInfo" v-if="pagination.totalSize =='0'">
                                <i class="tableInfoIcon fa fa-bell"></i>
                                <p class="tableInfoText">没有查询到数据</p>
                            </div>
                        </div>
                        <div class="row">
                            <pagination :page=pagination.page :page-size=pagination.pageSize :total-size=pagination.totalSize></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import common from '../../components/common';
    import commonAjax from '../../components/commonAjax';
    import callout from '../../components/Callout.vue';
    import pagination from '../../components/Pagination.vue';
    import api from '../../components/apiConfig';

    export default{
        data: function(){
            return {
                pagination: {
                    pageSize: '',   //本页多少条
                    totalSize: '',  //一共多少条
                    page: ''        //当前页数
                },
                vehicleList: [],
                params:{
                    vehicleModel: ''
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
            callout,
            pagination
        },
        route: {
            data: function(transition){
                if(common.noLoginRedirect()){
                    //通过路由的query对象设置初始搜索参数
                    this.params.vehicleModel = this.$route.query.vehicleModel;

                    //获取ajax请求参数
                    var params = this.$route.query;

                    //TODO 需要对接userId
                    //params.userId = common.getUserId();

                    commonAjax.ajaxGetJson(api.rentCar.list, params, function(data){

                        //调用 transition.next(data) 会为组件的 data 相应属性赋值。
                        //例如，使用 { a: 1, b: 2 } ，路由会调用
                        //component.$set('a', 1) 以及 component.$set('b', 2) 。
                        //在调用 transition.next() 前组装好data
                        var total = {
                            "vehicleList": data.rows,
                            "pagination": {
                                "pageSize": data.pageSize,
                                "totalSize": data.totalRows,
                                "page": data.pageNo
                            }
                        }
                        transition.next(total);
                    });
//                    var rentDateMs = parseInt(this.$route.query.rentDate);
//                    if(rentDateMs > 1){
//                        var date = new Date(rentDateMs);
//                        $('#rentDate').datepicker('update', date);
//                    }
                }
            }
        },
        methods: {
            searchReset: function() {
                this.params = {
                    vehicleModel: ''
                };
            },
            //搜索参数利用路由的query对象传递
            //搜索时需要附带分页信息
            searchSubmit: function() {
                this.$route.query.currentPage = 1;
                this.$route.query.pageSize = this.pagination.pageSize;
                this.$route.query.vehicleModel = this.params.vehicleModel;

                var params = this.$route.query;
                router.go({ query: params });
            }
        },
        events: {
            //分页监听事件，用于监听分页参数变动
            //注意：事件名不能更改，利用路由的query对象传递页数参数
            setPage: function(index) {
                this.$route.query.currentPage = index;
                this.$route.query.pageSize = this.pagination.pageSize;
                var params = this.$route.query;
                router.go({ query: params });
            }
        }
    }
</script>