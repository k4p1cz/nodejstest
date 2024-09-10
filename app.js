const express = require('express');
const app = express();
const mqtt = require('mqtt');
const options = {
    username: 'admin',
    password: 'elkoep'
};
const client = mqtt.connect('mqtt://10.10.3.183:1883', options);

client.on("connect", ()=>{
    console.log("STATUS: Connected to the MQTT server!");
    client.subscribe('test/testval')
})

client.on("message", (topic, message) => {
    console.log(message.toString());
    client.end();
});

client.on('error', (error) => {
    console.error('Connection failed: ', error);
    client.end();
});

app.get('/', (req, res) => {
    res.send('Test');
    res.end();
}) 

const PORT = process.env.PORT ||5000;

app.listen(PORT,console.log(
  `Server started on port ${PORT}`));