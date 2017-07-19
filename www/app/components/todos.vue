<style scoped lang='stylus'>
	.cur{
		text-decoration: line-through;
	}
</style>
<template>
   <li>
   	  <input type="checkbox" @click="checkBox(item)" ref="box" v-model="item.done">
      <span v-if="!isShowTxt" @dblclick="showInput" :class="{cur : item.done}">{{item.title}}</span>
      <input type="text" v-model="item.title" v-if="isShowTxt" v-focus @blur="hideInput(item)">
      <button @click="del(item)">X</button>
   </li>
</template>
<script>
export default{
	props:["item"],
	data(){
		return{
			isShowTxt : false
		}
	},
	methods:{
		del(item){
			this.$store.dispatch("DEL",{
				id : item.id
			})
		},
		showInput(){
			this.isShowTxt = !this.isShowTxt
		},
		hideInput(item){
			this.$store.dispatch("CHANGETITLE",{
				id : item.id,
				title : item.title
			})
			this.showInput()
		},
		checkBox(item){
			// console.log(this.$refs.box.checked);
			// console.log(typeof  this.$refs.box.checked);
			this.$store.dispatch("CHANGEDONE",{
				id : item.id,
				done : this.$refs.box.checked
			})
		}
	},
	directives :{
		focus:{
			inserted : function(el){
				el.focus()
			}
		}
	}
}
</script>
