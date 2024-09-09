const express = require('express');
const app = express();
const mqtt = require('mqtt');
const options = {
    username: 'admin',  // zadej své uživatelské jméno
    password: 'elkoep'     // zadej své heslo
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
    console.log('Client connected'); 
    res.send('A simple Node App is '
        + 'running on this server') 
    res.end() 
}) 

const PORT = process.env.PORT ||5000;

app.listen(PORT,console.log(
  `Server started on port ${PORT}`));