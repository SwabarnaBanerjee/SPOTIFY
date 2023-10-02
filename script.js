console.log("Welcome to Swabify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('jiya_tui_chara.mp4');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongName=document.getElementById('mastersongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "Jiya-Tui-Chara",filePath:"jiya_tui_chara.mp4",coverPath: "cover.jpeg"},
    {songName: "Lag-Jaa-Gale",filePath:"lag_jaa_gale.mp4",coverPath: "cover.jpeg"},
    {songName: "Jani-Dekha-Hobe",filePath:"jani_dekha_hobe.mp4",coverPath: "cover.jpeg"},
    {songName: "Darmiyaan",filePath:"darmiyan.mp4",coverPath: "cover.jpeg"},
    {songName: "Agar-Tum-Sath-Ho",filePath:"agar_tum_saath_ho.mp4",coverPath: "cover.jpeg"},
    {songName: "Adha-Ishq",filePath:"adhaa_ishq.mp4",coverPath: "cover.jpeg"},
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

//audioElement.play();//

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }

})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Update Seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

audioElement.addEventListener('ended',()=>{
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    myProgressBar.value=0;
    const songItemPlaybuttons = document.getElementsByClassName('songItemPlay');
    for(const button of songItemPlaybuttons){
        if(button.classList.contains('fa-circle-pause')){
            button.classList.remove('fa-circle-pause');
            button.classList.add('fa-circle-play');
        }

    }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeAllPlays();
        const index = parseInt(e.target.id);
        const isplaying = !audioElement.paused;
        if(isplaying){
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;

        }
        else{
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src=songs[index].filePath;
            songIndex = index;
            mastersongName.innerText=songs[songIndex].songName;
            audioElement.currentTime=0;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            audioElement.play();
        }

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src=songs[songIndex].filePath;
    mastersongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex-=1;
    }
    audioElement.src=songs[songIndex].filePath;
    mastersongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})