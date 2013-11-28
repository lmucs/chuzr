//Global Module for commonly used functions like getHost
(function () {
    window.Config = {
        //Function that returns host name up to (not including) :port
        getApiBaseUrl: function () {
            return "http://localhost:3000";
        },
        
        getHostName: function () {
            return "http://localhost";
        }

    }
})();
