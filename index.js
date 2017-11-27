const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')



const csvToJson = (filePath='./customer-data.csv') => {
    console.log('Converting ', filePath)

    const convert = (file, callback) => {
        let result = []

        csv().fromFile(file)
            .on('json', (jsonObj) => {
                result.push(jsonObj)
            })
            .on('done', () => {
                callback(null, result)
            })
            .on('error', (error) => {
                console.error(`Got error: ${error.message}`)
                callback(error)
            })
    }

    const folderName = uuidv1()
    
    fs.mkdirSync(folderName)

    convert(filePath, (error, data) => {
        if (error) return console.error(error)
        fs.writeFileSync(path.join(__dirname, folderName, 'result.json'), 
            JSON.stringify(data))
        console.log(`Converting is done in folder: ${folderName}`)
    })
}

csvToJson(process.argv[2])




