(function( window ) {

	var taskList = new TaskList();

	var newTask = document.getElementById('new-todo');

	newTask.addEventListener('blur', function(event){
		if(this.value != ''){
			var task = taskList.add(this.value);
			displayTask(task);
			this.value = '';
			_updateItemsLefts();
		}
	});

	var displayTask = function(task){
		var todolist  = document.getElementById('todo-list');

		var listItem = document.createElement('li');

		var view = _createView(task.text);
		var input = _createInput(task.text);

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
		
		clearCompleted.innerHTML = 'Clear completed (' + number + ')';			
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