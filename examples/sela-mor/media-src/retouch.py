# Paints over the headphone brand mark in portrait.jpg with the block's own face tone (Halvik-style retouch).
from PIL import Image, ImageFilter, ImageStat
def retouch(im):
    face = im.crop((2052, 1352, 2066, 1418)); c = tuple(int(v) for v in ImageStat.Stat(face).median)
    box = (2070, 1350, 2142, 1420)
    im.paste(Image.new('RGB', (box[2] - box[0], box[3] - box[1]), c), box[:2])
    reg = im.crop((box[0] - 5, box[1] - 5, box[2] + 5, box[3] + 5)).filter(ImageFilter.GaussianBlur(1.5)); im.paste(reg, (box[0] - 5, box[1] - 5))
    return im
if __name__ == '__main__':
    import sys
    im = retouch(Image.open('portrait.jpg').convert('RGB')); im.crop((1950, 1250, 2260, 1600)).save(sys.argv[1])
