import sys, subprocess, imageio_ffmpeg
from playwright.sync_api import sync_playwright
FPS, DUR = 30, 17.0
mode = sys.argv[1] if len(sys.argv)>1 else 'video'
with sync_playwright() as s:
    b = s.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg = b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file:///home/user/HHMProyectos-website/video-pastelia/pastelia-ad.html')
    pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(800)
    print('fredoka:', pg.evaluate("document.fonts.check('600 50px Fredoka')"))
    if mode=='stills':
        for t in map(float, sys.argv[2:]):
            pg.evaluate(f'seek({t})'); pg.screenshot(path=f'still_{t}.png')
    else:
        ff = subprocess.Popen([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-i','-',
             '-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart','pastelia-ad.mp4'], stdin=subprocess.PIPE)
        for i in range(int(FPS*DUR)):
            pg.evaluate(f'seek({i/FPS})')
            ff.stdin.write(pg.screenshot(type='jpeg', quality=95))
        ff.stdin.close(); ff.wait()
    b.close()
