# Environment Setup

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
lando wp search-replace 'sitename.lndo.site' 'dev-sitename.neuger.site'
```

### Test

```
lando wp search-replace 'dev-sitename.neuger.site' 'sitename.neuger.site'
lando wp search-replace 'dev-sitename.pantheonsite.io' 'sitename.neuger.site'
```

### Live

```
lando wp search-replace 'sitename.neuger.site' 'sitename.ext'
lando wp search-replace 'test-sitename.neuger.site' 'sitename.ext'
lando wp search-replace 'test-sitename.pantheonsite.io' 'sitename.ext'
lando wp search-replace 'dev-sitename.neuger.site' 'sitename.ext'
lando wp search-replace 'dev-sitename.pantheonsite.io' 'sitename.ext'
lando wp search-replace 'http://sitename.ext' 'https://sitename.ext'

```
