var TaskList = function() {

		var taskList = [];


		this.send = function(task){
			var message = JSON.stringify({task: task.toObject()}); 

			var request = new XMLHttpRequest();
			request.open("POST", 'http://192.168.1.55:3000', true);

			request.onreadystatechange = function (){
				if(request.readyState === 4 && request.status === 200){
					//callback(request.responseText);
					console.log(request.responseText);
				}
			};

			request.setRequestHeader("Content-Type", "application/json");
			request.send(message);
	
		};

		this.add = function(text) {
				var task = new Task(text);
				taskList.push(task);
				//this.send(task);
				return task;
			};

		this.remove = function(text) {
				var selected = -1;

				iterate(function(task, index) {
					if (task.hasText(text)) {
						selected = index;
					}
				});

				taskList.splice(selected, 1);
			};

		this.doTask = function(text) {
				iterate(function(task) {
					if (task.hasText(text)) {
						task.doTask();
					}
				});
			};

		this.undoTask = function(text) {
				iterate(function(task) {
					if (task.hasText(text)) {
						task.undo();
					}
				});
			};

		this.doneList = function(text) {
				var doneTasks = [];

				iterate(function(task) {
					if (task.isDone()) {
						doneTasks.push(task);
					}
				});

				return doneTasks;
			};

		this.pendingList = function(text) {
				var pendingTasks = [];

				iterate(function(task) {
					if (!task.isDone()) {
						pendingTasks.push(task);
					}
				});

				return pendingTasks;
			};


		this.allList = function(text) {
				return taskList;
			};

		this.toConsole = function() {
				var textToPrint = '';

				iterate(function(task) {
					textToPrint += task.toString();
				});

				console.log(textToPrint);
			};


		var iterate = function(operation) {
				for (var i = 0; i < taskList.length; i++) {
					operation(taskList[i], i);
				}
			};
		
	};

var aTaskList = new TaskList();