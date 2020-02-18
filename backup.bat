E:
cd "E:\Database_Backup"
mkdir "%date%"
ping localhost -n 10>nul
C:
cd "C:\Program Files\MongoDB\Server\4.0\bin"
mongodump --db "NRCM" --out "E:\Database_Backup\%date%"
mongodump --db "NRCM_Information" --out "E:\Database_Backup\%date%"