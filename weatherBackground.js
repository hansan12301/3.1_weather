history.scrollRestoration = "auto";
const HIDDEN_CLASSNAME = "hidden";
const NONE_CLASSNAME = "none";
const GRADATION_CLASSNAME = "gradation";
const FIRST_HEAD = document.getElementById("background");
const CLOUD_ELEMENT = document.getElementById("cloud");
const HALO = document.getElementById("halo");
let DATE = document.getElementById("date");
let TEMP = document.getElementById("temp");
let MARK = document.getElementById("mark");
let WALK = document.getElementsByClassName("walk");
let CLOUD = document.getElementsByClassName("cloud");

setInterval(function () {CLOUD[0].remove();}, 1000);

function changeByJS(x, y) {
  DATE.classList.remove(HIDDEN_CLASSNAME);
  TEMP.innerText= String(x).padEnd(5, "\u00a0"); 
  DATE.innerText= y; 
  MARK.innerText= "\u00a0°C";
}

function changeChar(x) {
  if (x != "rain"){
    WALK[1].classList.remove(HIDDEN_CLASSNAME);
    WALK[0].classList.add(HIDDEN_CLASSNAME);
  } else if (x == "rain") {
    WALK[0].classList.remove(HIDDEN_CLASSNAME);
    WALK[1].classList.add(HIDDEN_CLASSNAME);
  }
}
changeChar(1);

function Rain() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  let TOTAL
  let rains = []
  let drops = []
  let mouse = { x: 0, y: 0, isActive: false }
  let rainyHeight = (innerHeight / 10) * 8

  class Rain {
    constructor(x, y, velocity) {
      this.x = x
      this.y = y
      this.velocity = velocity
      this.alpha = 2
    }
    
    draw() {
      const { x, y, velocity, alpha } = this
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + (velocity.x) * alpha, y + (velocity.y) * 4)
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    splash() {
      for (let i = 0; i < 3; i++) {
        drops.push(new Drop(this.x, this.velocity))
      }
    }

    animate() {
      if (this.y > rainyHeight) {
        this.splash()
        this.x = -(innerWidth * 0.2) + Math.random() * (innerWidth * 1.4)
        this.y = -20
      }
      this.velocity.x = mouse.isActive ? -1 + Math.random() * 2 + (-innerWidth / 2 + mouse.x) / 150 : -1 + Math.random() * 2
      this.x += this.velocity.x
      this.y += this.velocity.y

      this.draw()
    }
  }

  class Drop {
    constructor(x, velocity) {
      this.x = x
      this.y = rainyHeight
      this.velocity = {
        x: velocity.x + -2 + Math.random() * 4,
        y: -velocity.y + 5 + Math.random() * 5
      }
      this.gravity = 1.5
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2, false)
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    animate() {
      this.velocity.y += this.gravity
      this.x += this.velocity.x
      this.y += this.velocity.y

      this.draw()
    }
  }

  function init() {
    canvas.width = innerWidth
    canvas.height = rainyHeight

    TOTAL = Math.floor(innerWidth * rainyHeight / 10000)
    rains = []
    drops = []

    for (let i = 0; i < TOTAL; i++) {
      const x = Math.random() * innerWidth
      const y = Math.random() * rainyHeight
      const velocity = {
        y: 13 + Math.random() * 5
      }
      rains.push(new Rain(x, y, velocity))
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    rains.forEach(rain => rain.animate())
    drops.forEach((drop, index) => {
      drop.animate()
      if (drop.y > rainyHeight) drops.splice(index, 1)
    })

    window.requestAnimationFrame(render)
  }

  window.addEventListener('resize', () => init())

  canvas.addEventListener('mouseenter', () => mouse.isActive = true)
  canvas.addEventListener('mouseleave', () => mouse.isActive = false)
  canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  init()
  render()
}

function Snow() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  let TOTAL
  let snows = []
  let drops = []
  let mouse = { x: 0, y: 0, isActive: false }
  let snowyHeight = (innerHeight / 10) * 8

  class Snow {
    constructor(x, y, velocity) {
      this.x = x
      this.y = y
      this.velocity = velocity
      this.alpha = 2
    }
    
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false)
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    splash() {
      for (let i = 0; i < 3; i++) {
        drops.push(new Drop(this.x, this.velocity))
      }
    }

    animate() {
      if (this.y > snowyHeight) {
        this.splash()
        this.x = -(innerWidth * 0.2) + Math.random() * (innerWidth * 1.4)
        this.y = -20
      }
      this.velocity.x = mouse.isActive ? -1 + Math.random() * 2 + (-innerWidth / 2 + mouse.x) / 150 : -1 + Math.random() * 2
      this.x += this.velocity.x
      this.y += this.velocity.y

      this.draw()
    }
  }

  class Drop {
    constructor(x, velocity) {
      this.x = x
      this.y = snowyHeight
      this.velocity = {
        x: velocity.x + -2 + Math.random() * 4,
        y: -velocity.y + 5 + Math.random() * 5
      }
      this.gravity = 1.5
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false)
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    animate() {
      this.velocity.y += this.gravity
      this.x += this.velocity.x
      this.y += this.velocity.y

      this.draw()
    }
  }

  function init() {
    canvas.width = innerWidth
    canvas.height = snowyHeight

    TOTAL = Math.floor(innerWidth * snowyHeight / 10000)
    snows = []
    drops = []

    for (let i = 0; i < TOTAL; i++) {
      const x = Math.random() * innerWidth
      const y = Math.random() * snowyHeight
      const velocity = {
        y: 7 + Math.random() * 5
      }
      snows.push(new Snow(x, y, velocity))
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snows.forEach(snow => snow.animate())
    drops.forEach((drop, index) => {
      drop.animate()
      if (drop.y > snowyHeight) drops.splice(index, 1)
    })

    window.requestAnimationFrame(render)
  }

  window.addEventListener('resize', () => init())

  canvas.addEventListener('mouseenter', () => mouse.isActive = true)
  canvas.addEventListener('mouseleave', () => mouse.isActive = false)
  canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  init()
  render()
}

function Cloud(x) {
  x = x*2
  if(CLOUD.length > x){
    CLOUD_ELEMENT.replaceChildren();
  }
  $(document).ready(function(){
    var docWidth = innerWidth; // 문서 가로값
    var docHeight = (innerHeight / 10) * 2; // 문서 세로값
    
    var maxRox = 0; // random offset x 최대값
    var maxRoh = 0; // random offset y 최대값
    var minRox = 0; // random offset x 최소값
    var minRoh = 0; // random offset y 최소값

    var imgWidth = 10; // 이미지 가로 크기
    var imgHeight = 10; // 이미지 세로 크기
    
    var imgPath = new Array();
      imgPath.push("./cloud.svg");
      imgPath.push("./cloud.svg");
      imgPath.push("./cloud.svg");

    
    var rox = Math.floor((Math.random()*docWidth)+1)-0; // random offset x
    var roh = Math.floor((Math.random()*docHeight)+1)-0; // random offset y
    
    // offset이 화면 밖으로 넘어가지 않도록
    if( (rox+imgWidth) > docWidth ){
    rox = docWidth-imgWidth;
    }else if( (rox-imgWidth) < 0 ){
    rox = 0;
    }
    if( (roh+imgHeight) > docHeight ){
    roh = docHeight-imgHeight;
    }else if( (roh-imgHeight) < 0 ){
    roh = 0;
    }
    
    // 최소 최대 영역이 있다면
    if( rox < minRox && minRox != 0 ){
    rox = minRox;
    }else if( rox > maxRox && maxRox != 0 ){
    rox = maxRox;
    }
    if( roh < minRoh && minRoh != 0 ){
    roh = minRoh;
    }else if( roh > maxRoh && maxRoh != 0 ){
    roh = maxRoh;
    }
    
    var randNum = Math.floor(Math.random()*(imgPath.length))
    var imgPath = imgPath[randNum];
    
    var html = "<img class='cloud' src='"+imgPath+"' style='position: absolute; left:"+rox+"px; top:"+roh+"px;'/>";
    if(CLOUD.length < x){
      CLOUD_ELEMENT.insertAdjacentHTML('afterbegin', html);
    }
    });
}

document.addEventListener("DOMContentLoaded",
function(){
  window.addEventListener("scroll",
  function() {
    const scrollHeight = window.scrollY;
    const calScroll = scrollHeight + innerHeight;
    const SECTION_ELEMENT = document.getElementsByTagName("section");
    const canvas = document.querySelector('canvas');
    
    if(calScroll >= (scrollHeight + SECTION_ELEMENT[1].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[2].getBoundingClientRect().top)){
      changeByJS(-1.5, "1958. 03. 01. 토요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Snow();
      Cloud(3);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[2].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[3].getBoundingClientRect().top)) {
      changeByJS(3, "1959. 03. 01. 일요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Rain(); 
      Cloud(3);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[3].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[4].getBoundingClientRect().top)) {
      changeByJS(-0.9, "1965. 03. 01. 월요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(3);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[4].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[5].getBoundingClientRect().top)) {
      changeByJS(8, "1966. 03. 01. 화요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Rain(); // 0.5
      Cloud(10);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[5].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[6].getBoundingClientRect().top)) {
      changeByJS(2.9, "1967. 03. 01. 수요일");
      changeChar(1);
      FIRST_HEAD.classList.remove(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(4);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[6].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[7].getBoundingClientRect().top)) {
      changeByJS(-3.2, "1968. 03. 01. 금요일");
      changeChar(1);
      FIRST_HEAD.classList.remove(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(3);

    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[7].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[8].getBoundingClientRect().top)) {
      changeByJS(-3.3, "1970. 03. 01. 일요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Snow();
      Cloud(4);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[8].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[9].getBoundingClientRect().top)) {
      changeByJS(5.2, "1971. 03. 01. 월요일");
      FIRST_HEAD.classList.remove(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Rain();
      Cloud(10);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[9].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[10].getBoundingClientRect().top)) {
      changeByJS(-4.6, "1972. 03. 01. 수요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Snow();
      Cloud(4);


    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[10].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[11].getBoundingClientRect().top)) {
      changeByJS(-1.1, "1974. 03. 01. 금요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      CLOUD_ELEMENT.replaceChildren();
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[11].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[12].getBoundingClientRect().top)) {
      changeByJS(0, "1975. 03. 01. 토요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(2);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[12].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[13].getBoundingClientRect().top)) {
      changeByJS(3.7, "1976. 03. 01. 월요일");
      changeChar(1);
      FIRST_HEAD.classList.remove(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(10);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[13].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[14].getBoundingClientRect().top)) {
      changeByJS(8.9, "1977. 03. 01. 화요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Rain();//0.5
      Cloud(8);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[14].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[15].getBoundingClientRect().top)) {
      changeByJS(-2.9, "1978. 03. 01. 수요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      WALK.classList.remove()
      Cloud(3);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[15].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[16].getBoundingClientRect().top)) {
      changeByJS(-1.3, "1979. 03. 01. 목요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      HALO.classList.add(NONE_CLASSNAME);
      CLOUD_ELEMENT.replaceChildren();
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[16].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[17].getBoundingClientRect().top)) {
      changeByJS(0.2, "1981. 03. 01. 토요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      HALO.classList.remove(NONE_CLASSNAME);
      CLOUD_ELEMENT.replaceChildren();
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[17].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[18].getBoundingClientRect().top)) {
      changeByJS(4.9, "1983. 03. 01. 화요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      HALO.classList.remove(NONE_CLASSNAME);
      Rain();//8.2
      Cloud(9);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[18].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[19].getBoundingClientRect().top)) {
      changeByJS(-0.5, "1984. 03. 01. 목요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      HALO.classList.add(NONE_CLASSNAME);
      Snow();//0.8
      Cloud(9);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[19].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[20].getBoundingClientRect().top)) {
      changeByJS(4, "1985. 03. 01. 금요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Rain();//0.1
      Cloud(9);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[20].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[21].getBoundingClientRect().top)) {
      changeByJS(-2.4, "1986. 03. 01. 토요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Snow();//0.8d
      Cloud(2);

    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[21].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[22].getBoundingClientRect().top)) {
      changeByJS(2.6, "1988. 03. 01. 화요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(8);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[22].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[23].getBoundingClientRect().top)) {
      changeByJS(5.3, "1989. 03. 01. 수요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      CLOUD_ELEMENT.replaceChildren();

    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[23].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[24].getBoundingClientRect().top)) {
      changeByJS(-0.9, "1991. 03. 01. 금요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(2);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[24].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[25].getBoundingClientRect().top)) {
      changeByJS(9.9, "1992. 03. 01. 일요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Rain();//0.8
      Cloud(7);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[25].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[26].getBoundingClientRect().top)) {
      changeByJS(-3.4, "1993. 03. 01. 월요일");
      changeChar("rain");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.remove(HIDDEN_CLASSNAME);
      Snow();//0.8
      Cloud(2);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[26].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[27].getBoundingClientRect().top)) {
      changeByJS(-1.4, "1994. 03. 01. 화요일");
      changeChar(1);
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(1);

    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[27].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[28].getBoundingClientRect().top)) {
      changeByJS(2.9, "1997. 03. 01. 목요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(1);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[28].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[29].getBoundingClientRect().top)) {
      changeByJS(5.9, "1998. 03. 01. 목요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(1);
    } else if(calScroll >= (scrollHeight + SECTION_ELEMENT[29].getBoundingClientRect().top)
    && calScroll < (scrollHeight + SECTION_ELEMENT[30].getBoundingClientRect().top)) {
      //1999, end
      changeByJS(5.6, "1999. 03. 01. 목요일");
      FIRST_HEAD.classList.add(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      Cloud(8);

    } else {
      DATE.classList.add(HIDDEN_CLASSNAME);
      TEMP.innerText= "3.1"
      MARK.innerText= "\u00a0—— °C";
      changeChar(1);
      FIRST_HEAD.classList.remove(GRADATION_CLASSNAME);
      canvas.classList.add(HIDDEN_CLASSNAME);
      DATE.title.remove;
      CLOUD_ELEMENT.replaceChildren();
    }

  });
});