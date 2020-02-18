start "" "C:\Program Files\MongoDB\Server\4.2\bin\mongod" --dbpath "D:\Data\NRCM"
ping localhost -n 10>nul
start "" "C:\Program Files\MongoDB\Server\4.2\bin\mongo"