var mqtt = require('mqtt');
const fs = require('fs');

var options={
username:'common',
password: 'iic2173',
port:9000
//port:8883,
//host:'192.168.1.71',
//protocol:'mqtts',

}

const CreateRoom = (dic) => {    
    
    
    try {
  
      const tokenChat = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MjUzMjc4MjQxMSwic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg3ODI0MTF9.7PWs9qsmUSTJ-EKUzoZkki_devfHxlraKRVhG9B0dbQ'
      const name = dic ; //hardcodeado por ahora 
      const permissionsUrl = `http:/api:7777/rooms`;
      console.log(name, "name");
      console.log(dic, "dic")
      fetch(permissionsUrl, {
        method: "POST",
        body: JSON.stringify({
                "name": name,
                "level_admin":"100",
                "type":"group"
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenChat}`,
        },
      })
      .then(response => response.json(), console.log("response"))
      
      .then(data => {
        let permission = data.url; console.log("permission")
        });
    } catch (e) {
      console.log("error");
      console.log(e.message);
      
  
  
    }
    
  };
 

const { Client } = require('pg');
const { doesNotMatch } = require('assert');
    //:host => 'db', :user => 'postgres', :password =>'password', :port => '5432'


    const insertLoc = async (type1, lat, lon, location, message, level) => {
        const client1 = new Client({
            host: 'db',
            user: 'admin',
            password: '1234',
            port: 5432,
            database:'SmartCities'
        });
        try {
            await client1.connect(); 
            await client1.query(
                `INSERT INTO "maps_maps" ("type1", "lat", "lon", "location", "message", "level")  
                VALUES ($1, $2, $3, $4, $5, $6)`, [type1, lat, lon, location, message, level]); // sends queries
            await client1.end(); 
            
            return true;

        } catch (error) {
            console.error(error.stack);
            return false;
        } 
    };

    // const getLoc = async (type1, lat, lon, location, message, level) => {
    //     const client1 = new Client({
    //         host: 'db',
    //         user: 'admin',
    //         password: '1234',
    //         port: 5432,
    //         database:'SmartCities'
    //     });
    //     try {
    //         await client1.connect(); 
    //         await client1.query(
    //             `SELECT * FROM "maps_maps" WHERE "type1"= "lat", "lon", "location", "message", "level")  
    //             VALUES ($1, $2, $3, $4, $5, $6)`, [type1, lat, lon, location, message, level]); // sends queries
    //         await client1.end(); 
            
    //         return true;

    //     } catch (error) {
    //         console.error(error.stack);
    //         return false;
    //     } 
    // };


var topic="global-emergencies";

var client  = mqtt.connect('mqtt://planetaryevents.iic2173.net',options);
console.log("connected flag  " + client.connected);
client.subscribe(topic)



client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
    var dic = JSON.parse(message)
    console.log(parseInt(dic["level"]))
    if (parseInt(dic["level"]) >= 900) {
        
        CreateRoom(dic["location"])
    }
    
    insertLoc(dic["type"], dic["lat"], dic["lon"], dic["location"], dic["message"],dic["level"]).then(result => {
        if (result) {
            console.log('locación insertada');
        }
    });
    });

//handle errors
client.on("error",function(error){
console.log("Can't connect" + error);
process.exit(1)});
