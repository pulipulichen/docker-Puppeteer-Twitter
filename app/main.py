# https://youtu.be/3RNPJbUHZKs
"""
Remove text from images
"""

import matplotlib.pyplot as plt
import keras_ocr
import cv2
import math
import numpy as np

#General Approach.....
#Use keras OCR to detect text, define a mask around the text, and inpaint the
#masked regions to remove the text.
#To apply the mask we need to provide the coordinates of the starting and 
#the ending points of the line, and the thickness of the line

#The start point will be the mid-point between the top-left corner and 
#the bottom-left corner of the box. 
#the end point will be the mid-point between the top-right corner and the bottom-right corner.
#The following function does exactly that.
def midpoint(x1, y1, x2, y2):
    x_mid = int((x1 + x2)/2)
    y_mid = int((y1 + y2)/2)
    return (x_mid, y_mid)

#Main function that detects text and inpaints. 
#Inputs are the image path and kreas_ocr pipeline
def inpaint_text(img_path, pipeline):
    # read the image 
    img = keras_ocr.tools.read(img_path) 
    
    # Recogize text (and corresponding regions)
    # Each list of predictions in prediction_groups is a list of
    # (word, box) tuples. 
    prediction_groups = pipeline.recognize([img])
    
    #Define the mask for inpainting
    mask = np.zeros(img.shape[:2], dtype="uint8")
    inpainted_img = False
    for box in prediction_groups[0]:
        x0, y0 = box[1][0]
        x1, y1 = box[1][1] 
        x2, y2 = box[1][2]
        x3, y3 = box[1][3] 
        
        x_mid0, y_mid0 = midpoint(x1, y1, x2, y2)
        x_mid1, y_mi1 = midpoint(x0, y0, x3, y3)
        
        #For the line thickness, we will calculate the length of the line between 
        #the top-left corner and the bottom-left corner.
        thickness = int(math.sqrt( (x2 - x1)**2 + (y2 - y1)**2 ))
        
        #Define the line and inpaint
        cv2.line(mask, (x_mid0, y_mid0), (x_mid1, y_mi1), 255,    
        thickness)
        inpainted_img = cv2.inpaint(img, mask, 7, cv2.INPAINT_NS)
                 
    return(inpainted_img)

# keras-ocr will automatically download pretrained
# weights for the detector and recognizer.
pipeline = keras_ocr.pipeline.Pipeline()

from pathlib import Path
import os
import glob
import requests
import shutil

#inputFiles = list(set(glob.glob("/2.output/**/*.jpg")) - set(glob.glob("/2.output/**/*-inpaint.jpg")) - set(glob.glob("/2.output/**/*-crop.jpg")))
inputFiles = glob.glob("/2.output/**/*.jpg", recursive=True)

print(inputFiles)

for inputFile in inputFiles:
  if inputFile.endswith('.inpaint.jpg') or inputFile.endswith('.crop.jpg'):
    continue

  p = Path(inputFile)
  name = p.name
  outputFile = os.path.splitext(inputFile)[0] + '.inpaint.jpg'
  
  if os.path.isfile(outputFile):
    print('File is exsited: ' + inputFile)
    continue

  print('Processing: ' + inputFile)

  img_text_removed = inpaint_text(inputFile, pipeline)
  if img_text_removed is False:
    shutil.copyfile(inputFile, outputFile)
  else:
    cv2.imwrite(outputFile, cv2.cvtColor(img_text_removed, cv2.COLOR_BGR2RGB))

from pathlib import Path
import os
import glob
import requests
import shutil
from PIL import Image
from autocrop import Cropper
import subprocess

cropper = Cropper(face_percent=70)

inputFiles = glob.glob("/2.output/**/*.inpaint.jpg", recursive=True)
for inputFile in inputFiles:
  p = Path(inputFile)
  name = p.name
  outputFile = os.path.splitext(inputFile)[0].split('.')[0] + '.crop.jpg'
  
  if os.path.isfile(outputFile):
    print('File is exsited: ' + name)
    os.remove(inputFile)
    continue

  print('Processing: ' + name)

  image = cv2.imread(inputFile)
  height, width, channels = image.shape
  if width < 300:
    image = cv2.resize(image, (600, 600), interpolation=cv2.INTER_LINEAR)
    cv2.imwrite('/tmp/tmp.jpg', image)
    inputFile = '/tmp/tmp.jpg'
  
  cropped_array = cropper.crop(inputFile)

  # print(cropped_array)
  # Save the cropped image with PIL if a face was detected:
  if cropped_array is None:
    #shutil.copyfile(inputFile, outputFile)
    subprocess.run(["smartcroppy","--width","300","--height","300",inputFile,outputFile])
  else:
    # cropped_image = Image.fromarray(cropped_array)
    #cropped_image.save(outputFile)
    cv2.imwrite(outputFile, cv2.cvtColor(cropped_array, cv2.COLOR_BGR2RGB))
  os.remove(inputFile)