window.onload = () => {
    console.log('init...')
    init()
};

function init() {
    document.querySelector('.sq').addEventListener('scroll', scrollListener)
}

function scrollListener(e) {
    const target = e.target
    const scrollPercent = Math.floor(target.scrollTop*100/target.scrollHeight)
    //max percent: 56%
    if(scrollPercent<20) {
        target.style.background = 'rgb(126 0 255 / 50%)';
    }
    else if(scrollPercent<30) {
        target.style.background = 'rgb(255 0 224 / 50%)';
    }
    else if(scrollPercent<40) {
        target.style.background = 'rgb(255 0 149 / 50%)';
    }
    else {
        target.style.background = 'rgb(255 0 0 / 50%)';
    }
}