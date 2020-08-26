# Python code to illustrate Sending mail with attachments
# from your Gmail account

# libraries to be imported
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
print(sys.argv[1])
print(sys.argv[2])
fromaddr = "nitinroadways9@gmail.com"
toaddr = "pramodbnahar@gmail.com"

# instance of MIMEMultipart
msg = MIMEMultipart()

# storing the senders email address
msg['From'] = fromaddr

# storing the receivers email address
msg['To'] = toaddr

# storing the subject
msg['Subject'] = 'GST Details ('+sys.argv[1]+sys.argv[2]+')'

# string to store the body of the mail
body = '''Hi,

PFA : GST account Data for the month of '''+sys.argv[1]+sys.argv[2]+'''
This mail consists of the GST details for the month of '''+sys.argv[1]+'''.

Regards,

Nitin Roadways And Cargo Movers.
        Pune
9822288257
8459729293'''

# attach the body with the msg instance
msg.attach(MIMEText(body, 'plain'))

# open the file to be sent
filename = "GST_ACCOUNT_DETAILS_" + sys.argv[1]+'_'+sys.argv[2]+".xlsx"
attachment = open("GST_ACCOUNT_DETAILS_" +
                  sys.argv[1]+'_'+sys.argv[2]+".xlsx", "rb")

# instance of MIMEBase and named as p
p = MIMEBase('application', 'octet-stream')

# To change the payload into encoded form
p.set_payload((attachment).read())

# encode into base64
encoders.encode_base64(p)

p.add_header('Content-Disposition', "attachment; filename= %s" % filename)

# attach the instance 'p' to instance 'msg'
msg.attach(p)

# creates SMTP session
s = smtplib.SMTP('smtp.gmail.com', 587)

# start TLS for security
s.starttls()

# Authentication
s.login(fromaddr, sys.argv[3])

# Converts the Multipart msg into a string
text = msg.as_string()

# sending the mail
s.sendmail(fromaddr, toaddr, text)

# terminating the session
s.quit()
