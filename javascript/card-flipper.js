function CartFlipper(){
    this.dom1 = null;
    this.dom2 = null;

    this.assignDOM = function(dom){
        if(this.dom1 == null) this.dom1 = dom;
        else if(this.dom2==null) {
            this.dom2 = dom;
            //console.log(this.dom2);
        }
    }

    this.flip_front_to_back = function(dom){
        this.assignDOM(dom);
        if(this.dom2 != null) {
            this.dom2.style.transform = "rotateY(180deg)";
            console.log(this.dom2);
        }
        else {
            this.dom1.style.transform = "rotateY(180deg)";
            console.log(this.dom1);
        }
    }

    this.flip_back_to_front = function(){
        this.dom1.style.transform = "";
        this.dom2.style.transform = "";
        this.dom1 = null; 
        this.dom2 = null;
    }

    this.destroy = function(){
        this.dom1.parentElement.style.visibility = "hidden";
        this.dom2.parentElement.style.visibility = "hidden";
        this.dom1 = null; 
        this.dom2 = null;
    }
}

