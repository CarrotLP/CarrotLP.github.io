function colors(){
    let x = Math.floor(Math.random()*16777215);
    let hexX = x.toString(16);
    hexX = "#" + String(hexX);
    return hexX;
}
function click(){
    document.getElementById('haha').innerHTML = Date(); 
    alert('Look back!')
    document.getElementById('button').style.color = colors();
    document.getElementById('button').style.backgroundColor = colors();
}
function click2(){
        document.body.style.backgroundColor = colors();
    }

let intervalid = 0
function set(){
    count += 1;
    if (count % 2 == 1) {
        document.getElementById('button2').innerHTML = 'Learn you lesson! Now click me again';
        intervalid = setInterval(click2, 100);
        console.log(intervalid)
    } else {
        clearInterval(intervalid)
        document.getElementById('button2').innerHTML = "Click me if you'd try hehe";
    }
}

let count = 0;
document.getElementById('button').onclick=click;
document.getElementById('button2').onclick=set;

//add ons
function hyperlink(){
    window.open ('https://carrotlp.github.io/diamond-map/diamond-map.html', '_blank');
}
document.getElementById('hyperlink').onclick=hyperlink