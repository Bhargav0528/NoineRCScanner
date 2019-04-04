import re


str = """ANDHRA PRADESH TRANSPORT DEPARTMENT
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

# print(str)

str = "".join([s for s in str.strip().splitlines(True) if s.strip()])

str = re.sub('[^a-zA-Z0-9\\n\\s:\']', '', str)
str = re.sub('\s[a-z]\s', '\n', str)



str = str.split(':')
for s in str:
    s = s.split(' ')
    for i in s:
        print(i)
        print(re.match('[A-Z\\n0-9]+', i))