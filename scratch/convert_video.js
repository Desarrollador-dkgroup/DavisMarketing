const cp = require('child_process');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

console.log('Using ffmpeg from:', ffmpeg);

const inputVideo = path.join(__dirname, '..', 'public', 'video1.mp4');
const outputBoomerangMp4 = path.join(__dirname, '..', 'public', 'video1_boomerang.mp4');
const outputAv1 = path.join(__dirname, '..', 'public', 'video1_av1.webm');

// 1. Create seamless Boomerang video: from 0.5s to 3.5s, forward + reverse seamlessly, 60fps / 24fps
// Using ffmpeg filter_complex: [0:v]trim=start=0.5:end=3.5,setpts=PTS-STARTPTS[fwd]; [fwd]split[f1][f2]; [f2]reverse[rev]; [f1][rev]concat=n=2:v=1:a=0[v]
console.log('Generating Boomerang MP4 & WebM with smooth forward and reverse...');

const boomerangArgs = [
  '-y',
  '-ss', '0.5',
  '-to', '3.5',
  '-i', inputVideo,
  '-filter_complex', '[0:v]split=2[v1][v2];[v2]reverse[v2rev];[v1][v2rev]concat=n=2:v=1:a=0,fps=30[outv]',
  '-map', '[outv]',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-an',
  outputBoomerangMp4
];

const res1 = cp.spawnSync(ffmpeg, boomerangArgs, { stdio: 'inherit' });
console.log('Boomerang MP4 generated successfully:', res1.status === 0);

// 2. Generate AV1 / WebM with keyframes for super smooth playback
console.log('Encoding AV1 / WebM...');
const av1Args = [
  '-y',
  '-i', outputBoomerangMp4,
  '-c:v', 'libvpx-vp9', // VP9/AV1 profile for maximum web browser compatibility
  '-b:v', '0',
  '-crf', '22',
  '-an',
  outputAv1
];

const res2 = cp.spawnSync(ffmpeg, av1Args, { stdio: 'inherit' });
console.log('WebM/AV1 generated successfully:', res2.status === 0);
