(() => {

    const cnv = document.getElementById("canvasBG");
    const ctx = cnv.getContext("2d");

    const cfg = {
        orbsCount:40,
        minVelocity: 0.15,
        ringsCount: 10,
    }
    
    let cw, ch, cx, cy, ph;
    function resize(){
        cw = cnv.width = innerWidth;
        ch = cnv.height = innerHeight;
        cx = cw / 2;
        cy = ch / 2;
        ph = cy * 0.6;

    }
    resize();
    window.addEventListener('resize',resize)

    class Orb {
        constructor(){
            this.size = 5;
            this.angle = Math.random() * 360;
            this.radius = (Math.random() * cfg.ringsCount | 0) * ph / cfg.ringsCount;
            this.velocity = cfg.minVelocity + Math.random() * cfg.minVelocity;
        }
        
        refresh(){
            let radian = this.angle * Math.PI / 180;

            let cos = Math.cos(radian);
            let sin = Math.sin(radian);

            let x = cx + cos * (ph + this.radius);
            let y = cy + sin * (ph + this.radius);

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, 2 * Math.PI);
            ctx.fill();

            this.angle = (this.angle + this.velocity) % 360;
        }
        
    }

    let orbsList =[];
    
    function createStardast(){ //функция заполняющая массив
        for(let i = 0; i < cfg.orbsCount; i++){
            orbsList.push(new Orb);
        }
    } 
    createStardast();

    function loop(){

        requestAnimationFrame(loop);

        ctx.fillStyle = "rgb(22, 22, 22)";
        ctx.fillRect(0, 0, cw, ch);
        
        orbsList.map((elem) => elem.refresh());
    }
    loop();

})();