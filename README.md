# RoboRating
FIRST Tech Challenge Res-Q Scouting

This is a quick and dirty application to allow FIRST participants to capture scouting data for the FIRST Res-Q event.

Scouts can add ratings by tapping the + button on the home page.
Tapping the checkmark button saves changes
You can tap saved ratings to edit them or scan the QR code from another phone.
When you tap the QR code button on the home page, you can add a record from another device into your phone to capture the data.
The Eye-con denotes records that you've captured successfully.  Tap the eye button in the rating to mark it as captured once you've scanned it.
The share button on the home screen will export the SQLite database to a publicly visible location on the device.  Note that this location MIGHT NOT BE MOUNTED. 
If this is the case, you may need to use adb shell / adb pull to find the location and pull the exported database file.  For example,
on my phone, the file is saved to /storage/emulated/0, but that actually corresponds to /storage/sdcard0 when my phone is connected to the PC.

Known bugs:  If you don't move a slider, the default setting isn't saved.  

Wish List features
* Allow users to maintain the team list from within the app
* Pull the team list from the event web page if the device has connectivity
* Change the client database to PouchDB
* Allow users to define the rating questions so that the app is more generic and dynamically generate the form.
* Store the ratings as JSON objects.
