$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Write-host "My directory is $dir"

# $env:Path = $env:Path + ";C:\Program Files\MongoDB\Server\3.2\"

$dataDir = (Resolve-Path -Path ($dir + "\..\data"))

If ((Test-Path $dataDir) -eq $True) {
  Write-Host "Present"
}
else{
  Write-Host "Absent"
  New-Item -ItemType Directory -Path data
}

# mongod
$mongod = """C:\Program Files\MongoDB\Server\4.0\bin\mongod"" --dbpath=""" + $dataDir + """"
# $mongod = "mongod --dbpath=""" + $dataDir + """"
# mongodRepair
$mongodRepair = """C:\Program Files\MongoDB\Server\4.0\bin\mongod"" --dbpath=""" + $dataDir + """ --repair"
# $mongodRepair = "mongod --dbpath=""" + $dataDir + """ --repair"
# mongodShutDown
$mongodShutDown = """C:\Program Files\MongoDB\Server\4.0\bin\mongod"" --dbpath=""" + $dataDir + """ --shutdown"
# $mongodShutDown = "mongod --dbpath=""" + $dataDir + """ --shutdown"


$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines('.\mongod.bat', $mongod, $Utf8NoBomEncoding)

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines('.\mongodRepair.bat', $mongodRepair, $Utf8NoBomEncoding)

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines('.\mongodShutDown.bat', $mongodShutDown, $Utf8NoBomEncoding)