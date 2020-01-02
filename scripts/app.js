/**
 * The alternative to this is to do this
 * window.addEventListener('load', ()=>{
 * }); 
 * and put every single code here into the same place
 */

window.addEventListener('load', ()=>{
    console.log('Bull shit');
    let long;
    let lat;
    const tempratureDescription = document.querySelector('.temprature-description');
    const tempratureDegree = document.querySelector('.temprature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const tempratureSection = document.querySelector('.degree-section');
    const tempratureSectionSpan = document.querySelector('.degree-section span');

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let proxy = 'http://cors-anywhere.herokuapp.com/';
            proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/32ba56ee9febcd65150fb798a301ea31/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                console.log('Data: ', data);
                const {temperature, summary, icon} = data.currently;

                // Set dom elements
                tempratureDegree.textContent = temperature;
                tempratureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone; 

                // FORMULAR FOR CELCIUS
                let celcius =  (temperature - 32) * (5/9);

                setIcons(icon, document.querySelector('.icon'));

                // Change temprature to celcius
                tempratureSection.addEventListener('click', () => {
                    if(tempratureSectionSpan.textContent === 'F'){
                        tempratureSectionSpan.textContent = 'C';
                        tempratureDegree.textContent = Math.floor(celcius);
                    }else{
                        tempratureSectionSpan.textContent = 'F';
                        tempratureDegree.textContent = temperature;
                    }
                });
            })
             
        });

     
    }else{
        alert('Location not supported in browser')
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon =icon.replace(/-/g,"_").toUpperCase(); //replacinf the _ with - and changing the text to upper case
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
}); 


/**
 * A better way of writting the code that did not work
 */
// (function (){
//     let long;
//     let lat;
//     const tempratureDescription = document.querySelector('.temprature-description');
//     const tempratureDegree = document.querySelector('.temprature-degree');
//     const locationTimezone = document.querySelector('.location-timezone');
//     const tempratureSection = document.querySelector('.degree-section');
//     const tempratureSectionSpan = document.querySelector('.degree-section span');

    
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(position =>{
//             long = position.coords.longitude;
//             lat = position.coords.latitude;
//             const proxy = 'http://cors-anywhere.herokuapp.com/';
//             const api = `${proxy}https://api.darksky.net/forecast/32ba56ee9febcd65150fb798a301ea31/${lat},${long}`;

//             fetch(api)
//             .then(response => {
//                 return response.json();
//             })
//             .then(data =>{
//                 console.log('Data: ', data);
//                 const {temperature, summary, icon} = data.currently;

//                 // Set dom elements
//                 tempratureDegree.textContent = temperature;
//                 tempratureDescription.textContent = summary;
//                 locationTimezone.textContent = data.timezone; 

//                 // FORMULAR FOR CELCIUS
//                 let celcius =  (temperature - 32) * (5/9);

//                 setIcons(icon, document.querySelector('.icon'));

//                 // Change temprature to celcius
//                 tempratureSection.addEventListener('click', () => {
//                     if(tempratureSectionSpan.textContent === 'F'){
//                         tempratureSectionSpan.textContent = 'C';
//                         tempratureDegree.textContent = Math.floor(celcius);
//                     }else{
//                         tempratureSectionSpan.textContent = 'F';
//                         tempratureDegree.textContent = temperature;
//                     }
//                 });
//             })
             
//         });

     
//     }else{
//         alert('Location not supported in browser')
//     }

// })();


// /**
//  * Other function or methods in the whole stack
//  */
// function setIcons(icon, iconID){
//     const skycons = new Skycons({color: "white"});
//     const currentIcon =icon.replace(/-/g,"_").toUpperCase(); //replacinf the _ with - and changing the text to upper case
//     skycons.play();
//     return skycons.set(iconID, Skycons[currentIcon])
// }

