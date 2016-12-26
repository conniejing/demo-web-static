<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
import commonAjax from './commonAjax';
import vex from '../vendors/vex/vex.combined.js';
vex.defaultOptions.className = 'vex-theme-os';
export default {
    props: {
        action: {
            type: String,
            required: true
        },
        method: {
            type: String,
            default: 'POST'
        },
        dataType: {
            type: String,
            default: 'json'
        },
        message: {
            type: String
        }
    },
    methods: {
        validateForm: function() {
            var valid = true;
            this.$children.forEach(function(field) {
                if (field.validator) {
                    if (!field.validate(field.value)) {
                        valid = false;
                    }
                }
            });
            return valid;
        },
        submitForm: function(obj) {
            console.info(this.action + " == " + this.method + " -- " + this.dataType);
            if (this.method === 'POST' && this.dataType === 'json') {
                commonAjax.ajaxPostJson(this.action, obj, function() {
                    var dialog = vex.dialog.alert({
                        message: '发布车辆成功！',
                        buttons: []
                    });
                    setTimeout(function() {
                        dialog.close();
                        router.go('/vehicle/list');
                    }, 1000);
                });
            }
            if (this.method === 'PUT' && this.dataType === 'formData') {
                commonAjax.ajaxPUTForm(this.action, obj, function() {
                    var dialog = vex.dialog.alert({
                        message: '修改成功！',
                        buttons: []
                    });
                    setTimeout(function() {
                        dialog.close();
                        router.go('/vehicle/list');
                    }, 1000);
                });
            }
        }
    }
}
</script>
