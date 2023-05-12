const axios=require("axios")

const request=async()=>{
   const options={
   	 method:"POST",
   	 data:JSON.stringify({
   	 	email:"samalexnder081@gmail.com"
   	 })
   }
	const res=await axios("https://www.amazon.com/ap/signin/141-2951280-4097435",options)
	console.log(res.data)
}
request()
