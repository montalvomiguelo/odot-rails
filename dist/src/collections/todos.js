define(["backbone","backboneLocalStorage","models/todo"],function(e,t,o){"use strict";var n=e.Collection.extend({model:o,localStorage:new t("odot"),completed:function(){return this.filter(function(e){return e.get("completed")})},remaining:function(){return this.without.apply(this,this.completed())}});return new n});