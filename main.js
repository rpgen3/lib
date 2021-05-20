(()=>{
    const h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").appendTo(h).text("ES2020以前");
    $("<button>").appendTo(h).text("randInt").on("click",()=>{
        msg(rpgen3.randInt(0,100));
    });
    const hMsg = $("<div>").appendTo(h);
    function msg(str, isError){
        $("<span>").appendTo(hMsg.empty()).text(str).css({
            color: isError ? 'red' : 'blue',
            backgroundColor: isError ? 'pink' : 'lightblue'
        })
    }
})();
