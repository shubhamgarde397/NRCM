import os
import subprocess
import sys

cmd = 'netstat -ano | findstr :{0}'.format(sys.argv[1])
try:
    pid = subprocess.check_output(cmd, shell=True)
    s = pid.decode()
    newpid = int(s[s.find('\r\n')-4:s.find('\r\n')])
    # killcmd = 'C:\\Windows\System32\\tskill.exe {0}'.format(newpid)
    killcmd = 'taskkill.exe /f /im {0}'.format(newpid)
    f = open("C:\\Users\\Admin\\Desktop\\kill.bat", "w")
    f.write(killcmd)
    f.close()
except:
    killcmd = 'echo No such process ID found'
    f = open("C:\\Users\\Admin\\Desktop\\kill.bat", "w")
    f.write(killcmd)
    f.close()
