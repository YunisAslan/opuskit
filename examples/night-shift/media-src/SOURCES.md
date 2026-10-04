# Media sources — Night Shift

Photos downloaded at original size on 2026-10-04 with the Unsplash connector, picked by Claude (docs/plan-for-fit.md §11,
#13), all under the Unsplash License. Originals here are untouched; retouches are made when resizing into
`public/media/` (`retouch.py`).

Each was checked for readable brand names and logos. Left out for that reason: a colourist at a monitor whose screen
shows grading software by name and the monitor maker's logo (ZdOsQiwp0Ss), a student in a T-shirt with printed words
next to a TV with text (bHS3XxKaQVU), close-ups of named editing software. `suite.jpg` shows a small monitor maker's
logo on the bezel: painted over in the bezel's own tone when resized.

The film stills (log and graded) come from the user's clips (shot list in docs/plan-for-fit.md §7, #13): the graded
frame is the clip as it is; the "log" frame is the same frame flattened by Claude (lower contrast, lifted blacks, less
saturation) — what log footage looks like before a grade.

| File | Status | Size | Source link | Author | Shows |
|---|---|---|---|---|---|
| clip-1.mp4 | ✓ the user's pick | 3840×2160, 6.9 s, 25 fps | the user's download | — | A night city street under an overpass, teal and sodium light. **Readable brand signs** (a hotel's "media 24/7" sign, a tower's crown logo) stay in frame the whole shot as the camera tilts up, so the clip is not used as video — only one still, cropped to the lower right where neither shows |
| clip-2.mp4 | ✓ the user's pick | 1920×1080, 16.5 s, 100 fps | the user's download | — | A woman under a tree in a stubble field at golden hour, hair in the wind, sun flare |
| clip-3.mp4 | ✓ the user's pick | 1920×1080, 18.7 s, 24 fps, with sound | the user's download | — | A dim room: a man by a window under a caged bulb, green light on a table, old TV |
| instructor.jpg | ✓ | 3264×4928 | https://unsplash.com/photos/a-woman-with-long-hair-Fg45kvRlePo | Egor Litvinov | A woman in a green sweater lit in teal and green, looking straight at the camera — the colourist who teaches |
| student-1.jpg | ✓ | 4672×7008 | https://unsplash.com/photos/woman-in-black-top-under-red-light-8QQnkSE1lDc | lhon karwan | A woman in a black top sitting under red light |
| student-2.jpg | ✓ | 2964×4475 | https://unsplash.com/photos/a-woman-sitting-on-the-floor-TvUXoX6SYlk | Egor Litvinov | A woman in a yellow sweater in a teal doorway, warm light behind |
| suite.jpg | ✓ | 3840×1941 | https://unsplash.com/photos/person-editing-video-in-dark-workspace-VW2oU66mwbc | Mark Cruz | A silhouette at a monitor in a dark room, a waveform on screen, light through blinds (bezel logo retouched) |
| scope.jpg | ✓ | 3840×2160 | https://unsplash.com/photos/a-close-up-of-a-computer-screen-with-a-color-chart-on-it-u3zoPjjQm0w | Jakub Żerdzicki | A colour curve over a spectrum on a screen, close up |
| set-1.jpg | ✓ | 6720×4480 | https://unsplash.com/photos/a-group-of-people-standing-around-a-camera-set-up-xKfS7Hll0Ck | Jakob Owens | A film crew in a warehouse around a seated subject, monitors and lights |
| set-2.jpg | ✓ | 6005×4003 | https://unsplash.com/photos/a-group-of-people-standing-around-a-camera-in-the-dark-LP24lfRFKis | Huong Do | A night shoot: a crew on a dolly track around a lit set |
| set-3.jpg | ✓ | 5616×3744 | https://unsplash.com/photos/a-group-of-people-standing-in-front-of-a-red-light-zdrIm6CkDQE | Logan Ward | Silhouettes and a cinema camera against red haze |

Made from the clips (in `public/media/`): `grade-1..3.jpg` — one frame of each clip as it is (clip-1 at 0.1 s cropped to
2688×1512 from x 1152, y 648, then 2400 px wide; clip-2 at 7.5 s; clip-3 at 12 s); `log-1..3.jpg` — the same frames
flattened into a log look (`curves=all='0/0.14 0.5/0.5 1/0.86',eq=saturation=0.42:contrast=0.92`); `monitor.mp4` —
clip-2 seconds 4–12 at 25 fps, 1280 px, no sound (3.7 MB), for the console's monitor; `monitor-poster.jpg`.

## Console posters

`public/media/console-poster.jpg` (1920×1080, desktop poster and slow connections) and `console-poster-mobile.jpg`
(1080×1350, phones and reduced motion) are rendered from the hero scene itself: open `/?poster=wide` or
`/?poster=tall` on the dev server — the scene renders alone, frozen, with the poster frame on the monitor — and save the
canvas (`media-src/render-posters.mjs`, needs `playwright` and Google Chrome). Re-render them after changing the scene.
