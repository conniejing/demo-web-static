<template>
    <div class="col-md-3 {{linkclass}}" v-for="n in nums">
        <select class="form-control" name="career" @change="getdata(n)" v-model="getvalue[n]">
            <option value="" v-text="introduce"></option>
            <option v-for="link in linkdata[n].data" value="{{link.vid}}" v-text="link.vdata"></option>
        </select>
    </div>
</template>

<script>
import commonAjax from '../../components/commonAjax';
import props from '../mixins/fieldProps.js';
import validator from '../mixins/validator.js';
import data from '../mixins/errorMsg.js';
export default {
    mixins: [props, data, validator],
    props: {
        nums: {
            type: [Number, String],
            required: false,
            default: "2"
        },
        linkclass: {
            type: [Number, String],
            required: false,
            default: ""
        },
        introduce: {
            type: [Number, String],
            required: false,
            default: "--请选择--"
        },
        linkurl: {
            type: [Number, String],
            required: false,
            default: ""
        }
    },
    computed: {
        //
    },
    data: function() {
        return {
            linkdata: []
        }
    },
    watch: {
        value: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.resetError();
                if (this.validator) {
                    this.validate(newValue);
                }
            }
        }
    },
    ready: function() {
        var _this = this;
        // 初始化组件默认加载第一个URL
        // 把请求的数据存到linkdata里面，更新视图
        // demo数据：http://121.42.24.196:8299/yf/linkageData.php
        commonAjax.ajaxGetJson(_this.linkurl, "", function(data) {
            var webdata = typeof(data) === "string" ? JSON.parse(data) : data;
            _this.linkdata.$set(0, webdata);
        });
    },
    methods: {
        getdata: function(i) {
            var _this = this;
            // 获取当前变化的值
            var getValue = _this.getvalue[i];
            alert(getValue);
            var order = i + 1;
            // 首先根据当前节点清除无用的信息
            _this.linkdata.splice(order, _this.linkdata.length - order);
            // 取到存到该节点上的url地址
            var geturl = _this.linkdata[i].url;
            // 加载后台返回要求传的URL
            // 把请求的数据存到linkdata里面，更新视图
            if (geturl === "" || geturl == "null" || geturl == "undefined") {
                // 如果URL为空则不发送请求
            } else {
                commonAjax.ajaxGetJson(geturl, "", function(data) {
                    var webdata = typeof(data) === "string" ? JSON.parse(data) : data;
                    _this.linkdata.$set(order, webdata);
                });
            }
        }
    }
}
</script>
