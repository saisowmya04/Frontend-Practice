let hrs=0;
let min=0;
let sec=0;

let refElem=document.getElementById("ref");
let count=0;

function start(){
    sec++;
    refElem.innerText=sec;
    

}
setInterval(start,1000);

