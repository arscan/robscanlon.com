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

