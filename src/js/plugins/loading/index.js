import {
    on,
    off
} from '../../utils/index';
export let LOADING = {
    name: 'sp-ui-loading',
    template: require('../toast/toast.html'),
    data() {
        return {
            icon:'',
            text: '',
            status: false
        }
    },
    methods: {
        $constructor(text='', icon='<i class="iconfont icon-loading"></i>') {
            this.$parent.nextTick(() => {
                this.$parent.mask = false;
                this.text = text;
                this.icon = icon;
                this.status = true;
            });
        },

        hide: function(){
            this.status = false;
            this.$parent.prevTick(() => {
                this.$emit('loading:hide');
            });
        }
    }
};