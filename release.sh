jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/keystore/practicaldeveloper.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk practicaldeveloper.net
del platforms/android/build/outputs/apk/RoboRating-Release.apk
~/Library/Android/sdk/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/RoboRating-Release.apk
