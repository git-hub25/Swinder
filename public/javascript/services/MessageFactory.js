(function() {
	'use strict';
	angular.module('app')
	.factory('MessageFactory', MessageFactory);

	MessageFactory.$inject = ['$http', '$q'];

	function MessageFactory($http, $q) {
		var o = {};
		
		/* Put in after registration is finished 
		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth; */

			/* because of how we have messages and conversation setup, do I have to edit
			format of get and post calls? I'll explore.
			*/

		//-----------------CONVERSATION FUNCTIONS---------------------------------------------------------

		o.enterConversation = function(id) {
			console.log('started!');
			console.log(id)
		};

		//-----------------MESSAGE FUNCTIONS---------------------------------------------------------


		o.getMessage = function(id) {
			var q = $q.defer();
			$http.get('/api/message/' + id).success(function(res) {
				console.log('Message retrieved');
				q.resolve();
			});
			return q.promise;
		};

		o.getMessages = function() {
			var q = $q.defer();
			$http.get('/api/message/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//insert auth below after we finish registration
		o.sendMessage = function(message){
			var q = $q.defer();
			$http.post('/api/message/', message).success(function(res) {
				console.log(res);
				q.resolve();
				console.log('message was sent2!');

			});
			return q.promise;
		};

		o.editMessage = function(newMessage, oldMessage) { //FIGURE OUT ARGUMENTS
			console.log('edit started');
			var q = $q.defer();
			$http.put('/api/message/' + oldMessage._id, newMessage).success(function(res) {
				q.resolve();
				console.log('edit finished');
			});
			return q.promise;
		};

		o.deleteMessage = function(Message) {
			var q = $q.defer();
			$http.delete('api/message/' + message._id).success(function(res) {
			});
		};

		//o.getMessages();

		return o;
	}
})();