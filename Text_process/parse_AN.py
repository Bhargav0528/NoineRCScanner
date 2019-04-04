import re


str = """State: ANDHRA PRADESH TRANSPORT DEPARTMENT
CERTIFICATE OF REGISTRATION

 

 

 

 

a
Regn. Number : AP16EZ2859 . \
Regd. Owner D RAMADEVI
Ae. W/O SRINIVASA RAO an
Address 24/66 RAMANNAPETAROAD ;,
a NANDIGAMA NANDIGAMA
KRISHNA 521185 c
- a
Maker’s Class : NC
Vehicle Class“: Ws SCOOTY PEP+ (BS IV)
3 MOTOR CYCLE
Mth. Yr. of Mfg: 94/2018 xO
Fuel Used PETROL

Type of Body : 2 WHEELER
"""

str1 = """ 
Reg No. : AP16CF9628 '

1 7K RAVI VARMA _ - m
NAGESWARA RAO =. ‘

:119812 PLOT NO 306_ 5

13:17:)“; GAYA'lgRl RES BLOCK 3

’Regn; NUmber . '-
Regd. Owgg


K ‘ 'lg_~;MAn\g ROAD KANURU
A \_ Maker sic1ass ?:i'PL'Jis’AR 150 01's.: BSIII
>: , ' " \- Vehicle cé‘s‘s; ‘ ”MOTOR CYCLE
7 O Mth. Yr. of mg“? “ £2013 \ ;

‘lFuelUsed : PETROL
Type ofBoqv = :S'QLOX


"""

# print(str)

def sem_text(str):
    str = "".join([s for s in str.strip().splitlines(True) if s.strip()])

    str = re.sub('[^a-zA-Z0-9\\n\\s:\']', '', str)
    str = re.sub('\s[a-z]\s', '\n', str)


    data = dict()
    j=0;

    keys = []
    info = []
    str = str.split(':')
    print(str)
    prvStr = re.match(r'\b[A-Z]+[a-z]+\b', str[0])
    k_str = prvStr.group()
    ij = re.sub(r'\b[A-Z]+[a-z]+\b', '', str[1])
    print(ij)
    prvStr_i = re.match(r'[A-Z\\n0-9\s]+', ij)
    i_str = prvStr_i.group()
    for s in str:
        final_val = ""
        s = re.sub('\\n',' ', s)
        # s = s.strip().split(' ')
        # print(s)
        s =s.strip().split()
        for index, i in enumerate(s):
            key = re.match(r'(\b[A-Z]+[a-z]+\b)|(\b[a-z]+\b)', i)
            if( key!= None and prvStr != None):
                k_str = k_str + " " + key.group()
    
            else:
                keys.append(k_str)
                k_str = ' '

        # s = re.sub('\\n',' ', s)
        # # s = s.strip().split(' ')
        # # print(s)
        # s =s.strip().split()
        for index, i in enumerate(s):
            i = re.sub(r'\b[A-Z]+[a-z]+\b', '', i)
            value = re.match(r'\b[A-Z\\n0-9]+\b', i)
            print(value)
            if( value!= None and prvStr_i != None):
                i_str = i_str + " " + value.group()
            elif(index==0):
                i_str = ''
            else:
                info.append(i_str)
                i_str = ' '
    


    info.append(i_str)
    keys = [x for x in keys if x != ' ']
    print(keys)

    info = [x for x in info if x != ' ']
    print(info)

    for key, d in zip(keys, info):
        data[key] = d

    return data




        
        # if j==0:
        #     previousKey = re.match('[A-Z]+[a-z]+', s[0])
        #     j =1;
        # for i in s:
        #     print('p',previousKey)
        #     print('i', i)
        #     key = re.match('[A-Z]+[a-z]+', i)
        #     print('k', key)
            
        #     i = re.sub('[A-Z]+[a-z]+', '', i)
        #     value = re.match('[A-Z\\n0-9]+', i)
        #     print('val',value)
            
        #     if(key != previousKey and key!=None):
        #         data[previousKey.group()] = final_val
        #         final_val = " "
        #     elif(value!= None):
        #         final_val = final_val + " " + value.group()
        #         print(final_val)

        #     if(key!=None):
        #         previousKey = key

print('\n\n',sem_text(str))