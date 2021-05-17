async (()=>{
    const { $ } = await import('https://rpgen3.github.io/lib/lib/jquery-3.5.1.min.js');
    const rpgen3 = await import('https://rpgen3.github.io/lib/mylib/export/random.mjs');
    const { randInt, randArr, shuffle } = await import('https://rpgen3.github.io/lib/mylib/export/random.mjs');
    const h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").appendTo(h).text("ES2020 dynamic importでライブラリを作る");
    const hMsg = $("<div>").appendTo(h);
    function msg(str, isError){
        $("<span>").appendTo(hMsg.empty()).text(str).css({
            color: isError ? 'red' : 'blue',
            backgroundColor: isError ? 'pink' : 'lightblue'
        })
    }
    $("<button>").appendTo(h).text("randInt").on("click",()=>{
        msg(randInt(0,100));
    });
})();
