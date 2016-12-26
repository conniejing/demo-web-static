<style>
    .checkbox {
        height: 24px;
    }
    .checkbox label {
        padding-right: 20px;
    }
</style>
<template>
    <div class="form-group">
        <label v-text="label" v-show="label"></label>
        <div v-if="multiple === false" class="checkbox">
            <label>
                <input type="checkbox" :name="name" value="true" v-model="value">{{text}}
            </label>
        </div>
        <div v-else class="checkbox">            
            <label v-for="item in items">
                <input type="checkbox" :id="item.id" :name="name" :value="item.id" v-model="value">{{item.text}}
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
        multiple:{
            type:String,
            default: false
        },
        text: {
            type: String
        },
        items: {
            type: Array,
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
            this.value =  this.multiple === false ? '' : [];
            console.dir(this.multiple === false);
        }
    }
}
</script>