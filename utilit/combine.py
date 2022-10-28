#combineOld&NewDatabase

import csv


with open('staff1.csv') as staff1:
    csv_staff1 = csv.reader(staff1, delimiter=',')
    for row in list(csv_staff1):
        if len(row[5]) >0:
            with open ('staffCombine.csv','a',newline='') as staffCombine:
                csv_staffCombine = csv.writer(staffCombine,delimiter=',')
                csv_staffCombine.writerow(row)
                #staffCombine.close
       
    print("done")
                