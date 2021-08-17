import camelot
import os, glob


def removeFilesPdfTmp():
    dir = '/home/mauricio/Documents/1/lotus/assets/public/pdf_tmp'
    filelist = glob.glob(os.path.join(dir, "*"))
    for f in filelist:
        os.remove(f)
