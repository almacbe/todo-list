var Task = function(taskText){
	
	this.done = false;
	this.text = taskText;

	this.toString = function(){
		return "Text: " +  this.text + " Done: " + this.done;
	};

	this.doTask = function(){
		this.done = true;
	};

	this.undo = function(){
		this.done = false;
	};

	this.isDone = function(){
		return this.done;
	};

	this.hasText = function(aText){
		return this.text === aText;
	};
	
	this.toObject = function (){
			return { done: this.done , text: this.text };
	}
};