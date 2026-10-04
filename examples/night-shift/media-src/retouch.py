# Paints over the monitor maker's logo on suite.jpg's bezel with the bezel's own tone (applied when resizing).
from PIL import Image, ImageFilter, ImageStat
def retouch(im):
    c = tuple(int(v) for v in ImageStat.Stat(im.crop((1118, 1210, 1146, 1232))).median)
    box = (1150, 1206, 1201, 1236)
    im.paste(Image.new('RGB', (box[2] - box[0], box[3] - box[1]), c), box[:2])
    reg = im.crop((box[0] - 5, box[1] - 5, box[2] + 5, box[3] + 5)).filter(ImageFilter.GaussianBlur(2)); im.paste(reg, (box[0] - 5, box[1] - 5))
    return im
if __name__ == '__main__':
    import sys
    retouch(Image.open('suite.jpg').convert('RGB')).crop((1000, 1100, 1400, 1350)).save(sys.argv[1])
