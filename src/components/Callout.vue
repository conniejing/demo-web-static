<template>
    <div class="callout callout-danger" v-if="failed" transition="expand">
        <p>{{ failed }}</p>
    </div>
    <div class="callout callout-info" v-if="info" transition="expand">
        <p>{{ info }}</p>
    </div>
    <div class="callout callout-warning" v-if="warning" transition="expand">
        <p>{{ warning }}</p>
    </div>
    <div class="callout callout-success" v-if="success" transition="expand">
        <p>{{ success }}</p>
    </div>
</template>

<script>
var showTimeRange = 2000;
export default {
    props: ['failed', 'info', 'warning', 'success', 'autoclose'],
    watch: {
        failed: function(val) {
            var self = this;
            if (val !== null && self.autoclose === true) {
                self.autoHide('failed');
            }
        },
        info: function(val) {
            var self = this;
            if (val !== null && self.autoclose === true) {
                self.autoHide('info');
            }
        },
        warning: function(val) {
            var self = this;
            if (val !== null && self.autoclose === true) {
                self.autoHide('warning');
            }
        },
        success: function(val) {
            var self = this;
            if (val !== null && self.autoclose === true) {
                self.autoHide('success');
            }
        }
    },
    methods: {
        autoHide: function(param) {
            var self = this;
            setTimeout(function() {
                self[param] = null;
            }, showTimeRange);
        }
    }
};
</script>
