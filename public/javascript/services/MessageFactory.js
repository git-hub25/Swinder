(function() {
	'use strict';
	angular.module('app')
	.factory('MessageFactory', MessageFactory);

	MessageFactory.$inject = ['$http', '$q', "$rootScope"];

	function MessageFactory($http, $q, $rootScope) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};

			/* because of how we have messages and conversation setup, do I have to edit
			format of get and post calls? I'll explore.
			*/

		//-----------------CONVERSATION FUNCTIONS---------------------------------------------------------


		o.enterConversation = function(recipientId) {
			var q = $q.defer();
			$http.get('/api/conversation/'+ recipientId + "|" + $rootScope._couple.id).success(function(res) {
				console.log(res);
				q.resolve();
			});
			return q.promise;

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

		// o.getMessages = function() {
		// 	var q = $q.defer();
		// 	$http.get('/api/message/').success(function(res) {
		// 		q.resolve(res);
		// 	});
		// 	return q.promise;
		// };
		o.getConversations = function(){
			var q = $q.defer();
			$http.post("/api/message/", {_id: $rootScope._couple.id}, getAuth()).success(function (res) {
				q.resolve(res);

			})
			return q.promise;
		}

		o.sendMessage = function(message){
			var q = $q.defer();
			$http.post('/api/message/newMessage', message, getAuth()).success(function(res) {
				console.log(res.createdBy);
				q.resolve();
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

		o.deleteMessage = function(message) {
			var q = $q.defer();
			$http.delete('api/message/' + message._id).success(function(res) {
			});
		};

		// o.getMessages();

		return o;
	}
})();
