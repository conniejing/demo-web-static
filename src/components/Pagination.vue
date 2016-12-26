<template>
    <div v-show="totalSize">
        <div class="col-md-4">
            <div class="dataTables_info">第<span v-text="page"></span>/<span v-text="totalPage"></span>页 每页<span v-text="pageCount"></span>条 共<span v-text="totalSize"></span>条记录</div>
        </div>
        <div class="col-md-8">
            <div class="dataTables_paginate">
                <ul class="pagination">
                    <li>
                        <a @click="go(1)">首页</a>
                    </li>
                    <li :class="{'disabled': page === 1 }">
                        <a v-if="page === 1">上页</a>
                        <a v-if="page > 1" @click="go(page-1)">上页</a>
                    </li>
                    <li v-for="index in totalPageArr | limitBy paginationLen pageStar" :class="{'active': page === index + 1 }">
                        <a v-if="index + 1 === page" v-text="index + 1"></a>
                        <a v-if="index + 1 !== page" v-text="index + 1" @click="go(index + 1)"></a>
                    </li>
                    <li :class="{'disabled': page === totalPage }">
                        <a v-if="page === totalPage">下页</a>
                        <a v-if="page < totalPage" @click="go(page+1)">下页</a>
                    </li>
                    <li>
                        <a @click="go(totalPage)">尾页</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
var pageCount = 20;
// export var pageCount = 10;
export default {
    props: {
        // 每页多少条
        pageCount: {
            type: [Number, String],
            default: pageCount,
            coerce: function(val) {
                return parseInt(val, 10);
            }
        },
        // 本页多少条
        pageSize: {
            type: [Number, String],
            default: 10,
            coerce: function(val) {
                return parseInt(val, 10);
            }
        },
        // 一共多少条
        totalSize: {
            type: [Number, String],
            default: 0,
            coerce: function(val) {
                return parseInt(val, 10);
            }
        },
        // 当前页数
        page: {
            type: [Number, String],
            default: 1,
            coerce: function(val) {
                return parseInt(val, 10);
            }
        }
    },
    data: function() {
        return {
            tempPage: '',
            totalPage: '', // 一共多少页
            totalPageArr: [], // 页数数组
            pageStar: 3, // 从第几条分页标签开始显示
            paginationLen: 7 // 显示多少条分页标签
        };
    },
    computed: {
        pageStar: function() {
            var preLen = Math.ceil(this.paginationLen / 2);
            var tempPre = this.page - preLen;
            if (tempPre > 0 && this.totalPage > this.paginationLen) {
                if (this.totalPage - tempPre >= this.paginationLen) {
                    return tempPre;
                } else {
                    return this.totalPage - this.paginationLen;
                }
            } else {
                return 0;
            }
        },
        totalPage: function() {
            return Math.ceil(this.totalSize / this.pageCount);
        },
        totalPageArr: function() {
            var tempArr = [];
            for (var i = 0; i < this.totalPage; i++) {
                tempArr[i] = i;
            }
            return tempArr;
        }
    },
    methods: {
        go: function(index) {
            this.$dispatch('setPage', index);
        }
    }
};
</script>
