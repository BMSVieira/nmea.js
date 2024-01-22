
/*-------------------------
Nmea.js
Made by: Bruno Vieira
--------------------------- */

class Nmea {

    constructor(option) {

        // Global
        let _this = this;
        this.option = option;
        this.type = null;

        // Defines nmea type
        this.nmeaType = function(sentence)
        {
            const splitSentence = sentence.split(',');
            if (sentence.startsWith('$') && splitSentence.length >= 2) {
        
                const sentenceType = splitSentence[0].substring(1).toLowerCase();
                if(sentenceType.length >= 5) { this.type = sentenceType; }
                   
            } else { return false }
        }

        // Check if it came from the constructor or parameter
        this.checkSource = function(sentence)
        {
            if(this.nmeaType(sentence))
            {
                if(!this.option) { return sentence;  } else { return this.option  }
            }
        }

        // Check sentence type
        this.validateSentence = function(sentence)
        {
            const splitSentence = sentence.split(',');
            if (sentence.startsWith('$') && splitSentence.length >= 2) {
        
                const sentenceType = splitSentence[0].substring(1).toLowerCase();
                if(sentenceType.length >= 5) { return true; }
                   
            } else { return false }
        }

        // Check if property exists
        this.checkProperty = function(property)
        {
            if (this.nmea[this.type] && this.nmea[this.type][property]) {
                return true
            } else {
                return "There is no property for that sentence."
            }
        }

        // Main object
        this.nmea = {
            gpgga: {
                sentenceType: function(sentence) { return "GPGGA"; },
                time: function(sentence) {
        
                    const timeField = sentence[1];
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
        
                    if (sentence[0] !== '$GPGGA' || sentence.length < 14 || sentence[6] === '0') {
                        return null;
                    }
        
                    const latitude = parseFloat(sentence[2].slice(0, 2)) + parseFloat(sentence[2].slice(2)) / 60;
                    const longitude = parseFloat(sentence[4].slice(0, 3)) + parseFloat(sentence[4].slice(3)) / 60;
        
                    const latitudeDirection = sentence[3] === 'N' ? 1 : -1;
                    const longitudeDirection = sentence[5] === 'E' ? 1 : -1;
        
                    const coordinates = {
                        latitude: latitude * latitudeDirection,
                        latitudeDirection: sentence[3],
                        longitude: longitude * longitudeDirection,
                        longitudeDirection: sentence[5]
                    };
        
                    return coordinates;
        
                },
                fixType: function(sentence) {
    
                    if (sentence.length >= 7) {
                      const fixType = sentence[6];
                      return fixType;
                    } else {
                      return 'Error: Invalid sentence format';
                    }

                },
                satellites: function(sentence) {
    
                    if (sentence.length >= 9) {
                      const satellites = sentence[7];
                      return satellites;
                    } else {
                      return 'Error: Invalid sentence format';
                    }

                },
                hdop: function(sentence) {
        
                    if (sentence.length >= 10) {
                        const hdop = sentence[8];
                        return hdop;
                      } else {
                        return 'Error: Invalid sentence format';
                      }

                },
                altitude: function(sentence) {
        
                    if (sentence.length >= 11) {
                        const altitude = sentence[9];
                        return altitude;
                    } else {
                        return 'Error: Invalid sentence format';
                    }

                },
                altitudeUnits: function(sentence) {
        
                    if (sentence.length >= 12) {
                        const altitudeUnits = sentence[10];
                        return altitudeUnits;
                    } else {
                        return 'Error: Invalid sentence format';
                    }

                },
                checksum: function(sentence)
                {
                    sentence = sentence.join(',');
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
        
                    const dateField = sentence[9];
                    const timeField = sentence[1];
    
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
        
                    const positionStatus = sentence[2].toString();
        
                    return positionStatus
        
                },
                coordinates: function(sentence) {
        
                    if (sentence[0] !== '$GPRMC' || sentence.length < 10 || sentence[2] !== 'A') {
                        return null;
                    }
        
                    const latitude = parseFloat(sentence[3].slice(0, 2)) + parseFloat(sentence[3].slice(2)) / 60;
                    const longitude = parseFloat(sentence[5].slice(0, 3)) + parseFloat(sentence[5].slice(3)) / 60;
        
                    const latitudeDirection = sentence[4] === 'N' ? 1 : -1;
                    const longitudeDirection = sentence[6] === 'E' ? 1 : -1;
        
                    const coordinates = {
                        latitude: latitude * latitudeDirection,
                        latitudeDirection: sentence[4],
                        longitude: longitude * longitudeDirection,
                        longitudeDirection: sentence[6],
                    };
        
                    return coordinates;
        
                },
                speed: function(sentence) {
        
                    const speedInKnots = parseFloat(sentence[7]);
                    return speedInKnots;
        
                },
                heading: function(sentence) {
        
                    const heading = parseFloat(sentence[8]);
                    return heading;
                },
                date: function(sentence) {
        
                    const date = sentence[9].toString();
        
                    const day = parseInt(date.substring(0, 2), 10);
                    const month = parseInt(date.substring(2, 4), 10) - 1; // Months are 0-indexed in JavaScript
                    const year = 2000 + parseInt(date.substring(4), 10);
        
                    const regularDate = new Date(year, month, day);
                    return regularDate;
        
                },
                magneticVariation: function(sentence) {
        
                    const magneticVariation = sentence[10].toString();
                    return magneticVariation
        
                },
                magneticVariationDirection: function(sentence) {
        
                    const magneticVariationDirection = sentence[11].toString();
                    return magneticVariationDirection
        
                },
                checksum: function(sentence) {
        
                    sentence = sentence.join(',');
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

    /*
    ** Methods
    */

    getInfo(property, sentence) {

        // Check if source if from constructor or parameter
        this.checkSource(sentence);

        // Check if sentence is provided
        if(sentence && this.validateSentence(sentence))
        {
            const splitSentence = sentence.split(',');
            const coordinatesProperty = property;
            const result = this.nmea[this.type][coordinatesProperty](splitSentence);
            return result;
        
        } else {
            return "Invalid NMEA Sentence! must be provided in constructor or as parameter";
        }
    }

    /*
    ** API > Gets
    */

    get altitude() { 
        this.checkSource(this.option);
        if(this.checkProperty("altitude"))
        {
            try {
                const result = this.nmea[this.type]["altitude"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get altitudeUnits() { 
        this.checkSource(this.option);
        if(this.checkProperty("altitudeUnits"))
        {
            try {
                const result = this.nmea[this.type]["altitudeUnits"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get checksum() { 
        this.checkSource(this.option);
        if(this.checkProperty("checksum"))
        {
            try {
                const result = this.nmea[this.type]["checksum"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get coordinates() { 
        this.checkSource(this.option);
        if(this.checkProperty("coordinates"))
        {
            try {
                const result = this.nmea[this.type]["coordinates"](this.option.split(','));
                return result;
              } catch (error) {
                console.erwarnror("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get fixType() { 
        this.checkSource(this.option);
        if(this.checkProperty("fixType"))
        {
            try {
                const result = this.nmea[this.type]["fixType"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get hdop() { 
        this.checkSource(this.option);
        if(this.checkProperty("hdop"))
        {
            try {
                const result = this.nmea[this.type]["hdop"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get satellites() { 
        this.checkSource(this.option);
        if(this.checkProperty("satellites"))
        {
            try {
                const result = this.nmea[this.type]["satellites"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get sentenceType() { 
        this.checkSource(this.option);
        if(this.checkProperty("sentenceType"))
        {
            try {
                const result = this.nmea[this.type]["sentenceType"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get time() { 
        this.checkSource(this.option);
        if(this.checkProperty("time"))
        {
            try {
                const result = this.nmea[this.type]["time"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get date() { 
        this.checkSource(this.option);
        if(this.checkProperty("date"))
        {
            try {
                const result = this.nmea[this.type]["date"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get heading() { 
        this.checkSource(this.option);
        if(this.checkProperty("heading"))
        {
            try {
                const result = this.nmea[this.type]["heading"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get magneticVariation() { 
        this.checkSource(this.option);
        if(this.checkProperty("magneticVariation"))
        {
            try {
                const result = this.nmea[this.type]["magneticVariation"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get magneticVariationDirection() { 
        this.checkSource(this.option);
        if(this.checkProperty("magneticVariationDirection"))
        {
            try {
                const result = this.nmea[this.type]["magneticVariationDirection"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get positionStatus() { 
        this.checkSource(this.option);
        if(this.checkProperty("positionStatus"))
        {
            try {
                const result = this.nmea[this.type]["positionStatus"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }
    get speed() { 
        this.checkSource(this.option);
        if(this.checkProperty("speed"))
        {
            try {
                const result = this.nmea[this.type]["speed"](this.option.split(','));
                return result;
              } catch (error) {
                console.warn("Property 'altitudeUnits' does not exist in '"+this.type+"' sentence");
              } 
        }
    }


    /*
    ** API > Sets
    */
    set set(sentence)
    {
        try {
            if(sentence && this.validateSentence(sentence))
            {
                this.option = sentence;
            } 
          } catch (error) {
            console.error("Invalid NMEA Sentence! must be provided in constructor or as parameter");
          }
    }
}

// Export module to use it in browser and NodeJS
try {
   module.exports = exports = Nmea;
} catch (e) {}

