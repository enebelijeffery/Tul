const input =require("input")
// const nodemailer = require("nodemailer");
const fs =require("fs");
const {open,readFile,appendFile,writeFile}=require("fs").promises
const readline=require("readline")
const util = require("util")
const exec=util.promisify(require("child_process").exec)
const axios=require("axios")

async function mainSender(name,frm,replyTo,subject,smtpUser,smtpPass,proxy) {
       
const emailReg= new RegExp("^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$")
   const isEmailValid=(email)=>{
   	if (!email){
   	        return false;
   	}else{
    if(email.length>254){
   	     return false;
   	}else{
   	 var valid = emailReg.test(email);
   	 if(!valid){
        return false;
   	  }else{
   	    var parts = email.split("@");
   	    if(parts[0].length>64){
   	        return false;
   	    }else{
   	    var domainParts = parts[1].split(".");
   	    if(domainParts.some(function(part) { return part.length>63; })){
   	        return false;
   	     }else{
   	    return true;
   	    }
   	    }
   	  }
   	 }
   	}
   }
   const splitFunc=async(line)=>{
   	if(line.includes(":")){
   		const splitLine=line.split(":")
   		return splitLine[0]
   	}else{
   		return line
   	}
   }
   
   const getEmail=async()=>{
       const {stdout,stderr}=await exec(`touch sentemails/'${frm}.txt'`)
       if(stdout){
       	console.log("out",stdout)
       }else if(stderr){
       	console.log("err",stderr)
       }       
       const fd=fs.createReadStream("./emails.txt");
       const rl=readline.createInterface({input:fd});
       for await (const line of rl){
           const email =await splitFunc(line)
           console.log(email)
            const mailCount= await getMailCount()
            console.log(mailCount)
            let count=parseInt(mailCount)
            console.log(count)
            if(count===300){
                   const clearCount=fs.createWriteStream("./mailcount.txt")
                   clearCount.write("0");
                   return true
             }else{
                   if(isEmailValid(email)){
                         const sfd=fs.createReadStream(`sentemails/${frm}.txt`)
                         const srl=readline.createInterface({input:sfd})
                         let checkForMatch;
                         for await (const ln of srl){
        	                   if(email===ln){
        	                    	checkForMatch="match found";
                             	}
                          }
                         if(checkForMatch!=="match found"){
                                const isSent= await getTemplate(email)
                                if(isSent==="sent"){
                                       count=count+1
                                       console.log("2",count)
                                       const write=fs.createWriteStream("./mailcount.txt",{flag:'a'})
                                        const countToString = count.toString()
                                        write.write(`${countToString}\n`)
                                  }
                            }
                      }
               }
          }
  }
   
  const getTemplate=async(emails)=>{ 
      const data = await readFile("emailTemplate.html",{encoding:"utf8"})
        return  await send(emails,data)
  }
 

 const send=async(to,html)=>{
    const options={
            method:"post",
            data:JSON.stringify({
            smtp:"smtp-relay.sendinblue.com",
             port:587,
             user:smtpUser,
             pass:smtpPass,
             name:name,
             from:frm,
             subject:subject,
             to:to,
             replyto:replyTo,
             message:html,
             attachment:""
           })
      }
      try{
      const res=await axios(proxy,options)
      console.log(res.data.includes("Message sent!"))
    if(res.data.includes("Message sent!")){
     await appendFile(`sentemails/${frm}.txt`,`${to}\n`)
     return "sent"
    }else{
    	console.log(`ERR: MESSAGE WASNT SENT TO : ${to} `)
    }
    }catch(e){
    	console.log(e)
    }
  }
return await getEmail()


}

const frmaddress=async()=>{
    
    let frm={
    	name:null,
    	address:null
    }
     while(true){
         try{
              frm.name=sname =await input.text("enter senders name[+]");
             frm.address=saddress=await input.text("enter senders address[+]")
             break
         }catch(e){
             console.log(e)
         }
     }
     return frm;
    }

const replTo=async()=>{
     let replyTo;
      while(true){
            try{
            replyTo=await input.text("enter reply to address[+]");
            break;
         }catch(e){
         console.log(e)
           }
      }
     return replyTo;
    }

 const subjct=async()=>{
      let subject;
      while(true){
         try{
         subject=await input.text("enter subject[+]");
          break;
             }catch(e){
             console.log(e)
             }
         }
         return subject
       }


const authDetails=async()=>{
    const authDetails=[]
	const fd=fs.createReadStream("./smtp.txt")
	const rl=readline.createInterface({input:fd})
	for await(const line of rl){
		authDetails.push(line)
	}
	return authDetails
}
const getSmtp=async()=>{
	const smtp=[]
	    const fd=fs.createReadStream("./smtp.txt")
        const rl=readline.createInterface({input:fd})
	     for await (const line of rl){
	        smtp.push(line)
	      }
	      const smtpLength=smtp.length
      return smtpLength
}
const getUsedSmtp=async()=>{
    const usedSmtp=[]
	const fd=fs.createReadStream("./usedsmtp.txt")
	const rl=readline.createInterface({input:fd})
	for await (const line of rl){
	   usedSmtp.push(line)
	 }
	 const smtpLength=usedSmtp.length
	 return smtpLength
}
const getDate=async()=>{
    let date
	const fd=fs.createReadStream("./date.txt")
	const rl=readline.createInterface({input:fd})
	for await (const line of rl){
       date=line
	 }
	 return date
}
const getMailCount=async()=>{
    let mailCount;
	const fd=fs.createReadStream("./mailcount.txt")
	const rl=readline.createInterface({input:fd})
	for await (const line of rl){
	   mailCount=line
	}
	if(mailCount){
	return mailCount
	}else{
		return await getMailCount()
	}
}
const checkDate=async()=>{
	const getnewDate=new Date()
	const date = getnewDate.toString()
	const splitNewDate=date.split(" ")
	const getOldDate= await getDate()
	const splitOldDate= getOldDate.split(" ")
	const newDay=async()=>{
	  
		if(splitNewDate[0]!==splitOldDate[0]){
		    await writeFile("./mailcount.txt","0")
	        await writeFile("./smtpcount.txt","0")
			const handler=await open("./usedsmtp.txt","r+")
			await handler.truncate(0)
			await handler.close()
			if(await getMailCount()==="0"){
			return "new day"
			}else{
				newDay()
			}
		}else{
			return "not a new day"
		}
	}
	console.log(await newDay())
	if(await newDay()==="new day"||await newDay()==="not a new day"){
	let  mailCount= await getMailCount()
	const mailCountToNum=parseInt(mailCount)
	const time =splitNewDate[4]
	const splitTime=time.split(":")
	const hours=parseInt(splitTime[0])
	const munites=parseInt(splitTime[1])
	const seconds=parseInt(splitTime[2])
	const hoursToSec=hours*60*60
	const munitesToSec=munites*60
	const timeToSec=hoursToSec+munitesToSec+seconds
	const timeLeft=86400-timeToSec

	const usedSmtp=await getUsedSmtp()
	const smtp = await getSmtp()
	const availableSmtp=smtp-usedSmtp
	const multiply=availableSmtp*300
	const availableLimit=multiply-mailCountToNum
	const usedUpLimit=(smtp*300)-availableLimit
	const proxies=await getProxy()
	const numOfProxy=proxies.length

	console.log(`[+] YOU HAVE CURRENTLY  USED UP ${usedUpLimit} OF YOUR DAILY SENDING  LIMIT } [+]`)
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")	
	console.log(`[+] YOUR CURRENTLY AVAILABLE SENDING LIMIT :  ${availableLimit} [+]`)
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log(`[+] TIME LEFT FOR YOUR NEXT SENDING CYCLE : ${timeLeft} SECONDS [+]`)
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log(`[+] YOUR  CURRENTLY USED SMTP SERVER IS  :   ${usedSmtp} [+]`)	
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log(`[+] YOUR CURRENTLY AVAILABLE SNTP SERVER  :  ${availableSmtp} [+]`)
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log(`[+] TOTAL NUMBER OF AVAILABLE  PROXY  SERVER5  :  ${numOfProxy} [+]`)
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log(`[+] TOTAL NUMBER OF AVAILABLE  SMTP  SERVER5  :  ${smtp} [+]`)
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	console.log("[+] ||                  ××                     ××               ||  [+]")
	
	stampDate()
	}
}
const getSmtpCount=async()=>{
    let smtpCount;
	const fd=fs.createReadStream("./smtpcount.txt")
	const rl=readline.createInterface({input:fd})
     for await (const line of rl){
        smtpCount=line
     }
     return smtpCount
}
const stampDate=async()=>{
	const newDate = new Date()
	const newDateString=newDate.toString()
    await writeFile("./date.txt",newDateString)
}
const getProxy=async()=>{
	const proxy=[]
	 const fd=fs.createReadStream("./proxy.txt")
	 const rl=readline.createInterface({input:fd})
	 for await(const line of rl){
         proxy.push(line)
	}
	return proxy
}
const main=async()=>{
   await checkDate();
	const smtpAuthDetails=await authDetails()
	const frm=await frmaddress()
	const replyTo=await replTo()
	const subject=await subjct()
	const proxies=await getProxy()
	
	const smtpCount= await getSmtpCount()
	let count=parseInt(smtpCount)
	for (const line of smtpAuthDetails){
	    const fd=fs.createReadStream("./usedsmtp.txt")
	    const rl=readline.createInterface({input:fd})
	    let checkMatch;
	    for await (const ln of rl){
	    	if(line===ln){
	    		checkMatch="match found"
	    	}
	    }
	    if(checkMatch!=="match found"){
	    const proxy=proxies[count]
	    const splitLine=line.split(":")
	    const  smtpUser=splitLine[0]
	    const smtpPass=splitLine[1]
		const asExceedLimit= await mainSender(frm.name,frm.address,replyTo,subject,smtpUser,smtpPass,proxy)
		if(asExceedLimit){
		await appendFile(`./usedsmtp.txt`,`${line}\n`)
		count=count+1
		const writeSmtpCount =fs.createWriteStream(`./smtpcount.txt`)
	    writeSmtpCount.write(`${count}\n`)
	    }
		}
		
	}
   
}
main()
