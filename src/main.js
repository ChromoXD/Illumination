import './style.css'
import bgURL from './assets/BG.jpg'


const cvs = document.getElementById('cvs');
const ctx = cvs.getContext("2d");

const dpr = window.devicePixelRatio || 1;
const bg = new Image();

const r = 100;

const speed = 10;
let pos = {x:0, y:0}

function reSizeCanvas() {
    cvs.width = window.innerWidth * dpr;
    cvs.height = window.innerHeight * dpr;
    cvs.style.width = window.innerWidth + 'px';
    cvs.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    
    
    ctx.drawImage(bg, pos.x, pos.y);
    ctx.drawImage(bg, pos.x, pos.y - bg.height);
    ctx.drawImage(bg, pos.x + bg.width, pos.y);
    ctx.drawImage(bg, pos.x + bg.height, pos.y - bg.height);



    ctx.fillStyle = "rgba(0, 0, 0, 0.83)";
    ctx.beginPath();
    
    ctx.rect(0, 0, window.innerWidth, window.innerHeight);
    ctx.moveTo(mouse.x + r, mouse.y);

    
    ctx.moveTo(mouse.x, mouse.y,);
    ctx.arc(mouse.x, mouse.y, r, 0, 2*Math.PI)
    ctx.fill('evenodd');
    
    ctx.save();
    
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, r, 0, 2*Math.PI)
    ctx.clip();

    ctx.fillStyle = 'White';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Made By Chromo', innerWidth - 100, innerHeight - 30);

    ctx.restore();
    
}

let last = null;

function animate(now) {
    if (last === null) last = now;
    let dt = (now - last)/1000;
    last = now;
    pos.y = (pos.y + speed * dt) % bg.height;
    draw();
    requestAnimationFrame(animate);
}

reSizeCanvas()
window.addEventListener('resize', reSizeCanvas);

bg.onload = () => requestAnimationFrame(animate)
bg.src = bgURL;