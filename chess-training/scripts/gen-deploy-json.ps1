$root = "C:\Users\USER\Documents\CHESS TRANING\chess-training"

$files = @(
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "postcss.config.js",
    "tailwind.config.js",
    "index.html",
    "src\main.tsx",
    "src\App.tsx",
    "src\index.css",
    "src\vite-env.d.ts",
    "src\lib\utils.ts",
    "src\store\TrainingContext.tsx",
    "src\pages\Dashboard.tsx",
    "src\pages\Stats.tsx",
    "src\pages\Compare.tsx",
    "src\pages\DesignView.tsx",
    "src\components\MiniCalendar.tsx",
    "src\pages\designs\Design3.tsx",
    "src\pages\designs\Design8.tsx",
    "src\pages\designs\Design9.tsx",
    "src\pages\designs\Design10.tsx",
    "src\pages\designs\Design11.tsx",
    "vercel.json"
)

# Create vercel.json
$vercelJson = '{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}'
Set-Content (Join-Path $root "vercel.json") $vercelJson -NoNewline

$entries = @()
foreach ($f in $files) {
    $path = Join-Path $root $f
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $b64 = [Convert]::ToBase64String($bytes)
    $entries += @"
    {"file":"$($f -replace '\\','/')","data":"$b64","encoding":"base64"}
"@
}

$json = @"
{
  "target": "production",
  "name": "chess-training-dashboard",
  "projectSettings": {
    "buildCommand": "tsc -b && vite build",
    "outputDirectory": "dist",
    "installCommand": "npm install"
  },
  "files": [
$($entries -join ",
")
  ]
}
"@

$json | Out-File (Join-Path $root "scripts\deploy-payload.json") -Encoding utf8
Write-Host "Payload written: $($json.Length) chars"
Write-Host "File count: $($entries.Count)"
