
/*-------------------------
Nmea.js
Made by: Bruno Vieira
--------------------------- */

class Nmea {

    constructor() {

        // Global
        let _this = this;

        this.combinedObject = {
            gpgga: {
                sentenceType: function(sentence) { return "GPGGA"; },
                time: function(sentence) {
        
                    const fields = sentence.split(',');
                    const timeField = fields[1];
        
                    const hours = parseInt(timeField.substring(0, 2), 10);
                    const minutes = parseInt(timeField.substring(2, 4), 10);
                    const seconds = parseInt(timeField.substring(4, 6), 10);
        
                    return {
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    };
        
                },
                coordinates: function(sentence) {
        
                    const parts = sentence.split(',');
        
                    if (parts[0] !== '$GPGGA' || parts.length < 14 || parts[6] === '0') {
                        return null;
                    }
        
                    const latitude = parseFloat(parts[2].slice(0, 2)) + parseFloat(parts[2].slice(2)) / 60;
                    const longitude = parseFloat(parts[4].slice(0, 3)) + parseFloat(parts[4].slice(3)) / 60;
        
                    const latitudeDirection = parts[3] === 'N' ? 1 : -1;
                    const longitudeDirection = parts[5] === 'E' ? 1 : -1;
        
                    const coordinates = {
                        latitude: latitude * latitudeDirection,
                        latitudeDirection: parts[3],
                        longitude: longitude * longitudeDirection,
                        longitudeDirection: parts[5]
                    };
        
                    return coordinates;
        
                },
                fixType: function(sentence) {
        
                    const parts = sentence.split(',');

                    if (parts.length >= 7) {
                      const fixType = parts[6];
                      return fixType;
                    } else {
                      return 'Error: Invalid sentence format';
                    }

                },
                satellites: function(sentence) {
        
                    const parts = sentence.split(',');
                    if (parts.length >= 9) {
                      const satellites = parts[7];
                      return satellites;
                    } else {
                      return 'Error: Invalid sentence format';
                    }

                },
                hdop: function(sentence) {
        
                    const parts = sentence.split(',');
                    if (parts.length >= 10) {
                        const hdop = parts[8];
                        return hdop;
                      } else {
                        return 'Error: Invalid sentence format';
                      }

                },
                altitude: function(sentence) {
        
                    const parts = sentence.split(',');
                    if (parts.length >= 11) {
                        const altitude = parts[9];
                        return altitude;
                    } else {
                        return 'Error: Invalid sentence format';
                    }

                },
                altitudeUnits: function(sentence) {
        
                    const parts = sentence.split(',');
                    if (parts.length >= 12) {
                        const altitudeUnits = parts[10];
                        return altitudeUnits;
                    } else {
                        return 'Error: Invalid sentence format';
                    }

                },
                checksum: function(sentence)
                {
                    let checksum = 0;
                    for (let i = 1; i < sentence.length; i++) {
                      if (sentence[i] === '*') {
                        break;
                      }
                      checksum ^= sentence.charCodeAt(i); 
                    }
                    const checksumString = checksum.toString(16).toUpperCase().padStart(2, '0');
                    return checksumString;
                }
                
            },
            gprmc: {
                sentenceType: function(sentence) { return "GPRMC"; },
                time: function(sentence) {

                    const fields = sentence.split(',');
        
                    const dateField = fields[9];
                    const timeField = fields[1];
    
                    const day = parseInt(dateField.substring(0, 2), 10);
                    const month = parseInt(dateField.substring(2, 4), 10);
                    const yearLastTwoDigits = parseInt(dateField.substring(4, 6), 10);
                    const year = yearLastTwoDigits < 70 ? 2000 + yearLastTwoDigits : 1900 + yearLastTwoDigits;
        
                    const hours = parseInt(timeField.substring(0, 2), 10);
                    const minutes = parseInt(timeField.substring(2, 4), 10);
                    const seconds = parseInt(timeField.substring(4, 6), 10);
        
                    return {
                        year: year,
                        month: month,
                        day: day,
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    };
        
                },
                positionStatus:  function(sentence) {
        
                    const fields = sentence.split(',');
                    const positionStatus = fields[2].toString();
        
                    return positionStatus
        
                },
                coordinates: function(sentence) {
        
                    const parts = sentence.split(',');
        
                    if (parts[0] !== '$GPRMC' || parts.length < 10 || parts[2] !== 'A') {
                        return null;
                    }
        
                    const latitude = parseFloat(parts[3].slice(0, 2)) + parseFloat(parts[3].slice(2)) / 60;
                    const longitude = parseFloat(parts[5].slice(0, 3)) + parseFloat(parts[5].slice(3)) / 60;
        
                    const latitudeDirection = parts[4] === 'N' ? 1 : -1;
                    const longitudeDirection = parts[6] === 'E' ? 1 : -1;
        
                    const coordinates = {
                        latitude: latitude * latitudeDirection,
                        latitudeDirection: parts[4],
                        longitude: longitude * longitudeDirection,
                        longitudeDirection: parts[6],
                    };
        
                    return coordinates;
        
                },
                speed: function(sentence) {
        
                    const fields = sentence.split(',');
                    const speedInKnots = parseFloat(fields[7]);
                    return speedInKnots;
        
                },
                heading: function(sentence) {
        
                    const fields = sentence.split(',');
                    const heading = parseFloat(fields[8]);
                    return heading;
                },
                date: function(sentence) {
        
                    const fields = sentence.split(',');
                    const date = fields[9].toString();
        
                    const day = parseInt(date.substring(0, 2), 10);
                    const month = parseInt(date.substring(2, 4), 10) - 1; // Months are 0-indexed in JavaScript
                    const year = 2000 + parseInt(date.substring(4), 10);
        
                    const regularDate = new Date(year, month, day);
                    return regularDate;
        
                },
                magneticVariation: function(sentence) {
        
                    const fields = sentence.split(',');
                    const magneticVariation = fields[10].toString();
        
                    return magneticVariation
        
                },
                magneticVariationDirection: function(sentence) {
        
                    const fields = sentence.split(',');
                    const magneticVariationDirection = fields[11].toString();
        
                    return magneticVariationDirection
        
                },
                checksum: function(sentence) {
        
                    const sentenceWithoutChecksum = sentence.substring(1, sentence.indexOf('*'));
        
                    let checksum = 0;
                    for (let i = 0; i < sentenceWithoutChecksum.length; i++) {
                        checksum ^= sentenceWithoutChecksum.charCodeAt(i);
                    }
        
                    const checksumHex = checksum.toString(16).toUpperCase();
                    return checksumHex.length === 1 ? "0" + checksumHex : checksumHex;
                },
            }
        };

    }

    getInfo(property, sentence) {
        
        const fields = sentence.split(',');
    
        // Check if the sentence starts with "$" and has at least two fields
        if (sentence.startsWith('$') && fields.length >= 2) {
    
            const sentenceType = fields[0].substring(1).toLowerCase();
            const coordinatesProperty = property;
            const result = this.combinedObject[sentenceType][coordinatesProperty](sentence);
            return result;
    
        } else {
            return "Invalid NMEA Sentence"; // Invalid NMEA sentence
        }
    }
    




    getGPGGA(sentence)
    {

        // GPGGA
        console.log(this.combinedObject.gpgga.sentenceType(sentence));
        console.log(this.combinedObject.gpgga.coordinates(sentence));
        console.log(this.combinedObject.gpgga.time(sentence));
        console.log(this.combinedObject.gpgga.fixType(sentence));
        console.log(this.combinedObject.gpgga.satellites(sentence));
        console.log(this.combinedObject.gpgga.hdop(sentence));
        console.log(this.combinedObject.gpgga.altitude(sentence));
        console.log(this.combinedObject.gpgga.altitudeUnits(sentence));    
        console.log(this.combinedObject.gpgga.checksum(sentence));  
        
    }

    getGPRMC(sentence)
    {

        // GPRMC
        console.log(this.combinedObject.gprmc.sentenceType(sentence));
        console.log(this.combinedObject.gprmc.time(sentence));
        console.log(this.combinedObject.gprmc.positionStatus(sentence));
        console.log(this.combinedObject.gprmc.coordinates(sentence));
        console.log(this.combinedObject.gprmc.speed(sentence));
        console.log(this.combinedObject.gprmc.heading(sentence));
        console.log(this.combinedObject.gprmc.date(sentence));
        console.log(this.combinedObject.gprmc.magneticVariation(sentence));
        console.log(this.combinedObject.gprmc.magneticVariationDirection(sentence));
        console.log(this.combinedObject.gprmc.checksum(sentence));
    }
   
}

// Export module to use it in browser and NodeJS
try {
   module.exports = exports = Lwder;
} catch (e) {}

