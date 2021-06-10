# Environment Setup

## Database changes

Be careful, especially with live databases! Back up databases before running these commands.

When in doubt, use the `--dry-run` first before executing the commands below.

### Test to Local

```
lando wp search-replace 'sitename.neuger.site' 'sitename.lndo.site' --all-tables
lando wp cache flush
```

### Live to Local

```
lando wp search-replace 'sitename.ext' 'sitename.lndo.site' --all-tables
lando wp search-replace 'www.sitename.ext' 'sitename.lndo.site' --all-tables
lando wp search-replace 'http://sitename.lndo.site' 'https://sitename.lndo.site' --all-tables
lando wp cache flush
```

### Local to Dev

```
terminus wp sitename.dev -- search-replace 'sitename.lndo.site' 'dev-sitename.neuger.site' --all-tables
terminus wp sitename.dev -- cache flush
```

### To Test

```
terminus wp sitename.test -- search-replace 'sitename.lndo.site' 'sitename.neuger.site' --all-tables
terminus wp sitename.test -- search-replace 'dev-sitename.neuger.site' 'sitename.neuger.site' --all-tables
terminus wp sitename.test -- search-replace 'dev-sitename.pantheonsite.io' 'sitename.neuger.site' --all-tables
terminus wp sitename.test -- cache flush
```

### To Live

```
terminus wp sitename.live -- search-replace 'sitename.lndo.site' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'dev-sitename.neuger.site' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'dev-sitename.pantheonsite.io' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'test-sitename.neuger.site' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'test-sitename.pantheonsite.io' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'live-sitename.pantheonsite.io' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'sitename.neuger.site' 'sitename.ext' --all-tables
terminus wp sitename.live -- search-replace 'http://sitename.ext' 'https://sitename.ext' --all-tables
terminus wp sitename.live -- cache flush

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
