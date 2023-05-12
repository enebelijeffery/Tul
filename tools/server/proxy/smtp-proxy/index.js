// const http =reqire("http")
// const nodemailer=require("nodemailer")
// const server=http createServer((req,res)=>{
	// nodemailer
// })
// server.listen(80)
const axios=require("axios")

const main=async()=>{
   const options={
   	    method:"post",
   	    data:JSON.stringify({
   	    	smtp:"smtp-relay.sendinblue.com",
   	            port:587,
   	            user:"checka353@gmail.com",
   	            pass:"fhYPVKjX4ASULy6Z",
   	            name:"Jeff",
   	            from:"jellvic853@gmail.com",
   	         //   subject:"test",
   	            to:"8015419814@txt.cricketwireless.net",
   	            // replyto:"",
   	            message:"hello baby",
   	            // attachment:""
   	    })
   }
	const res=await axios("https://route0002.000webhostapp.com",options)
	console.log(res.data);
}
main()
