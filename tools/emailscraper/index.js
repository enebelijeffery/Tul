const axios = require("axios");
const input = require("input");
const cheerio= require("cheerio");




const yahoofi=async()=>{
  const res =
}

const main=async()=>{
        const state=[]
    const dork = await input.text("enter dork>");
    const googleDork=async(dork)=>{
       for(const googlefor1 of Array(1).keys()){
            try{
            let res = await axios(`http://www.google.com/search?hl=en&q=${dork}&start=${toString(googlefor1)}0`);
            let $ =cheerio.load( res.data)
            
            const data = $("a").map((i,e)=>{
                  state.push($(e).attr("href"))
            }) 
           console.log("data",state);
       }catch(err){
            console.log("err",err)
       }
       }
    }
    googleDork(dork)
} 
main()
