
var amqp = require("amqplib");

connect();
 
async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message=>{
            const input =JSON.parse(message.content.toString());
            console.log(`Recieved.job with input ${input.number}`)
            
            console.log(input.number)
            if(input.number == 7)// not === because it's a string
            {
                channel.ack(message);
            }
        }) 

        console.log("Waiting for messages...")
        }
    catch (ex){
        console.log(ex);
    }
}