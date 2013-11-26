//Global Module for commonly used functions like getHost
(function () {
	window.Chuzr = {
		//Function that returns host name up to (not including) :port
		getChuzrHost: function () {
			return document.URL.match(/http:\/\/[^:]*/g);
		}
	}
})();
