<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">车辆列表</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table id="rentedVehicleList" class="table table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th>车牌</th>
                                        <th>购买时间</th>
                                        <th>车型</th>
                                        <th>车主</th>
                                        <th>购买价格</th>
                                        <th>发动机号</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="vehicle in rentedVehicleList">
                                        <td v-text="vehicle.carPlate"></td>
                                        <td v-text="vehicle.buyCarTime | date"></td>
                                        <td v-text="vehicle.modelId"></td>
                                        <td v-text="vehicle.userId"></td>
                                        <td v-text="vehicle.totalPrice"></td>
                                        <td v-text="vehicle.engineSn"></td>
                                        <td>
                                            <a v-link="{ path: '/rentedVehicle/info/' + vehicle.id }">详情</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
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
    import commonAjax from '../../components/commonAjax';
    import common from '../../components/common';
    import callout from '../../components/Callout.vue';
    import pagination from '../../components/Pagination.vue';
    import api from '../../components/apiConfig';
    import '../../components/filter';

    export default{
        data: function(){
            return {
                pagination: {
                    pageSize: '',   //本页多少条
                    totalSize: '',  //一共多少条
                    page: ''        //当前页数
                },
                rentedVehicleList: [],
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
                    //获取ajax请求参数
                    var params = this.$route.query;
                    //TODO 需要对接userId
                    //params.userId = common.getUserId();
                    commonAjax.ajaxGetJson(api.rentedVehicle.list, params, function(data){
                        var total = {
                            "rentedVehicleList":data.rows,
                            "pagination": {
                                "pageSize": data.pageSize,
                                "totalSize": data.totalRows,
                                "page": data.pageNo
                            }
                        }
                        transition.next(total);
                    });
                }
            }
        },
        methods: {
            //分页监听事件，用于监听分页参数变动
            //注意：事件名不能更改，利用路由的query对象传递页数参数
            setPage: function(index) {
                this.$route.query.pageNo = index;
                this.$route.query.pageSize = pageCount;
                var params = this.$route.query;
                router.go({ query: params });
            }
        }
    }
</script>