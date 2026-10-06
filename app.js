require('dotenv').config({ quiet: true })
const readline = require('readline')
const geocode = require('./data/geocode')
const forecast = require('./data/forecast')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('Enter a country name: ', (country) => {
    rl.close()

    if (!country.trim()) {
        return console.log('Error: Please enter a country name.')
    }

    geocode(country, (error, location) => {
        if (error) return console.log('Error:', error)

        forecast(location.latitude, location.longitude, (error, weather) => {
            if (error) 
                return console.log('Error:', error)

            console.log('\n-----------------------------')
            console.log('Country:     ', country)
            console.log('Latitude:    ', location.latitude)
            console.log('Longitude:   ', location.longitude)
            console.log('Temperature: ', weather.temp + '°C')
            console.log('Condition:   ', weather.condition)
            console.log('-----------------------------')
        })
    })
})