
// Returns html that will be used to create the login page
// client id, client domain, icon and callback url are mandatory params
module.exports = function(config) {
return `<!DOCTYPE html><html>
<head>
	<title>Login</title>
</head>
<body>
<script src="https://cdn.auth0.com/js/lock-9.1.min.js"></script>
<script type="text/javascript">
var lock = new Auth0Lock("${config.strategy.clientID}","${config.strategy.domain}");
function signin() {
	lock.show({
		icon: "${config.icon}",
		closable: false,
		callbackURL: "${config.strategy.callbackURL}",
		responseType: "code",
		authParams: {
			scope: "openid email"
		}
	})
}
</script>
<script>
(function() {
	window.signin()
})()
</script>
</body>
</html>
`
}