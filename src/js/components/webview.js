var utils = require('../utils');
var redirect = require('../application/redirect');
module.exports = function(name, options, item){
    var result = {}, html;
    var data = { status: false, direction: 'slient', HeadbarHeight: 0, ToolbarHeight: 0, name: name };
    var ignores = ['name', 'data', 'keepAlive', 'template', 'computed', 'watch', 'methods', 'events'];

    result.name= 'webviw';

    /**
     *  extend data objects
     */
    utils.$extend(data, options.data);
    result.data = function(){ return data; }

    /**
     *  extend template
     */
     if ( options.keepAlive == undefined ){
         options.keepAlive = true;
     }
     var template = utils.getTemplate(options.template || "template[name='" + item + "']");
     var mode = options.keepAlive ? 'v-show="status"' : 'v-if="status"';
     html = '<' + name + ' v-ref:' + name + '></' + name + '>';
     result.template =
        '<div class="web-view" ' + mode + ' transition="move" :class="direction | fixAnimation" >' +
            '<div class="web-view-content" :style="{paddingTop:HeadbarHeight,paddingBottom:ToolbarHeight}">' + template + '</div>' +
        '</div>';

     /**
      *  extend computed objects
      */
     result.computed = options.computed || {};
     var computeds = {
         $headbar: function(){ return this.$parent.$headbar; },
         $toolbar: function(){ return this.$root.$toolbar; },
         req: {
             set: function(value){ this.$root.req = value; },
             get: function(){ return this.$root.req; }
         },
         env: {
             set: function(value){ this.$root.env = value; },
             get: function(){ return this.$root.env; }
         }
     }
     utils.$extend(result.computed, computeds);

     /**
      *  extend watch objects
      */
     result.watch = options.watch || {};
     var watches = {
         "status": function(value){
             var browser = this.$parent;
             if ( value ){
                 browser.$ActiveWebview = this;
             }
         }
     }
     utils.$extend(result.watch, watches);

     /**
      *  extend method objects
      */
     result.methods = options.methods || {};
     var methods = {
         $redirect: redirect
     }
     utils.$extend(result.methods, methods);

     /**
      *  extend method objects
      */
     result.events = options.events || {};
     var events = {
         beforeload: function(){
             this.HeadbarHeight = this.$headbar.height;
             this.ToolbarHeight = this.$toolbar.height;
         },
         load: function(){
             this.direction = '';
         },
         unload: function(){
             this.direction = '';
         }
     }
     utils.$extend(result.events, events);

     for ( var opt in options ){
         if ( ignores.indexOf(opt) == -1 ){
             result[opt] = options[opt];
         }
     }

     return {
         component: result,
         html: html
     }
}
