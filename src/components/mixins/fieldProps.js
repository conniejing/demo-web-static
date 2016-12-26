export default {
    props: {
        label: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        value: {
            required: false,
            default: ''
        },
        validator: {
            type: Object
        }
    }
}