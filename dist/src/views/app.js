define(["jquery","underscore","backbone","models/todo","collections/todos","views/todo","text!templates/stats.html","common"],function(e,t,i,o,l,n,s,r){"use strict";var h=i.View.extend({el:"#todoapp",events:{"keypress #new-todo":"createOnEnter","click #toggle-all":"toggleAllComplete","click #clear-completed":"clearCompleted"},statsTemplate:t.template(s),initialize:function(){this.$allCheckbox=this.$("#toggle-all"),this.$input=this.$("#new-todo"),this.$footer=this.$("#footer"),this.$main=this.$("#main"),this.listenTo(l,"add",this.onAdd),this.listenTo(l,"all",this.render),this.listenTo(l,"reset",this.onReset),this.listenTo(l,"change:completed",this.filterOne),this.listenTo(l,"filter",this.filterAll),l.fetch()},render:function(){var e=l.completed().length,t=l.remaining().length;l.length?(this.$main.show(),this.$footer.show(),this.$footer.html(this.statsTemplate({completed:e,remaining:t})),this.$("#filters li a").removeClass("selected").filter('[href="#/'+r.TodoFilter+'"]').addClass("selected")):(this.$main.hide(),this.$footer.hide()),this.$allCheckbox.prop("checked",!t)},newTodo:function(){return new o({title:this.$input.val(),completed:!1})},createOnEnter:function(e){e.keyCode===r.ENTER_KEY&&""!=this.$input.val()&&(l.create(this.newTodo()),this.$input.val(""))},onAdd:function(e){var t=new n({model:e});t.render(),t.$el.appendTo("#todo-list")},toggleAllComplete:function(){var e=this.$allCheckbox.prop("checked");l.each(function(t){t.save({completed:e})})},clearCompleted:function(){t.invoke(l.completed(),"destroy")},onReset:function(){console.warn("onReset")},filterOne:function(e){e.trigger("visible")},filterAll:function(){l.each(this.filterOne)}});return h});