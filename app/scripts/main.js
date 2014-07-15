var  main = (function(){

    function introAnimations(){

        $("#nav .pull-left li").velocity("transition.slideDownIn", { stagger: 250 });

        $($("#nav .pull-right li").get().reverse()).velocity("transition.slideRightIn", { stagger: 250 });

        $("#nav a").mouseenter(function(){
            $(this).velocity("callout.pulse");
        });

        $("#title .title-element").velocity("transition.expandIn", {stagger: 250, begin: function(){$(this).css("visibility", "visible")}});

        $("#title #scroll-down").velocity("transition.bounceUpIn", {delay: 5000});


    }

    function setWayPoints(){


        $('#about').waypoint(function(direction) {
            if(direction === "down"){
                $("#nav").addClass("body-nav");
                $("#nav").css("opacity",1);
                $("#nav").css("display","none");
                $("#nav").velocity("transition.slideDownIn");
            } else {
                $("#nav").removeClass("body-nav");
                $("#nav").css("opacity",0);
            }

        }, { offset: 100 })

    }

    function setPraiseAnimations(){
        var shownCounter = 0;
        $("#praise-list li").each(function(index, element){
            if(index > 1){
                $(element).css("display","none");
            }
        });

        function swapAnimation(){
            $("#praise-list li").slice(shownCounter,2).velocity("transition.slideRightOut");
            setTimeout(function(){
                $("#praise-list li").slice(shownCounter,shownCounter + 2).css("display", "none");
                shownCounter = (shownCounter + 2) % $("#praise-list li").length;
                $("#praise-list li").slice(shownCounter,shownCounter + 2).css({visibility: "hidden", display: "inline-block"}).velocity("transition.slideLeftIn", {display: "inline-block"});
            }, 1000);
        }

        setInterval(swapAnimation, 10000);

    }

    function setLinks(data){
        var color;
        console.log(data.length);
        for(var i = 0; i< data.length; i++){
            color = parseInt(Math.random() * 50 +75, 10);
            $('<a/>', {
                text: data[i].name,
                href: data[i].url,
                style: "color: rgba(" + color + "," + color + "," + color + ", 1.0)"
            }).appendTo('#background-links');
        }
    }

    return function(){
        introAnimations();
        setWayPoints();
        setPraiseAnimations();
        $.ajax("http://links.robscanlon.com/userlinks.json").done(setLinks);
    };
})();

WebFont.load({
    google: { families: [ 
        'Permanent+Marker::latin', 
        'Roboto::latin', 
        'Open+Sans::latin',
        'Special+Elite::latin' ] },
    active: main
});

var s = skrollr.init();

skrollr.menu.init(s);

/* kings quest */

var Entity = Object.create(null, {
    location: {value: {top: 0, left: 0,  width: 0, height: 0}, enumerable: true, writable: true},
    bounds: {value: {top: 0, left: 0, width: 0, height: 0}, enumerable: true, writable: true},
    image: {value: null, enumerable: true, writable: true},
    element: {value: null, writable: true},
    parent: {value: null, writable: true},

    collidesWith: {value: function(other){

        return (other.bounds.top < this.bounds.top + this.bounds.height
                && other.bounds.top + other.bounds.height > this.bounds.top
                && other.bounds.left < this.bounds.left + this.bounds.width 
                && other.bounds.left + other.bounds.width > this.bounds.left);
    }},
    render: {value: function(){

        if(this.parent === null){
            return null;
        }

        if(!this.element) {
            /* TODO: FIGURE OUT WHY THIS ISN'T WORKING */
            this.element = $('div');
            this.parent.append(this.element);
        }

        this.element.css({
            "background-image": this.image,
            width: this.width,
            height: this.height,
            "z-index" : 1000 - this.height
        });
    }}
});


var Sprite = Object.create(Entity,{
    frameCount: {value: 0, writable: true},
    cols: { value: 1, writable: true},
    currentFrame: {value: 0, writable: true},
    facingDown: {value: true, writable: true},
    facingLeft: {value: true, writable: true},

    animate: {value: function(){
        this.currentFrame++;
        console.log(this.currentFrame);
    }}
});

var realm = {
    statics: [],
    placeStatics: function(config){

        for(var i = 0; i< config.length; i++){
            var tmp = Object.create(Entity);

            tmp.parent = $('#kq-game');
            tmp.image = '../images/kq/staticobject' + i + '.png';
            tmp.location = {
                top: config[i][0],
                left: config[i][1],
                width: config[i][2],
                height: config[i][3]
            }
            // TODO: FIGURE OUT WHY THIS ISN'T WORKING
            //tmp.render();

            this.statics.push(tmp);
        }
    }
};

 var graham = Object.create(Sprite);

 $(function(){
 realm.placeStatics([
     [0,0,138,250],
     [112,50,100,92],
     [129,142,100,36],
     [212,9,131,155],
     [320,70,94,135],
     [441,88,66,120],
     [829,47,130,164],
     [728,83,99,131],
     [942,27,123,127],
     [985,167,32,23],
     [1097,34,144,184],
     [1056,56,115,115]]);
  
  setInterval(function(){graham.animate()}, 1000);

 });

