<template>
    <div class="col-md-12 area-warp">
        <div class="form-group">
            <label v-text="label" style="display: none;" v-show="label"></label>
            <div style="position: relative;">
                <input class="city-picker form-control" readonly type="text" data-toggle="city-picker" :style="style" :name="name" v-model="value">
            </div>
            <div class="errors" v-show="errors.length > 0">
                <p v-for="error in errors" v-text="error"></p>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-warning city-reset" type="button">重置</button>
            <button class="btn btn-danger city-destroy" type="button">确定</button>
            <span>测试值：{{value}}</span>
        </div>
    </div>
</template>

<script>
import '../../vendors/plugins/special/city';
import props from '../mixins/fieldProps.js';
import validator from '../mixins/validator.js';
import data from '../mixins/errorMsg.js';
export default {
    mixins: [props, data, validator],
    props: {
        width: {
            type: [Number, String],
            required: false,
            default: "200px"
        }
    },
    computed: {
        style: function() {
            return ("width:" + this.width);
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
    ready: function () {

        // 三级联动，地区组件
        var $citypicker = $('.city-picker');
        $('.city-reset').click(function() {
            $citypicker.citypicker('reset');
        });
        $('.city-destroy').click(function() {
            $citypicker.citypicker('destroy');

            // 强行驱动双向绑定数据
            var $this = $(this);
            $this.parents(".area-warp").find("input").focus().blur();
        });
        $('[data-toggle="city-picker"]').citypicker();
    }
}
</script>