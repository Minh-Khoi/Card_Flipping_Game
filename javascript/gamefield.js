Vue.component('gamefield', {
    template:`
    <div id="gamefield">
        <div class="cards" v-for="(link,index) in fileIMGlinks" :key="index" >
            <div class="flip-box singlecard" :id="index" 
                               @click="clickDOM($event.target.parentElement.parentElement)" >
                <div class="flip-box-inner" :data-ref="link">
                    <div class="flip-box-front">
                        <div style="width:100%;height:100%"></div>
                    </div>
                    <div class="flip-box-back">
                        <img :src="link" alt="card" style="width:100%;height:100%">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    components: ["singlecard"],
    data: function(){
        return{
            nums_img: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                                '11', '12','13','14','15','16','17' ],
            clickedDOM: 0,
            clickedTime: 0,
            destroyed: 0,
            startTime: new Date().getTime(),
            game: new CartFlipper(),
        }
    },
    methods: {
        clickDOM: function(dom){
            // console.log("start playing");
            this.game.flip_front_to_back(dom);
            console.log(this.clickedDOM);
            this.clickedTime++;
            if(this.clickedDOM < 1) {
                this.clickedDOM++;
            }
            else {
                this.clickedDOM = 0;
                //console.log(this.game.dom2.getAttribute("data-ref"));
                if(this.game.dom1.parentElement.id != 
                                        this.game.dom2.parentElement.id){
                    if(this.game.dom1.getAttribute("data-ref") != 
                            this.game.dom2.getAttribute("data-ref")) {
                        console.log("flip");
                        sleep(500);
                        console.log(this.game.dom2);
                        this.game.flip_back_to_front();
                    } else {
                        console.log("destroy");
                        this.game.destroy();
                        this.destroyed++;
                    }
                } else {
                    console.log("wrong click");
                    this.game.flip_back_to_front();
                }
            }
            if (this.destroyed==5) 
                        alert("You win the game after "+ this.clickedTime + " clicked times and "
                                + 0.001*Math.round(new Date().getTime() - this.startTime) + " seconds");
        },
    },
    computed: {
        fileIMGlinks: function(){
            let links = pickRandomly(this.nums_img);
            links.forEach(function(link, index){
                this[index] = "./images/".concat(this[index],".jpg");
                return link;
            },links)
            console.log(links);
            return links;
        }
    },
    created: function(){

    }
})

function shuffle(arr) {
    let a = arr.slice(0,arr.length);
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function pickRandomly(arr){
    let a=[], array=[]
    while (a.length < 5){
        const ranNum= Math.floor(Math.random() * 17);
        if(!a.includes(ranNum)) {
            array.push(arr[ranNum], arr[ranNum]);
            a.push(ranNum);
        }
    }
    return shuffle(array);
};
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}