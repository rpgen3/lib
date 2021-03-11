((window, undefined) => {
    "use strict";
    function load(imgurID){
        return new Promise((resolve, reject) => {
            const url = "https://i.imgur.com/" + imgurID + ".png";
            new Promise(r => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => /removed/.test(xhr.responseURL) ? reject() : r();
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
        const token = 'Client-ID ' + rpgen3.randArray(["ed3688de8608b9d","8b35a3e16a802a6","9f6cbdf697dab0b"]);
        return new Promise((resolve, reject) => {
            $.ajax({
                dataType: 'json',
                headers: {
                    Authorization: token
                },
                url: "https://api.imgur.com/3/upload.json",
                type: "POST",
                data: {
                    image: dataURL
                },
                success: r =>{
                    const d = r.data;
                    resolve({
                        id: d.id,
                        deleteFunc: () => deleteFile(token, d.deletehash)
                    });
                },
                error: reject
            });
        });
    }
    function deleteFile(token, dhash){
        return new Promise((resolve, reject) => {
            $.ajax({
                dataType: 'json',
                headers: {
                    Authorization: token
                },
                url: "https://api.imgur.com/3/image/" + dhash,
                type: "DELETE",
                success: resolve
            });
        });
    }
    window.imgur = {
        load: load,
        upload: upload
    };
})(typeof window === 'object' ? window : this);
