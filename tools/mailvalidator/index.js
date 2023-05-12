const validator=require("deep-email-validator");
const fs=require("fs");
const axios=require("axios")
const readLine = require('node:readline/promises')

const  emailFilter=async()=>{
   const inputFilePath=()=>{
       let path=readLine.createInterface({input:process.stdin,output:process.stdout}) 
       path.question("enter email part>",(p)=>{
          getMails(p);
          path.close()
       })
   }   
   const getMails=async(emailpath)=>{
      let mailList=[]
      let mails=fs.createReadStream("/data/data/com.termux/files/home/downloads/combo-TXRkMchLjtBbjKJd.txt");
      let rl=readLine.createInterface({input:mails});
      for await(const line of rl){
          mailList.push(line)
      }
     filter(mailList)
   }
  const filter=(mailList)=>{
    for (const mails of mailList){
         splittedMail=mails.split(":");
        let mail=splittedMail[0]
      if(mail.includes("gmail.com")){
         console.log(mail)
        gmailValidator(mail)
       }else if(mail.includes("yahoo.com")){
        console.log(mail)
        
       }else if(mail.includes("outlook.com")){
        console.log(mail)
        outlookValidator(mail)
       }else if (mail.includes("hotmail.com")){
       console.log(mail)
        hotmailValidator(mail)
       }else if(mail.includes("aol.com")){
        console.log(mail)
        aolValidator(mail)
       }
    }
  }
 getMails()
}
emailFilter()
const gmailValidator=(email)=>{
    async function isEmailValid(email) {
         let isValid= validator.validate(email);
         return isValid.valid
     }
    if(isEmailValid()){
      let write=fs.createWriteStream("./validmail.txt",{flags:"a"});
      write.write(`${email}\n`)
     }
}

const yahooValidator=(email)=>{
   let url="https://login.yahoo.com/?.intl=nz";
   let options={
      method:"post",
      headers:{
        "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
        "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        
      },
      data:{
        "browser-fp-data":"%7B%22language%22%3A%22en-US%22%2C%22colorDepth%22%3A24%2C%22deviceMemory%22%3A8%2C%22pixelRatio%22%3A1%2C%22hardwareConcurrency%22%3A4%2C%22timezoneOffset%22%3A-60%2C%22timezone%22%3A%22Africa%2FLagos%22%2C%22sessionStorage%22%3A1%2C%22localStorage%22%3A1%2C%22indexedDb%22%3A1%2C%22openDatabase%22%3A1%2C%22cpuClass%22%3A%22unknown%22%2C%22platform%22%3A%22Win32%22%2C%22doNotTrack%22%3A%22unknown%22%2C%22plugins%22%3A%7B%22count%22%3A5%2C%22hash%22%3A%222c14024bf8584c3f7f63f24ea490e812%22%7D%2C%22canvas%22%3A%22canvas%20winding%3Ayes~canvas%22%2C%22webgl%22%3A1%2C%22webglVendorAndRenderer%22%3A%22Google%20Inc.%20(Intel)~ANGLE%20(Intel%2C%20Intel(R)%20HD%20Graphics%20Family%20Direct3D11%20vs_5_0%20ps_5_0%2C%20D3D11)%22%2C%22adBlock%22%3A0%2C%22hasLiedLanguages%22%3A0%2C%22hasLiedResolution%22%3A0%2C%22hasLiedOs%22%3A0%2C%22hasLiedBrowser%22%3A0%2C%22touchSupport%22%3A%7B%22points%22%3A0%2C%22event%22%3A0%2C%22start%22%3A0%7D%2C%22fonts%22%3A%7B%22count%22%3A48%2C%22hash%22%3A%2262d5bbf307ed9e959ad3d5ad6ccd3951%22%7D%2C%22audio%22%3A%22124.04347527516074%22%2C%22resolution%22%3A%7B%22w%22%3A%221366%22%2C%22h%22%3A%22768%22%7D%2C%22availableResolution%22%3A%7B%22w%22%3A%22728%22%2C%22h%22%3A%221366%22%7D%2C%22ts%22%3A%7B%22serve%22%3A1679906777277%2C%22render%22%3A1679906778862%7D%7D",
        deviceCapability:" %7B%22pa%22%3A%7B%22status%22%3Afalse%7D%7D",
        signin:" Next",
        acrumb:" kGvWwW6P",
        crumb: "kZurkok6QeE",
        persistent:"y",
        username: "roymichel58%40yahoo.com"
      }
   }
    async function isEmailValid(email) {
        let result=await axios(url,options);
        console.log(result)
        return 
    }
  isEmailValid()
}
yahooValidator()
const hotmailValidator=(email)=>{
   async function isEmailValid(email) {
        let isValid=validator.validate(email);
        return isValid.valid
   }
   if(isEmailValid()){
      let write=fs.createWriteStream("./validmail.txt",{flags:"a"});
      write.write(`${email}\n`)
     }
}

const outlookValidator=(email)=>{
    async function isEmailValid(email) {
        let isValid=validator.validate(email);
        return isValid.valid
    }
    if(isEmailValid()){
      let write=fs.createWriteStream("./validmail.txt",{flags:"a"});
      write.write(`${email}\n`)
     }
}

const aolValidator=(email)=>{
    async function isEmailValid(email) {
         let isValid=validator.validate(email);
         return isValid.valid
    }
    if(isEmailValid()){
      let write=fs.createWriteStream("./validmail.txt",{flags:"a"});
      write.write(`${email}\n`)
     }
}

