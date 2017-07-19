import Vue from 'vue';
import Vuex from 'vuex';
import uiComponents from './ui-components/ui-components.js'
import app from './app.vue';
import createLogger from './logger/logger.js';
Vue.use(uiComponents);
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		todos:[]
	},
	mutations:{
		GETALL(state,payload){
			state.todos = payload.mapList
		},
		DEL(state,payload){
			state.todos = payload.mapList
		},
		CHANGETITLE(state,payload){
			state.todos = payload.mapList
		},
		CHANGEDONE(state,payload){
			state.todos = payload.mapList
		},
		ADD(state,payload){
			state.todos = payload.mapList
		}

	},
	actions:{
		GETALL(context,payload){
			$.get("/getall" , function(data){
				context.commit("GETALL",data)
			})
		},
		DEL(context,payload){
			// console.log(payload);
			$.get("/del",payload , function(data){
				context.commit("DEL",data)
			})
		},
		CHANGETITLE(context,payload){
			console.log(payload);
			$.get("/changetitle",payload, function(data){
				context.commit("CHANGETITLE",data)
			})
		},
		CHANGEDONE(context,payload){
			console.log(payload);
			$.get("/changedone",{id : payload.id,done:payload.done ? 1 : -1}, function(data){
				context.commit("CHANGEDONE",data)
			})
		},
		ADD(context,payload){
			console.log(payload);
			$.get("/add",{id : payload.id,title:payload.title}, function(data){
				context.commit("ADD",data)
			})
		}
	},
	getters:{
		yizuo : function(state){
			return state.todos.filter(function(item){
				return item.done == true
			})
		},
		weizuo : function(state){
			return state.todos.filter(function(item){
				return item.done == false
			})
		}
	},
	plugins: [createLogger()]
});
new Vue({
	el:"#app",
	store,
	components:{
		app
	}
})