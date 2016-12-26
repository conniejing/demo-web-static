<style>
.radio {
    height: 24px;
}
.radio label {
    padding-right: 20px;
}
</style>
<template>
    <div class="form-group">
        <label v-text="label" v-show="label"></label>
        <div class="radio">
            <label v-for="item in items">
                <input :name="name" type="radio" :value="item.id" v-model="value">{{item.text}}
            </label>
        </div>
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
