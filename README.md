## login-bro

### description
login-bro is a simple authentication middleware that uses passport to connect the app with auth0

### development
* Clone the repository to your designated folder
 * git clone https://github.com/timurgrom/auth0-wrapper.git
 * cd into the folder
 * run `npm install`
 * run `npm link` - this will create "login-bro" npm package locally
* Create an Express project so you can attach the package to work with
 * cd into the folder
 * run `npm link login-bro` - will attach login-bro into the package.json file
 * inside your express app add `var loginBro = require('login-bro')`
* and Walla you are ready to use login-bro

### usage
added strategy to your config file
information about the strategy can be taken from auth0 application settings
it should look like the following

```
strategy: {
	domain: 'DomainUrl',
	clientID: 'ClientID',
	clientSecret: 'Secret',
	callbackURL: 'callbackRoute',
	appGet: 'Relative Callback' // '/authCallback'
}
```
After you've required login-bro, you need to render a login html page
> basically what it does is just create an html page that will serve as the login page in the login-bro package

```
loginBro.use().render({
	login: {
		strategy: {
			domain: 'DomainUrl',
			clientID: 'ClientID',
			clientSecret: 'Secret',
			callbackURL: 'Full Url Callback',
			appGet: 'Relative Callback' // '/authCallback'
		},
		icon: ''
	}
}) 
```
after you've set up your express app and added most of your middleware
before you set up any routes
just add the following code 
* ```loginBro.use(app).with(config.strategy)```
