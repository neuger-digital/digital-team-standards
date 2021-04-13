# Environment Setup

## Getting Started with a Pantheon Site

Lando is an easy way to work locally with Pantheon that doesn't require much configuration. To get started, make sure that you have a Pantheon machine token set up on your computer and then nagivate to your `~/Sites` directory. Create a directory that is named the same as the sites domain (without the TLD and any subdomains should replace the `.` with a `-`) and then go into that directory. From there follow these steps:
* Run `lando init`
* If we are using the [Pantheon Composer CircleCI Workflow](https://github.com/neuger-digital/digital-team-standards/blob/master/environment-setup/pantheon-composer-workflow.md) then follow those steps instead, otherwise;
* Choose `pantheon` (this is the Lando recipe)
* Choose your email from the list (it will likely just have one available, based on the machine token)
* Choose the site (also retreived from the machine token)

After the initialization is complete, adjust the `.lando.yml` file to follow this structure:
```
recipe: pantheon
config:
  framework: PANTHEON_SITE_FRAMEWORK
  id: PANTHEON_SITE_ID
  site: PANTHEON_SITE_MACHINE_NAME
  # Disable the SOLR index
  index: false
  # Disable the VARNISH edge
  edge: false
  # Disable the REDIS cache
  cache: false
```
Disabling the index, edge, and cache will prevent Docker from starting up those containers and will reduce the load on your computer.

To finish up:
* Run `lando start`
* Run `lando pull --code=none` which will get the database and files
* Check `git status` and if there are no local changes then `git pull` to get the code from the dev environment

You'll be able to access the Pantheon site locally now with `PANTHEON_SITE_MACHINE_NAME.lndo.site`.

Happy coding!

## Database changes

Be careful, especially with live databases! Back up databases before running these commands.

When in doubt, use the `--dry-run` first before executing the commands below.

### Local

```
lando wp search-replace 'sitename.ext' 'sitename.lndo.site'
lando wp search-replace 'www.sitename.ext' 'sitename.lndo.site'
lando wp search-replace 'http://sitename.lndo.site' 'https://sitename.lndo.site'
```

### Dev

```
terminus wp sitename.dev -- search-replace 'sitename.lndo.site' 'dev-sitename.neuger.site'
```

### Test

```
terminus wp sitename.test -- search-replace 'sitename.lndo.site' 'sitename.neuger.site'
terminus wp sitename.test -- search-replace 'dev-sitename.neuger.site' 'sitename.neuger.site'
terminus wp sitename.test -- search-replace 'dev-sitename.pantheonsite.io' 'sitename.neuger.site'
```

### Live

```
terminus wp sitename.live -- search-replace 'sitename.lndo.site' 'sitename.ext'
terminus wp sitename.live -- search-replace 'dev-sitename.neuger.site' 'sitename.ext'
terminus wp sitename.live -- search-replace 'dev-sitename.pantheonsite.io' 'sitename.ext'
terminus wp sitename.live -- search-replace 'test-sitename.neuger.site' 'sitename.ext'
terminus wp sitename.live -- search-replace 'test-sitename.pantheonsite.io' 'sitename.ext'
terminus wp sitename.live -- search-replace 'sitename.neuger.site' 'sitename.ext'
terminus wp sitename.live -- search-replace 'http://sitename.ext' 'https://sitename.ext'

```

## Arcustech

When adding a new site to Arcustech, here are some things to remember.

### SSL

Arcustech must use a proxy or load balancer and so for us to not get a 'too many redirects' issue with our sites, we need to add the follow bit of code to our configuration file for WordPress sites:

```
if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
	$_SERVER['HTTPS'] ='on';
}
```

or if it's a single-pager, then we can add this to the .htaccess file to force the https version of the site:

```
RewriteEngine On
RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
```
