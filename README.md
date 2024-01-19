<p align="center">
<img width="" src="https://raw.githubusercontent.com/BMSVieira/nmea.js/main/demo/img/logo.png?token=GHSAT0AAAAAACLN5BL733MRXOVK5CMJIZ6YZNKQA5Q">
</p>

◼️ NMEA 0183:
-
<p>
   NMEA 0183 is a combined electrical and data specification for communication between marine electronics such as echo sounder, sonars, anemometer, gyrocompass, autopilot, GPS receivers and many other types of instruments
</p>
<p>
   A sample file produced by a Tripmate 850 GPS logger. This file was produced in Leixlip, County Kildare, Ireland. The record lasts two seconds.
</p>

```html
$GPGGA,092750.000,5321.6802,N,00630.3372,W,1,8,1.03,61.7,M,55.2,M,,*76
$GPGSA,A,3,10,07,05,02,29,04,08,13,,,,,1.72,1.03,1.38*0A
$GPGSV,3,1,11,10,63,137,17,07,61,098,15,05,59,290,20,08,54,157,30*70
$GPGSV,3,2,11,02,39,223,19,13,28,070,17,26,23,252,,04,14,186,14*79
$GPGSV,3,3,11,29,09,301,24,16,09,020,,36,,,*76
$GPRMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43
$GPGGA,092751.000,5321.6802,N,00630.3371,W,1,8,1.03,61.7,M,55.3,M,,*75
$GPGSA,A,3,10,07,05,02,29,04,08,13,,,,,1.72,1.03,1.38*0A
$GPGSV,3,1,11,10,63,137,17,07,61,098,15,05,59,290,20,08,54,157,30*70
$GPGSV,3,2,11,02,39,223,16,13,28,070,17,26,23,252,,04,14,186,15*77
$GPGSV,3,3,11,29,09,301,24,16,09,020,,36,,,*76
$GPRMC,092751.000,A,5321.6802,N,00630.3371,W,0.06,31.66,280511,,,A*45
```

◼️ Features:
-
- 🛠 Easy to Use
- 🌠 Fast & Lightweight (0.5Kb)
- 💪 No dependencies, built with VanillaJS

◼️ Demo:
-
https://mooviejs.com/

◼️ Installation (Browser):
-

<b>1 - Include JavaScript Source.</b>
```javascript
<script src="path/to/nmea.js"></script>
```
<b>2 - Initilize.</b>
```javascript
document.addEventListener("DOMContentLoaded", function() {
   const demo = new Nmea();
});
```

◼️ Currently Supported Formats:
-
- GPGGA
- GPRMC
