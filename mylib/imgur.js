((window, undefined) => {
    "use strict";
    function load(imgurID){
        return new Promise((resolve, reject) => {
            const url = "https://i.imgur.com/" + imgurID + ".png";
            new Promise(r => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => /removed/.test(xhr.responseURL) ? reject() : r();
                xhr.onerror = reject;
                xhr.open('GET', url);
                xhr.send();
            }).then(() => {
                $("<img>").on("error", reject).on("load", function(){
                    resolve(this);
                }).attr({
                    crossOrigin: "anonymous",
                    src: url
                });
            });
        });
    }
    function upload(dataURL){
        const token = rpgen3.randArray(tokens);
        return new Promise((resolve, reject) => {
            $.ajax({
                dataType: 'json',
                headers: {
                    Authorization: 'Client-ID ' + token
                },
                url: "https://api.imgur.com/3/upload.json",
                type: "POST",
                data: {
                    image: dataURL
                },
                success: r =>{
                    const d = r.data,
                          id = d.id,
                          dhash = d.deletehash;
                    resolve({ id, dhash, token });
                },
                error: reject
            });
        });
    }
    function del({dhash, token}){
        return new Promise((resolve, reject) => {
            $.ajax({
                dataType: 'json',
                headers: {
                    Authorization: 'Client-ID ' + token
                },
                url: "https://api.imgur.com/3/image/" + dhash,
                type: "DELETE",
                success: resolve,
                error: reject
            });
        });
    }
    window.imgur = {
        load: load,
        upload: upload,
        delete: del
    };
    const tokens = [
        "ed3688de8608b9d",
        "8b35a3e16a802a6",
        "9f6cbdf697dab0b"
    ];
})(typeof window === 'object' ? window : this);
