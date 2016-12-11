var express = require('express'),
	logger = require('../../config/logger'),
	passportService = require('../../config/passport'),
    passport = require('passport'),
  	router = express.Router(),  
	mongoose = require('mongoose'),
    Todos = mongoose.model('Todos');

var requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app) {
  	app.use('/api/todos', router);  


	router.route('/')	
		.get(function (req, res) {
				logger.log("Get all todos","verbose");	
				var query = Todos.find()
				.sort(req.query.order)
				.exec()
				.then(function (result) {
					res.status(200).json(result);
					})
				.catch(function(err){
					return next(err);
					});
				})

		.post(function (req, res) {
			logger.log('Create todo', 'verbose');
			console.log("reached at server");
			var todos = new Todos(req.body);
			console.log("todos : " + todos);
			todos.save()
			.then(function (result) {
				res.status(201).json(result);
				console.log("status 201")
				})
			.catch(function(err){
				console.log("some error: " + err)
				return next(err);
				})
			})

		.put(function (req, res, next) {
				
     	 var query = Todos.findById(req.body._id)
        .exec()
        .then(function (todos) {
					console.log("Todos: " + todos)
					console.log("req.body task: " + req.body.task)
					console.log("req.body user: " + req.body.user)
					console.log("req.body.priority: " + req.body.priority)
					console.log("req.body.completed: " + req.body.completed)
					console.log("req.body.dueDate: " + req.body.dueDate)
        // var query = User.findById(req.params.id)
        // .exec()
        // .then(function (user) {
          if (req.body.task !== undefined) {
            todos.task = req.body.task;
          };
          if (req.body.user !== undefined) {
            todos.user = req.body.user;
          };
          if (req.body.priority !== undefined) {
            todos.priority = req.body.priority;
          };
          if (req.body.completed !== undefined) {
            todos.completed = req.body.completed;
          };
          if (req.body.dueEntered !== undefined) {
            todos.dueEntered = req.body.dueEntered;
          };
		 			if (req.body.dueDate !== undefined) {
            todos.dueDate = req.body.dueDate;
          };
					console.log("todos: " + todos)
          return todos.save()
        .then(function (todos) {
					res.status(201).json(todos);
					console.log("status 201")
				})
					.catch(function(err){
					console.log("some error: " + err)
					return next(err);
				})
			})

		});

	router.route('/:id')	
		.get(function (req, res) {
			logger.log('Get the todo ' + req.params.id, 'verbose');
			var query = Todos.findById(req.params.id)
			.exec()
			.then(function (result) {
				res.status(200).json(result);
				})
			.catch(function(err) {
				return next(err);
				})
			})
				

		.delete(function (req, res, next) {
            logger.log('Delete todo ' + req.params.id, 'verbose');
            var query = Todos.remove({ _id: req.params.id })
            .exec()
            .then(function (result) {
           		 res.status(204).json({ message: 'Record deleted' });
           	 	})
           .catch(function (err) {
           		 return next(err);
           		});
          	 })

		.put(function (req, res) {
	  		logger.log('Update todos ' + req.params.id, 'verbose');
      		var query = Todos.findOneAndUpdate(
				{ _id: req.params.id }, 
				req.body, 
				{ new: true })
   		   		 .exec()
      			.then(function (result) {
     	     		res.status(200).json(result);
    		    })
     	 		.catch(function(err){
        	 		 return next(err);
      				})
			});

		
	router.route('/usertodos/:id')	
		.get( function(req, res,next){
			console.log('Get User todos ' + req.params.id, 'verbose');
			logger.log('Get User todos ' + req.params.id, 'verbose');
			Todos.find({user: req.params.id})
			.populate('user')
		//	.sort("-dateCreated")
			.exec()
			.then(function(todos){
				res.status(200).json(todos);
			})
			.catch(function(err){
				return next(err);
			})

	});
	

	router.route('/done/:id')	
		.put( function(req, res, next){
      	logger.log('Update Todo ' + req.params.id,'debug');
		var query = Todos.findById(req.params.id)
        .exec()
        .then(function (todos) {
           	todos.completed = true;
          	return todos.save();
		})
		.then(function(todos){
			res.status(200).json(todos);
		})

	.catch(function (err) {
		return next(err);
		});
    });

}