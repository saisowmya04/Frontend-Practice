function fun(){
    let refElem=document.getElementById("ref");

    let name="balayya";
    let age=16;

    let card=`
        <div class="card">
            <img src="./assets/image2.jpeg alt="">
            <h1>Jai Balayya</h1>
            
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br> 
                Odio commodi, recusandae id temporibus necessitatibus qui. <br>
                Dignissimos ducimus quo nisi odio magni, cumque doloribus harum! Ducimus atque similique assumenda. <br>
                Impedit, molestiae.
            </p>

            <button>Read More</button>
        </div>
    `


    let cards="";
    for(let i=1;i<=10;i++){
        cards+=card;
    }

    refElem.innerHTML=cards;
}