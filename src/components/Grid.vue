<template>
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <!-- Grid标题 -->
                <slot name="box-title"></slot>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12 form-group">
                        <!-- Grid顶部按钮 -->
                        <slot name="action-button"></slot>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-bordered table-list">
                            <thead v-el:thead>
                                <tr>
                                    <th v-for="column in gridColumns" v-text="column.title"></th>
                                    <th v-text="gridOpts.title"></th>
                                </tr>
                            </thead>
                            <tbody v-el:tbody>
                                <tr v-for="item in gridData">
                                    <td v-for="column in gridColumns" v-text="column | formate item"></td>
                                    <td v-html="gridOpts.templates | render item"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-12 tableInfo" v-if="count === 0 && !loading">
                        <i class="tableInfoIcon fa fa-bell"></i>
                        <p class="tableInfoText">没有查询到数据</p>
                    </div>
                    <loading-comp v-show="loading"></loading-comp>
                </div>
                <div class="row">
                    <pagination :page=pagination.page :page-size=pagination.pageSize :total-size=pagination.totalSize></pagination>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import Vue from 'vue';
import pagination from './Pagination.vue';
import loadingComp from './Loading.vue';
export default {
    props: {
        gridColumns: {
            type: Array,
            required: true
        },
        gridData: {
            type: Array,
            required: true
        },
        gridOpts: {
            type: Object,
            required: false,
            default: function() {
                return {}
            }
        },
        pagination: {
            type: Object,
            required: false,
            default: function() {
                return {
                    pageSize: '',
                    totalSize: '',
                    page: ''
                }
            }
        },
        loading: {
            type: Boolean,
            required: false,
            default: function() {
                return false
            }
        }
    },
    data: function() {
        return {};
    },
    components: {
        pagination,
        loadingComp
    },
    computed: {
        count: function() {
            return this.gridData.length;
        }
    },
    watch: {
        gridData: function() {
            this.$compile(this.$els.tbody);
        }
    },
    filters: {
        formate: function(column, item) {
            var dataText = item[column.name];
            if (column.type === "enum") {
                dataText = column[dataText];
            }
            if (column.filter) {
                dataText = Vue.options.filters[column.filter](dataText);
            }
            return dataText;
        },
        render: function(templates, item) {
            var tpl = '';
            for (var key in templates) {
                tpl += templates[key](item);
            }
            return tpl;
        }
    },
    methods: {},
    events: {
        setPage: function(index) {
            this.$route.query.pageNo = index;
            this.$route.query.pageSize = this.pagination.pageSize;
            var params = this.$route.query;
            router.go({
                query: params
            });
        }
    }
};
</script>
