import fitz
import sys


path_pdf = sys.argv[1]
filename = sys.argv[2]

pdf_file = fitz.open(path_pdf)

number_of_pages = len(pdf_file)
image__ = ""

for current_page_index in range(number_of_pages):

  for img_index,img in enumerate(pdf_file.getPageImageList(current_page_index)):
        xref = img[0]
        image = fitz.Pixmap(pdf_file, xref)
      
        if image.n < 5:        
            image.writePNG("{}.png".format(filename))
            image__ = "{}.png".format(filename)
      
        else:                
            new_image = fitz.Pixmap(fitz.csRGB, image)
            new_image.writePNG("{}.png".foramt(filename))
            image__ = "{}.png".format(filename)

print(image__)

    
  
