import fs from "fs"

const readfile=fs.createReadStream("lellu.txt")
const writefile=fs.createWriteStream("lellussss.txt")

readfile.pipe(writefile)   