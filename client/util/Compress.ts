/**
 * 压缩base64图片
 * @param
 * base64：数据；
 * w：图片最大尺寸；
 * maxSize：base64最大尺寸；
 * minSize：base64最小尺寸
 * 思路：利用canvas转blob的时候通过quality控制图片质量，达到压缩的目的。
 * 此方法有个缺点。只能对图片格式为jpeg或webp的图片有效。
 * 因此压缩的时候canvas.toBlob(callback, mimeType, quality)中的mimeType要设为'image/jpeg'。
 * 压缩完成可以自行转成想要的格式。
 */
export function compressBase64(target:any, w:number, maxSize:number) {
    return new Promise((resolve:any) => {
        const size:any = target.file.size;
        const fileType:any = target.file.type;
        if (size <= 1024 * maxSize) {
            resolve(target.content);
            return;
        }
        let newImage = new Image();
        let quality = 0.6;    //压缩系数0-1之间
        newImage.src = target.content;
        newImage.setAttribute("crossOrigin", 'Anonymous');  //url为外域时需要
        let imgWidth, imgHeight;
        newImage.onload = function () {
            imgWidth = (<any>this).width;
            imgHeight = (<any>this).height;
            let canvas = document.createElement("canvas");
            let ctx:any = canvas.getContext("2d");
            if (Math.max(imgWidth, imgHeight) > w) {
                if (imgWidth > imgHeight) {
                    canvas.width = w;
                    canvas.height = w * imgHeight / imgWidth;
                } else {
                    canvas.height = w;
                    canvas.width = w * imgWidth / imgHeight;
                }
            } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = 0.6;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality);
            // 压缩语句,如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
            const base64Max = maxSize ? maxSize : 150;
            while (base64.length / 1024 > base64Max) {
                quality -= 0.01;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }
            // 防止最后一次压缩低于最低尺寸50，只要quality递减合理，无需考虑
            while (base64.length / 1024 < 50) {
                quality += 0.001;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }
            resolve(base64);
        }
    })
    
}