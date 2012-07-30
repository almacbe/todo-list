(function( window ) {

	var taskList = new TaskList();

	var newTask = document.getElementById('new-todo');

	newTask.addEventListener('blur', function(event){
		var task = taskList.add(this.value);
		displayTask(task);
		this.value = '';
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
		aaaaalalalalsdksmwkmskaskadmakfgjsklfsgfjklk
		dfdg
		dfsgfdg
		
	}

	var _createView = function(text){

		var view = document.createElement('div');
		view.className = 'view';

		var check = document.createElement('input');
		check.className = 'toggle';
		check.type = 'checkbox';

		var label = document.createElement('label');
		label.innerHTML = text;

		var button = _createDeleteButton();

		view.appendChild(check);
		view.appendChild(label);
		view.appendChild(button);

		return view;
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
		});

		return button;		
	}

})( window );