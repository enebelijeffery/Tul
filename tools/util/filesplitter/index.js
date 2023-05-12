const {readFile}=require("fs").promises
const readline=require("readline")
const input =require("input")


const main=async()=>{
   const getFile=async()=>{
   while(true){
    try{
   	const filePath= await input.text("enter file to split path locally or purblic>")
   	    if(filePath.includes("http")){
   	      const res= await axios(filePath)
   	       return res.data;
   	          }else{
   	            // let passList=[]
   	        const readFile=await readFile(filePath);
   	            // const rl= readline.createInterface({input:fd})
   	            // for await(const line of rl){
   	              // passList.push(line);
   	        // }
   	              return readFile
   	     }
   	     break         
   	 }catch(e){
   	 	console.log(e)
   	 }     
   	}      
   }	
   const getSplitParams=async()=>{
   	while(true){
   		try{
   		    // const numOfFiles= await input.text("enter number of files>")
   		    const splitParameter=await input.text("enter your splitting parameter>")
   		    
   			break
   		}catch(e){
   			console.log(e)
   		}
   	}
   }

   const splitFile=async()=>{
   	const numOfFiles= parseInt() await input.text("enter number of files>"))
   	const file=await getFile()
   	const splitParams=await getSplitParams()
   	if(splitParams===""){
   		
   	}else{
   		const splittedFile=file.split(splitParams)
   		const length =splittedFile.length
   		const numOfSplitContentParFile=length/numOfFiles
   		
   	}
   	
   }
}
main ()
