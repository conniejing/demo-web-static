<template>
    <div class="form-group">
        <label v-text="label" v-show="label"></label>
        <input :type="fieldType" :name="name" v-model="value" class="form-control" :placeholder="placeholder">
        <div class="errors" v-show="errors.length > 0">
            <p v-for="error in errors" v-text="error"></p>
        </div>
    </div>
</template>

<script>
import props from '../mixins/fieldProps.js';
import validator from '../mixins/validator.js';
import data from '../mixins/errorMsg.js';
export default {
    mixins: [props, data, validator],
    props: {
        fieldType: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        }
    },
    watch: {
        value: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.resetError();
                if (this.validator) {
                    this.validate(newValue);
                }
                if (this.fieldType === 'email') {
                    if (!this.email(newValue)) {
                        this.errors.push(this.errorMsg.email);
                    }
                }
            }
        }
    },
    methods: {
        reset: function() {
            this.value = '';
        }
    }
};
</script>