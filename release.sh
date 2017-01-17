jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/keystore/practicaldeveloper.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk practicaldeveloper.net
rm platforms/android/build/outputs/apk/RoboRating-Release.apk
~/Android/Sdk/build-tools/25.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/RoboRating-Release.apk
