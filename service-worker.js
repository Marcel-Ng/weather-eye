  
  // This is the array I would use to update the files that I want to cache
  const filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'scripts/app.js',
    'script/skycons.js',
    'index.html'
  ];

  //This is the name of the catch, will always change this when ever I make changes to files I need to catch
  const staticCacheName = 'pages-cache-v2';

// attempt to install the service workers now.
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');

    const cacheWhiteList = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
  });


  
  self.addEventListener('activate', event => {
    console.log('Service worker activating...');


  });

  self.addEventListener('fetch', event => {

    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response){
                console.log('found response ', event.request.url, ' in cache');
                return response;
            }

            console.log('Network request for ', event.request.url);
            //TODO 4 - Add feched files to the cache
            return fetch(event.request)
            .then(response => {
                //TODO: 5 -Respond with custom 404 page
                if(response.status === 404){
                    return caches.match('pages/404.html');
                }
                return caches.open(staticCacheName).then(cache => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })

        }).catch(error => {
            //TODO 6 - Respond with custom offline page
            return caches.match('pages/offline.html');
        })
    );
  });