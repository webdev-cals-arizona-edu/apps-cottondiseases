/**
  * CALS.js : @calsnetlab
  * version 1.1
  */


//cache manifest DEBUG
//http://jonathanstark.com/blog/debugging-html-5-offline-application-cache
var cacheStatusValues = [];
cacheStatusValues[0] = 'uncached';
cacheStatusValues[1] = 'idle';
cacheStatusValues[2] = 'checking';
cacheStatusValues[3] = 'downloading';
cacheStatusValues[4] = 'updateready';
cacheStatusValues[5] = 'obsolete';

var cache = window.applicationCache;
cache.addEventListener('cached', logEvent, false);
cache.addEventListener('checking', logEvent, false);
cache.addEventListener('downloading', logEvent, false);
cache.addEventListener('error', logEvent, false);
cache.addEventListener('noupdate', logEvent, false);
cache.addEventListener('obsolete', logEvent, false);
cache.addEventListener('progress', logEvent, false);
cache.addEventListener('updateready', logEvent, false);

function logEvent(e) {
    var online, status, type, message;
    online = (navigator.onLine) ? 'yes' : 'no';
    status = cacheStatusValues[cache.status];
    type = e.type;
    message = 'online: ' + online;
    message += ', event: ' + type;
    message += ', status: ' + status;
    if (type == 'error' && navigator.onLine) {
        message += ' (probably a syntax error in manifest)';
    }
    console.log(message);
}

if (window.applicationCache) {
    window.applicationCache.addEventListener(
        'updateready',
        function () {
            window.applicationCache.swapCache();
            console.log('swap cache has been called');
            if (confirm('A new version of the Cotton Diseases Web App is available. Load it?')) {
                window.location.reload();
                console.log('user selected reload');
            }
        },
        false
    );
}

//setInterval(function () { cache.update() }, 10000);


/*
 * appcache functions
 * ref: http://www.html5rocks.com/en/tutorials/appcache/beginner/
 */

// Check if a new cache is available on page load.
/* use above code instead
window.addEventListener('load', function (e) {

    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new version.
            window.applicationCache.swapCache();
            if (confirm('A new version of this site is available. Load it?')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't change. Nothing new to server.
        }
    }, false);

}, false);
*/

/* check the current state of the cache */
/* not used
function getAppcacheStatus()
{
    var appCache = window.applicationCache;

    switch (appCache.status) {
        case appCache.UNCACHED: // UNCACHED == 0
            return 'UNCACHED';
            break;
        case appCache.IDLE: // IDLE == 1
            return 'IDLE';
            break;
        case appCache.CHECKING: // CHECKING == 2
            return 'CHECKING';
            break;
        case appCache.DOWNLOADING: // DOWNLOADING == 3
            return 'DOWNLOADING';
            break;
        case appCache.UPDATEREADY:  // UPDATEREADY == 4
            return 'UPDATEREADY';
            break;
        case appCache.OBSOLETE: // OBSOLETE == 5
            return 'OBSOLETE';
            break;
        default:
            return 'UKNOWN CACHE STATUS';
            break;
    };
}
*/

/* 
    Note: Using update() and swapCache() like this does not serve the updated resources to users. 
    This flow simply tells the browser to check for a new manifest, download the updated content it specifies, and repopulate the app cache. 
    Thus, it takes two page reloads to server new content to users, one to pull down a new app cache, and another to refresh the page content. 
*/
/* not used
function updateAppcache()
{
    var appCache = window.applicationCache;

    appCache.update(); // Attempt to update the user's cache.

    if (appCache.status == window.applicationCache.UPDATEREADY) {
        appCache.swapCache();  // The fetch was successful, swap in the new cache.
    }
    
}
*/