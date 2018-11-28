class DownloadApplication {
      constructor(url, hashUrlWeb, localUrlApp) { // url from app in playstore
        this.url = url;
        this.hashUrlWeb = hashUrlWeb;
        this.localUrlApp = localUrlApp;
        this.userAgent = navigator.userAgent || navigator.vendor || window.opera;
      }
      
      getMobileOperatingSystem() { // detect which current smartphoe OS is running
        if (/windows phone/i.test(this.userAgent)) return "Windows Phone";
        if (/android/i.test(this.userAgent)) return 'android';
        if (/iPad|iPhone|iPod/.test(this.userAgent) && !window.MSStream) return "iOS";
        return "unknown";
      }

      detectIfApplicationWasInstalled() { // Detect if app was installed and return a boolean
        if("getInstalledRelatedApps" in navigator) {
          alert('lo encontré');
          navigator.getInstalledRelatedApps().then(data => alert(data, 'data')).catch(err => console.log(err, 'err'))
          return true;
        }
        return false;
      }

      detectDectDeviceAndRdirect(device) { // if detectIfApplicationWasInstalled() response false open local url from application
        switch(device) {
          case "android":
            if (window.location.hash === this.hashUrlWeb) {
              window.location = this.localUrlApp;
              return setTimeout(() => this.redirectToPlaystoreApp(), (2000));
            }
            return device;
          case "iOS":
            return device;
          default: 
           return device;
        }
      }

      cancellProgressiveWebAppInstallation() { // if detect the app cancell installation from PWA
        e.preventDefault();  // Stop automated install prompt.
        navigator.getInstalledRelatedApps().then(relatedApps => {
          if (relatedApps.length == 0) {
            e.prompt();
          }
        });
        
      }
      
      preventDuplicateNotification() { // if PWA was installed prevent duplicate notification
        let sw = navigator.serviceWorker.ready;

        navigator.getInstalledRelatedApps()
        .then(apps => (apps.length > 0) ? sw.then(reg => reg.pushManager) : undefined)
        .then(pushManager => {
          if(pushManager) pushManager.unsubscribe();
        });
      }
      
      redirectToPlaystoreApp() { // redirect to playstore with the url from app
        return window.location = this.url;
      }
    }

    
    // Usage case
    (function() {
      let downloadApplication = new DownloadApplication('https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.crdevollpay.trainer&ddl=1&pcampaignid=web_ddl_1', "#/how-works", 'webollpay://');
      
      window.addEventListener("load", e => {
        downloadApplication.detectDectDeviceAndRdirect(downloadApplication.getMobileOperatingSystem());
      });
      
    })()
