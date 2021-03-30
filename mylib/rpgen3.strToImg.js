(function(window, undefined){
    "use strict";
    function strToImg(str){
        var ar = [];
        str.split('').forEach(function(c){
            var n = c.charCodeAt();
            if(n < 128) {
                ar.push(n);
            }
            else {
                ar.push(128);
                ar.push((0xff00 & n) >> 8); // 前
                ar.push((0xff & n)); // 後
            }
        });
        var width = Math.ceil(Math.sqrt(ar.length / 3));
        var cv = $("<canvas>").attr({
            width: width,
            height: width
        });
        var ctx = cv[0].getContext("2d");
        var imgData = ctx.getImageData(0, 0, width, width),
            cnt = 0;
        for(var i = 0; i < ar.length; i++){
            var i4 = i * 4;
            for(var o = 0; o < 3; o++){
                imgData.data[i4 + o] = ar[cnt++] || 0;
            }
            imgData.data[i4 + 3] = 255; // 透過を指定するとputImageDataで画素値が変わる現象がある
        }
        ctx.putImageData(imgData, 0, 0);
        return cv[0].toDataURL("image/png");
    }
    function imgToStr(img){
        var width = img.width,
            height = img.height;
        var cv = $("<canvas>").attr({
            width: width,
            height: height
        });
        var ctx = cv.get(0).getContext('2d');
        ctx.drawImage(img,0,0);
        var data = ctx.getImageData(0, 0, width, height).data;
        var ar = [];
        for(var i = 0; i < data.length; i++){
            var i4 = i * 4;
            for(var o = 0; o < 3; o++){
                ar.push(data[i4 + o]);
            }
        }
        var str = '';
        for(var p = 0; p < ar.length; p++){
            var n = ar[p];
            if(n < 128){
                str += String.fromCharCode(n);
            }
            else if(n === 128){
                str += String.fromCharCode((ar[p + 1] << 8) + ar[p + 2]);
                p += 2;
            }
        }
        return str.replace(/\0+$/,'');
    }
    if(!window.rpgen3) return console.error("not loaded of rpgen3.js");
    window.rpgen3.strToImg = strToImg;
    window.rpgen3.imgToStr = imgToStr;
})(typeof window === 'object' ? window : this);
