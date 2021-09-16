
var amqp = require("amqplib");

const mesg = {number:process.argv[2]}

connect();  

async function connect(){ 
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(mesg)));
        console.log(`Job sent succesfully ${mesg.number}`);
    } 
    catch (ex){ 
        console.log(ex);
    }
} 