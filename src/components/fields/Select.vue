<template>
    <div class="form-group">
        <label v-text="label" v-show="label"></label>
        <select :name="name" v-model="value" class="form-control">
            <option v-if="placeholder" value="" v-text="placeholder"></option>
            <option v-for="item in items" :value="item.id" v-text="item.text"></option>
        </select>
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
        items: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            required: false
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
    methods: {
        reset: function(){
            this.value = '';
        }
    }
}
</script>
