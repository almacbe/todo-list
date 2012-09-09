taskList = [];

exports.index = function(req, res){
  	console.log(req.body.task);
	
	//CORS headers
	res.header("Access-Control-Allow-Origin", "*");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  	res.header('Access-Control-Allow-Headers', 'Content-Type');

	var task = req.body.task || {};
	task.done  = String(task.done);
	if(task.done == null || !task.text){
		res.json({error: 'not valid request'});
		return;
	}

	taskList.push(task);

	var	message = {tasks: taskList}
    res.json(message);
};