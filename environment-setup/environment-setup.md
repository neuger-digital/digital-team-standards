# Environment Setup

## Pantheon

Pantheon is our go-to hosting solution for our clients. It's scalable, secure, has a good pre-built workflow, is developer-friendly, and we have good customer support. It is only a hosting service for WordPress and Drupal and has some [platform restrictions](https://pantheon.io/docs/platform-considerations) that we need to keep in mind when developing. In general, these constraints are a forcing function for us to write better code. One of the best parts of Pantheon is its partnership with Lando, which allows for us to quickly spin up local versions of the site with all of the same server settings as the dev site.

### Local development with Lando

Lando is an easy way to work locally with Pantheon that doesn't require much configuration. The [Lando Docs](https://docs.lando.dev/config/pantheon.html) are pretty good, but here are some good takaways for other Lando things you might want to do.

#### Setting up a site locally for the first time

To get started, make sure that you have a Pantheon machine token set up on your computer and then nagivate to your `~/Sites` directory. Create a directory that is named the same as the sites domain (without the TLD and any subdomains should replace the `.` with a `-`) and then go into that directory. This will be the same as the "PANTHEON_SITE_MACHINE_NAME" that you'll see below. From there follow these steps:
* Run `lando init`
* If we are using the [Pantheon Composer CircleCI Workflow](https://github.com/neuger-digital/digital-team-standards/blob/master/environment-setup/pantheon-composer-workflow.md) then follow those steps instead, otherwise;
* Choose `pantheon` (this is the Lando recipe)
* Choose your email from the list (it will likely just have one available, based on the machine token)
* Choose the site

After the initialization is complete, adjust the `.lando.yml` file to follow this structure:
```
recipe: pantheon
config:
  framework: PANTHEON_SITE_FRAMEWORK
  id: PANTHEON_SITE_ID
  site: PANTHEON_SITE_MACHINE_NAME
  # Disable the SOLR index
  index: false
  # Disable the REDIS cache
  cache: false
```
Disabling the index and cache will prevent Docker from starting up those containers and will reduce the load on your computer.

To finish up:
* Run `lando start`
* Run `lando pull --code=none` which will get the database and files
* Check `git status` and if there are no local changes then `git pull` to get the code from the dev environment

You'll be able to access the Pantheon site locally now with `https://PANTHEON_SITE_MACHINE_NAME.lndo.site`.

#### Returning to a site you've set up before

If you have previously initialized a specific site on your machine, you don't have to go through the init process again. All you need to do is:
* Navigate the the directory
* Run `lando start` and there you go, it's up an running
* You may want to pull fresh code, files, and database, in that case:
	* Run `lando pull --code=none` which pull the files and database and not code
	* Run `git status` to check if there's any local changes and if not, run `git pull`

That's it!

#### Stopping Lando

* Run `lando stop` if you just want to stop the current containers, but keep them
* Run `lando restart` if you want to stop the current containers and start them up again
* Run `lando destroy` if you want to get rid of the containers

#### Connecting to the database locally

Open TablePlus and start a new MySQL or MariaDB connection (doesn't really matter). Best practice for naming would be "PANTHEON_SITE_MACHINE_NAME (lando)" and then set the tag to local. 
* Host: 127.0.0.1
* User: pantheon
* Password: pantheon
* Database: pantheon
* To get the port you will need to run `lando info` and then look for `external_connection: { host: '127.0.0.1', port: '32769' },`. This port changes so you may have to find this port number each time you want to connect to the database locally. If the port is simply `true` that means you haven't started the containers.

### Bulk database changes

If you wish to make bulk updates to the local database you can follow these steps. Be careful, especially with live databases! Back up databases before running these commands.

When in doubt, use the `--dry-run` first before executing the commands below.

#### Local

```
lando wp search-replace 'sitename.ext' 'sitename.lndo.site'
lando wp search-replace 'www.sitename.ext' 'sitename.lndo.site'
lando wp search-replace 'http://sitename.lndo.site' 'https://sitename.lndo.site'
```

#### Dev

```
terminus wp sitename.dev -- search-replace 'sitename.lndo.site' 'dev-sitename.neuger.site'
```

#### Test

```
terminus wp sitename.test -- search-replace 'sitename.lndo.site' 'sitename.neuger.site'
terminus wp sitename.test -- search-replace 'dev-sitename.neuger.site' 'sitename.neuger.site'
terminus wp sitename.test -- search-replace 'dev-sitename.pantheonsite.io' 'sitename.neuger.site'
```

#### Live

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

Arcustech is a hosting service that we use when we either cannot host on Pantheon due to system requirements or the site is too small and it's overkill to set up a Pantheon environement (think placeholder pages or redirects).

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
