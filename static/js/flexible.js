// function resize(){
//     var htmlEle = document.documentElement;
//     console.log('htmlEle', htmlEle)
//     var htmlwidth = window.innerWidth; //浏览器时下窗口可视区域宽度
//     console.log('htmlwidth', htmlwidth)
//     console.log('htmlwidth', htmlwidth/10+'px')
// // var rem = (win_width*20/2000);  //这个比例最好要和设计稿比例一致
//     htmlEle.style.fontsize = htmlwidth/10+'px';
// }
// // resize();
// window.addEventListener("resize",resize,false);

// function add(){var html=document.documentElement;var hei=html.clientWidth;var fz=hei/375*100+"px";html.style.fontSize=fz};add();window.addEventListener("resize",add,false);

(function flexible (window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1
  
    // adjust body font size
    function setBodyFontSize () {
      if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
      }
      else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10
    function setRemUnit () {
      var rem = docEl.clientWidth / 10
      docEl.style.fontSize = rem + 'px'
    }
  
    setRemUnit()
  
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        setRemUnit()
      }
    })
  
    // detect 0.5px supports
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))
  