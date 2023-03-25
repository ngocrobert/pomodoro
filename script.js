
// variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";

//display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

//start timer 
function start() {
   
    //change button
    document.getElementById('start').style.display = 'none';
    document.getElementById('reset').style.display = 'block';

    //change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    //countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1){
                if(breakCount % 2 === 0) {
                    //start break
                    workMinutes = breakMinutes;
                    breakCount++;

                    //change the painel 
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                    pauseTrack();
                }else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++;

                    //change the painel 
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                    playTrack();
                    
                }
            }
            seconds = 59;
        }

    }

    //start countdown
    setInterval(timerFunction,1000); //1000 = 1s
    
    //play music
    playTrack();
    
}

// === Music Player ===
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
// let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'music_player/images/dev.jpg',
        name : 'Nhạc Baroque',
        artist : 'nhiều nhạc sỹ',
        music : 'music_player/music/nhacKoLoi.mp3'
    },
    {
        img : 'music_player/images/muaroi.png',
        name : 'Tiếng mưa rơi',
        artist : 'VA',
        music : 'music_player/music/muaRoi.mp3'
    },
    {
        img : 'music_player/images/Canon-Gigue.png',
        name : 'Canon & Gigue',
        artist : 'Philip Glass',
        music : 'music_player/music/Canon-Gigue-Philip-Glass.mp3'
    },
    {
        img : 'music_player/images/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'music_player/music/Rather Be.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    // wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    // wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        console.log(random_index);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}