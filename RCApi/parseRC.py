import re

str1 = """
REG NO : KA05JSS731 FORM-23A

(See Rute 49)
REG DATE > Q1/03/2016 O.SL.NO : 04.
CHASSIS.NO : MEGJFS05BGT15S644 MFR > HONDA
ENGINE.NO <: JFSQET3156832 CLASS : NMICYCLE

COLOUR: PAWHITE
OWNERNAME : VENKATESH MURTHY G
SAID OF > GS GANAPATHY
ADDRESS : NG 70 GOWRISHANKARA NILAYA AGS
LAYOUT AREHALLI BANGALORE 560631

MODEL : ACTIVA 3G SCV110G

BODY : UNDER NO.OF CYL =: 4

WHEEL BASE : UNLASEN WT : 108

MFG.DATE > O2/2016 SEATING 72

FUEL : PETROL STOG/SLPR :
REGIFC UPTO: 28/02/2031 CC : 489 ,

TAX UPTO : LTT Registering Authority

BENGALURU(S)

ae

"""



def parse_l1(str):
    """ 
    Funtion to parse text for Andhra Pradesh and Telangana RC Cards
    inputs:- Extract string from the image
    Output:- Dictionary with keys as field names and values as corresponding field values
    """
    str = re.sub('[^a-zA-Z0-9\\n\\s:\']', '', str) 
    str = re.sub(r'\s[a-z]\s', '\n', str)

    data = dict()

    keys = []
    info = []
    str = str.split(':')
    # print(str)
    prvStr = re.match(r'\b[A-Z]+[a-z]+\b', str[0])
    k_str = prvStr.group()
    ij = re.sub(r'\b[A-Z]+[a-z]+\b', '', str[1])
    # print(ij)
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
            # print(value)
            if( value!= None and prvStr_i != None):
                i_str = i_str + " " + value.group()
            elif(index==0):
                i_str = ''
            else:
                info.append(i_str)
                i_str = ' '
    
    info.append(i_str)
    keys = [x for x in keys if x != ' ']
    # print(keys)

    info = [x for x in info if x != ' ']
    # print(info)

    for key, d in zip(keys, info):
        data[key] = d

    return data



def parse_l2(str, fields):
    """ 
    Funtion to parse text for Karnataka, Maharashtra and Delhi RC Cards
    inputs:- Extract string from the image
    Output:- Dictionary with keys as field names and values as corresponding field values
    """

    keys = []
    data = {}

    str_list = str.split('\n')
    # print(str_list)

    for s in str_list:
        
        s = s.strip()
        # print(s)
        m = fields.findall(s)
        # print(m)
        if(m != []):
            keys.append(m[0])
            d1 = s.split(m[0])
            if(len(m)>1):
                keys.append(m[1])
                temp = d1[1].strip()
                d2 = re.sub(r'[^A-Za-z0-9/\.\s]', '', temp).split(m[1])
                data[m[0]] = d2[0]
                data[m[1]] = d2[1]
            else:
                data[m[0]] = d1[1]
    # print(keys)
    return data


def getRegNum(read1, read2):
    """ 
    Function to extract the correct Registration number from the extracted text in 2 reads
    Input:- 2 read strings
    Output:- Registraion no.
    """
    regNumPattern = re.compile(r'\b((KA)|(MH)|(AP)|(TE)|(TE))[A-Z0-9]{8}\b')
    res1 = regNumPattern.search(read1)
    if (res1 != None):
        return res1.group()
    else: 
        res2 = regNumPattern.search(read2)
        if (res2 != None):
            return res2.group()
        else:
            return -1



fields_KA = re.compile(r'\bREG NO|REG DATE|CHASSIS.NO|ENGINE.NO|OWNERNAME|S/W/D OF|ADDRESS|MODEL|BODY|WHEEL BASE|MFG.DATE|FUEL|REG/FC UPTO|TAX UPTO|O.SL.NO|MFR|CLASS|COLOUR|NO.OF CYL|UNLADEN|SEATING|STDG/SLPR|CC{e<7}\b')

fields_MH = re.compile(r'\bREG. NO|REG.DT|CH.NO|E NO|NAME|S/W/D OF|ADDRESS|HP/LEASE|MODEL|BODY|WHEEL BASE|MFG.DT.|FUEL|REG.UPTO|TAX UPTO|O SNo|MFG CD|COLOUR|CLASS|NO. OF CYL|UNLADEN WT|SEATING C|STANDING C|CU.CAP|CARD SLNO{e<7}\b')

fields_DE = re.compile(r'\bREG. NO|REG.DT|CH.NO|E NO|NAME|S/W/D OF|ADDRESS|HP/LEASE|MODEL|BODY|WHEEL BASE|MFG.DT.|FUEL|REG.UPTO|TAX UPTO|O SNo|MFG CD|COLOUR|CLASS|NO. OF CYL|UNLADEN WT|SEATING C|STANDING C|CU.CAP{e<7}\b')


def parseToJSON(read1, read2, state):
    read1 = "".join([s for s in read1.strip().splitlines(True) if s.strip()])
    l1 = ['AP', 'TE']
    l2 = ['KA', 'MH', 'DE']

    ex1 = 'AP12T7634D'
    ex2 = 'KA458999999'
    regNum = getRegNum(ex2, ex1)
    if(regNum != -1):
        print('\n', regNum)
    else: 
        print('Registration Number extraction unsuccessfull')
    

    if state in l1:
        data = parse_l1(read1)
    elif state in l2:
        if state == 'KA':
            data = parse_l2(read1, fields_KA)
        if state == 'MH':
            data = parse_l2(read1, fields_MH)
        if state == 'DE':
            data = parse_l2(read1, fields_DE)
    return data
        


print('\n',parseToJSON(str1, str1, 'KA'))