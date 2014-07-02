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

 

    return function(){
        introAnimations();
        setWayPoints();


    };
})();

WebFont.load({
    google: { families: [ 'Permanent+Marker::latin', 'Roboto::latin' ] },
    active: main
});

var s = skrollr.init();

skrollr.menu.init(s);

