const express = require('express');
const app = express();
const mqtt = require('mqtt');
const options = {
    username: 'admin',
    password: 'elkoep'
};
const client = mqtt.connect('mqtt://10.10.3.183:1883', options);

var values = {};
var error = false;
var errorMessage = 'ERROR: ';

client.on("connect", ()=>{
    console.log("STATUS: Connected to the MQTT server!");
    client.subscribe('test/testval', (err) => {
        if(!err){
            error = true;
            errorMessage += 'Cannot subscribe to the topic';
        }
    });
})

client.on("message", (topic, message) => {
    values[topic] = message.toString();
    client.end();
});

client.on('error', (error) => {
    console.error('Connection failed: ', error);
    error = true;
    errorMessage += error;
    client.end();
});

app.get('/', (req, res) => {
    if(error){
        res.send(errorMessage);
    }else{
        let values = null;
        for(let key in values){
            if(values.hasOwnProperty(key)){
                values += key + ' - ' + values;
            }
        }
        res.send(values);
    }
    res.end();
}) 

const PORT = process.env.PORT ||5000;

app.listen(PORT,console.log(
  `Server started on port ${PORT}`));