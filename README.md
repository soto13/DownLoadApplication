# DownLoadApplication

Detect which SO device is running and open the app or go to place to download your app



# Constructor

Receive 3 params
url: is the exact url where the app is stored (playstore, appstore).
hashUrl: is the hash url where the redirect is applied (#/items, /example, #/example2).
localUrlApp: is the local url to app. Android case "androidapplocalurl://".



# getMobileOperatingSystem()

return the devid name detected (Windows Phone, android, iOS, unknow)



# detectDeviceAndRedirect(device)

receive the device OS in params way and create the redirect to app (if is installed) or place where is stored (playstore or appstore)



#redirectToPlaystoreApp()

really is a global method and only not redirect to playstore, already this method can redirect to playstore or
appstore with the url to app.



                                          #                      #
                                          # Beta Functionalities #
                                          #                      #



# cancellProgressiveWebAppInstallation()

if the page have a PWA cancell installation from PWA processes



# preventDuplicateNotification()

if PWA was installed prevent duplicate notification

