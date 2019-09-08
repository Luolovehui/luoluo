(function (Vue) {
	var STORAGE_KEY='items-vue.js'
	const itemStorage={
		fetch:function(){
			return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
         
		},
		save:function(items){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(items))

		}
	}
	const items = [
		{ id: 1, content: '笨笨', completed: true },
		{ id: 2, content: '瞅瞅', completed: true },
		{ id: 3, content: '猫咪', completed: false }

	]
	Vue.directive('app-focus', {
		inserted(el, binding) {
			el.focus()

		}
	})
	var app = new Vue({
		el: '#todoapp',
		data: {
			items:itemStorage.fetch(),
			currentItem: 'null',
			filterStatus: 'all'

		},
		watch: {
			items:{
				deep:'true',
				handler:function(newValue,oldValue){
					itemStorage.save(newValue)

				}
				

			}
			
		},
		computed: {
			filterItems() {
				switch (this.filterStatus) {
					case 'active':
						return this.items.filter(item => !item.completed)
						break
					case 'completed':
						return this.items.filter(item => item.completed)
						break
					default:
						return this.items
						
				}

			},
			remaining() {
				// const bb=this.items.filter(function(item){
				// 	return !item.completed
				// })
				// return bb.length
				return this.items.filter((item) => !item.completed).length
			},
			toggleAll: {
				get() {
					return this.remaining == 0

				},
				set(newValue) {
					this.items.forEach((item) => {
						item.completed = newValue

					});

				}
			}
		},

		methods: {
			finishEdit(item, index, event) {
				const content = event.target.value.trim()
				if (!content) {
					this.removeItem(index)
					return
				} else {
					item.content = content
				}
				this.currentItem = null
			},
			cancelEdit() {
				this.currentItem = null

			},
			toEdit(item) {
				this.currentItem = item
			},
			removeAll() {
				this.items = this.items.filter(item =>
					!item.completed
				)
			},
			removeItem(index) {
				this.items.splice(index, 1)

			},
			addItems(event) {
				const content = event.target.value.trim()
				if (!content.length) {
					return
				} else {
					const id = this.items.length + 1
					this.items.push(
						{ id, content, completed: false }
					)
				}
				event.target.value = ''

			}
		},
		directives: {
			'todo-focus': {
				update(el, binding) {
					if (binding.value) {
						el.focus()
					}

				},
			}
		}
	})
	window.onhashchange = function () {
		console.log('hash改变了', window.location.hash)
		const hash = window.location.hash.substr(2) || 'all'
		app.filterStatus = hash
	}
	window.onhashchange()
})(Vue);
