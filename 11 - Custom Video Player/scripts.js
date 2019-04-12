/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build Our Functions */
function togglePlay() {
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    // use this because event listener bound to video
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    // data- attributes on anything
    // dataset is an object with data-attribute/value pairs
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / this.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* Hook up the Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
// Confused on whether do include e as in (e) and scrub(e)
// progress.addEventListener('mousemove', () => {
//     if (mousedown) {
//         scrub;
//     }
// });
progress.addEventListener('mousemove', () => mousedown && scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Add full screen button ...
