(function( window ) {

	var taskList = new TaskList();

	var newTask = document.getElementById('new-todo');

	newTask.addEventListener('blur', function(event){
		if(this.value != ''){
			addAndDisplayTask(this.value);
			this.value = '';
		}
	});

	var addAndDisplayTask = function(text){
		var task = taskList.add(text);
		displayTask(task);
		_updateItemsLefts();
	}

	var displayTask = function(task){
		var todolist  = document.getElementById('todo-list');

		var listItem = document.createElement('li');

		listItem.addEventListener("dblclick",function(e){
			this.className = "editing";
			//console.log(this);
		});

		var view = _createView(task.text);
		var input = _createInput(task.text);
		input.addEventListener('blur', function(event){
			var item = this.parentNode;			
			if(item.className === "")
				return;

			var div = item.getElementsByTagName('div')[0];	
			var label = div.getElementsByTagName('label')[0];
			if(this.value != ''){
				taskList.replace(label.innerHTML, this.value);
				label.innerHTML = this.value;
				this.value = this.value;
				item.className = '';
			}
		});

		listItem.appendChild(view);
		listItem.appendChild(input);
		todolist.appendChild(listItem);
	};

	var _createInput = function(text){
		var input = document.createElement('input');
		input.className = 'edit';
		input.value = text;

		return input;		
	}

	var _createView = function(text){

		var view = document.createElement('div');
		view.className = 'view';

		var check = _createCheckButton();

		var label = document.createElement('label');
		label.innerHTML = text;

		var button = _createDeleteButton();

		view.appendChild(check);
		view.appendChild(label);
		view.appendChild(button);

		return view;
	}

	var _createCheckButton = function (){
		var button = document.createElement('input');
		button.className = 'toggle';
		button.type = 'checkbox';

		button.addEventListener('click', function(e){
			var labelText = this.parentNode.children[1].innerHTML;
			var currentList = this.parentNode.parentNode;
			if (this.checked === true) {
				taskList.doTask(labelText);

				currentList.className = "completed";
			} else if (this.checked === false) {
				taskList.undoTask(labelText);
				
				currentList.className = "";
			}
			_updateItemsLefts();
		});

		return button;
	}

	var _updateItemsLefts = function (){
		
		var pendingTasksNumber = taskList.pendingList().length;

		_updateTodoCountButton(pendingTasksNumber);
		
		var doneTasksNumber = taskList.doneList().length;
		_updateClearCompletedButton(doneTasksNumber);
		
	}

	var _updateTodoCountButton = function (number){
		var todoCount = document.getElementById('todo-count');

		if (number === 1) {
			todoCount.innerHTML = '<strong>' + number + '</strong> item left';	
		}else if (number >= 1) {
			todoCount.innerHTML = '<strong>' + number + '</strong> items left';	
		}else if (number === 0) {
			todoCount.innerHTML = '<strong>No</strong> items left';	
		}	
	}

	var _updateClearCompletedButton = function (number){
		var clearCompleted = document.getElementById('clear-completed');
		
		if(number > 0){
			if( clearCompleted === null){
					clearCompleted = _createClearCompletedButton();
			}

			clearCompleted.innerHTML = 'Clear completed (' + number + ')';
		}else if(number === 0){
			if(clearCompleted !== null){
				clearCompleted.parentNode.removeChild(clearCompleted);
			}
		}
	}

	var _createClearCompletedButton = function (){
		button = document.createElement('button');
		button.id='clear-completed';

		button.addEventListener('click', _cleanCompletedTask);

		var footer = document.getElementById('footer');
		footer.appendChild(button);

		return button;
	}

	var _cleanCompletedTask = function(){
		var todos = document.getElementById('todo-list');
		var completedTodos = todos.getElementsByClassName('completed');
		for (var i = completedTodos.length - 1; i >= 0; i--) {
			var div = completedTodos[i].getElementsByTagName('div')[0];
			var label = div.getElementsByTagName('label')[0]; 
			var text = label.innerHTML;
			completedTodos[i].parentNode.removeChild(completedTodos[i]);
			taskList.remove(text);
		};
		_updateClearCompletedButton(0);
	}

	var _createDeleteButton = function(){
		var button = document.createElement('button');
		button.className = 'destroy';

		button.addEventListener('click', function(){

			var labelText = this.parentNode.children[1].innerHTML;
			taskList.remove(labelText);

			var currentListItem = this.parentNode;
			var list = currentListItem.parentNode;

			list.removeChild(currentListItem);

			_updateItemsLefts();
		});

		return button;		
	}

})( window );