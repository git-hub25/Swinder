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


		//-----------------CONVERSATION FUNCTIONS---------------------------------------------------------


		o.enterConversation = function(recipientId) {
			var q = $q.defer();
			$http.get('/api/conversation/'+ recipientId + "|" + $rootScope._couple.id).success(function(res) {
				console.log(res);
				q.resolve(res);
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
		};

		//gets a single conversation
		o.getConversation = function(){
			var q = $q.defer();
			$http.post("/api/conversation/conversationStart", {_id: $rootScope._conversation._id}, getAuth()).success(function (res) {
				q.resolve(res);

			})
			return q.promise;
		};

		o.sendMessage = function(message){
			var q = $q.defer();
			$http.post('/api/message/newMessage', message, getAuth()).success(function(res) {
				console.log(res);
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
