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
###### For more detailed info: https://en.wikipedia.org/wiki/NMEA_0183 and https://w3.cs.jmu.edu/bernstdh/web/common/help/nmea-sentences.php

◼️ Currently Supported Formats:
-
- GPGGA
- GPRMC


◼️ Demo:
-
https://bmsvieira.github.io/nmea.js

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

◼️ Extract Information:
-

There are specific fields you can use for each type of NMEA Sentence, because they provide different types of information, below is a list of available fields for the currently supported NMEA sentences.

#### GPGGA
| Field | Response Type |
| --- | --- |
| altitude | `float` |
| altitudeUnits | `string` |
| checksum | `int`|
| coordinates | Object: `latitude`, `latitudeDirection`, `longitude`, `longitudeDirection` |
| fixType  | `int`  |
| hdop  | `float`  |
| satellites | `int` |
| sentenceType| `string`|
| time| Object: `hours`, `minutes`, `seconds`|

#### GPRMC
| Field | Response Type |
| --- | --- |
| checksum | `float` |
| coordinates | Object: `latitude`, `latitudeDirection`, `longitude`, `longitudeDirection` |
| date |  `string`|
| time| Object: `hours`, `minutes`, `seconds`|
| heading | `int` |
| magneticVariation  | `float`  |
| magneticVariationDirection  | `string`  |
| positionStatus | `string` |
| sentenceType| `string`|
| speed | `float` |

◼️ Usage:
-

There are two ways of extract information, either send the NMEA sentence in the constructor or pass it as paremeter, for example:

<b>Constructor:</b>
```javascript
demo = new Nmea("$GPRMC,001225,A,2832.1834,N,08101.0536,W,12,25,251211,1.2,E,A*03");

// Now you can explore this NMEA sentence without having to pass it as a paremeter when using the method, for example:

demo.getInfo("speed"); // 12
demo.getInfo("heading"); // 25
demo.getInfo("magneticVariation"); // 1.2
...

// You can also use Getters and Setters, for example:

API > Get

demo.altitude
demo.altitudeUnits
demo.checksum
demo.coordinates
demo.fixType
demo.hdop
demo.satellites
demo.sentenceType
demo.time
demo.date
demo.heading
demo.magneticVariation
demo.magneticVariationDirection
demo.positionStatus
demo.speed 

API > Set

// Define a new sentence in the constructor
demo.set = "$GPRMC,001225,A,2832.1834,N,08101.0536,W,12,25,251211,1.2,E,A*03";

```

<b>As a paremeter:</b>
```javascript
demo = new Nmea();

// Now you have nmea.js library ready to extract information from multiple and different nmea sentences, as long as you pass it as parameter, for example:

demo.getInfo("speed", "$GPRMC,001225,A,2832.1834,N,08101.0536,W,12,25,251211,1.2,E,A*03"); // 12
demo.getInfo("heading", "$GPRMC,001225,A,2832.1834,N,08101.0536,W,12,25,251211,1.2,E,A*03"); // 25
demo.getInfo("magneticVariation", "$GPRMC,001225,A,2832.1834,N,08101.0536,W,12,25,251211,1.2,E,A*03"); // 1.2
demo.getInfo("altitudeUnits", "$GPGGA,092751.000,5321.6802,N,00630.3371,W,1,8,1.03,61.7,M,55.3,M,,*75"); // M
demo.getInfo("hdop", "$GPGGA,092751.000,5321.6802,N,00630.3371,W,1,8,1.03,61.7,M,55.3,M,,*75"); // 1.03
...
```

