numbers=[]

for i in range(8986, 129511):
    numbers.append(i)
    

with open('emojis.txt', 'w') as f:
    for item in numbers:
        f.write('"&#' + str(item) + ';",')

