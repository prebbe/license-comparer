$src =$args[0]
$predicate=$args[1]

Write-Host "Running predicate $predicate in file $src..."
Write-Host "Result:"

python -m logica $src run $predicate