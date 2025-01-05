const cities = require("cities")
const readline = require("node:readline")
const SENTINEL = -1

const promptZip = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

exports.getZipInfo = () => {
    promptZip.question("Enter a five-digit zipcode; -1 to exit\n", zipcode => {
        if (zipcode == SENTINEL){
            promptZip.close()
        }
        else if(zipcode.length == 5){
            console.log(cities.zip_lookup(zipcode))
            this.getZipInfo()
        }
        else{
            console.log("Invalid Zipcode!")
            this.getZipInfo()
        }
    })
}