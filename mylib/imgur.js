(function(window, undefined){
    "use strict";
    function load(imgurID){
        return new Promise(function(resolve, reject){
            $("<img>").on("error", reject).on("load", function(){
                resolve(this);
            }).attr({
                crossOrigin: "anonymous",
                src: `https://i.imgur.com/${imgurID}.png`
            });
        });
    }
    function upload(dataURL){
        const token = 'Client-ID ' + rpgen3.randArray(["ed3688de8608b9d","8b35a3e16a802a6","9f6cbdf697dab0b"]);
        return new Promise(function(resolve, reject){
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
                success: function(r){
                    const d = r.data;
                    resolve({
                        id: d.id,
                        deleteFunc: function(){ deleteFile(token, d.deletehash) }
                    });
                },
                error: reject
            });
        });
    }
    function deleteFile(token, dhash){
        return new Promise(function(resolve, reject){
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
