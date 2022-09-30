var imageCapture
var  reqcount=0;
navigator.geolocation.watchPosition(successCallback, errorcallback, options);

function successCallback(position)
{
    const {accuracy ,latitude, longitude, altitude, heading, speed}= position.coords;
    reqcount++;
    long.innerHTML = " Longitude  : "+longitude +" <br>";
    lat.innerHTML = " Lattitude  : "+latitude +" <br>";
    al.innerHTML = " Altitude  : "+altitude +" <br>";
    hd.innerHTML = " Heading  : "+heading +" <br>";
    sp.innerHTML = " Speed  : "+speed +" <br>";
    acc.innerHTML= " Accuracy  :"+accuracy +" <br>"
    
    //map.innerHTML ='<iframe width ="700" height ="300" src="https://maps.google.com/maps?q='+longitude+','+latitude+'&amp;z=15&amp;output=embed"></iframe>'
}

function errorcallback(error)
{

}
var options=
{
   enableHighAccuracy : false,
   timeout:5000,
   maximumAge : 0 

}


const video =document.getElementById("videoElement");
const canvas =document.getElementById("imageContainer");
const context =canvas.getContext("2d");
const button  =document.getElementById("button");
const constraints = {audio:false , video : {facingMode:"user"}}
const result = document.getElementById("txt")

//button.addEventListener("click",() =>
function sendRequest()
{
 context.drawImage(video,0 , 0,canvas.width,canvas.height);

 $.post("/api",
 {
     label:"video capture",
     content: canvas.toDataURL("image/png")
 },
 function(data,status)
 {
    document.getElementById("txt1").innerHTML = data;
 });
}

//For front camera
navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream)
{
 video.srcObject =mediaStream;
});

//for back camera

// if(navigator.mediaDevices.getUserMedia)
// {
//     navigator.mediaDevices.getUserMedia({video:true})
//     navigator.mediaDevices.getUserMedia({video:{    facingMode: {exact: 'environment'}}})
//         .then(function(s)
//         {
//             video.srcObject=s;
//         })
// }
// else
// {
//     console.log("There is no Media device")
// }


var refreshIntervalId;
function stopcalling()
{
    clearInterval(refreshIntervalId);
    result.innerHTML="You Stopped contributing..";
    result.style.color="red";
    document.getElementById("button").disabled =false;
    document.getElementById("stopbtn").disabled =true;
    document.getElementById("txt1").innerHTML ="";
}

function startcalling()
{
    result.innerHTML="You started Contributing!!";
    result.style.color="#165954";
    document.getElementById("stopbtn").disabled =false;
    document.getElementById("button").disabled =true;
    refreshIntervalId = setInterval(sendRequest, 5000);    
}
