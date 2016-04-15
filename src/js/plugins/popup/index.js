export let POPUP = {
    name: 'sp-ui-popup',
    template: require('./popup.html'),
    data(){ return { html: '', status: false, showHead: false, heightObject: {} } },
    methods: {
        $constructor(html, showHead=false, full=false){
            this.showHead = showHead;
            this.$parent.nextTick(() => {
                if(full){
                    this.heightObject = {
                        height: '100%'
                    }
                }

                this.$parent.mask = true;
                this.status = true;
                this.html = html
            });
        },
        close(){
            this.status = false;
            this.$parent.prevTick(() => {
                this.html = '';
                this.$emit('popup:close');
            })
        }
    },
    events: {
        "modal:maskclick": function(){
            this.close();
        }
    }
}
