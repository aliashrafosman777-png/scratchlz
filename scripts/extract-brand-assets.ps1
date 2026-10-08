$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$identity = "D:\Scratchlz\idenity"
$output = "D:\Scratchlz\site\public\brand"
New-Item -ItemType Directory -Path $output -Force | Out-Null

Get-ChildItem -LiteralPath $identity -File | ForEach-Object {
  $safeName = $_.Name.ToLowerInvariant().Replace(" ", "-")
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $output $safeName) -Force
}

function Export-Crop {
  param(
    [string]$Source,
    [string]$Name,
    [int]$X,
    [int]$Y,
    [int]$Width,
    [int]$Height
  )

  $image = [System.Drawing.Image]::FromFile($Source)
  try {
    $bounds = New-Object System.Drawing.Rectangle($X, $Y, $Width, $Height)
    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($image, (New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)), $bounds, [System.Drawing.GraphicsUnit]::Pixel)
      } finally {
        $graphics.Dispose()
      }
      $bitmap.Save((Join-Path $output $Name), [System.Drawing.Imaging.ImageFormat]::Jpeg)
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $image.Dispose()
  }
}

function Export-Logo {
  param([string]$Source, [string]$Name)

  $image = [System.Drawing.Image]::FromFile($Source)
  try {
    $bitmap = New-Object System.Drawing.Bitmap(1024, 1024, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($image, 0, 0, 1024, 1024)
      } finally {
        $graphics.Dispose()
      }
      $bitmap.Save((Join-Path $output $Name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $image.Dispose()
  }
}

$brandBoard = Join-Path $identity "branding plat.jpg"
$desktopBoard = Join-Path $identity "desktop ui ux.jpg"
$mobileBoard = Join-Path $identity "mobile uiux.jpg"

# Photography and product imagery embedded in the supplied identity plates.
Export-Crop $brandBoard "campaign-portrait.jpg" 36 1462 266 385
Export-Crop $brandBoard "product-black-hoodie.jpg" 312 1462 267 386
Export-Crop $brandBoard "campaign-garage.jpg" 597 1510 260 320
Export-Crop $brandBoard "product-system.jpg" 918 1450 848 420
Export-Crop $brandBoard "packaging-system.jpg" 596 1906 680 460
Export-Crop $brandBoard "objects-system.jpg" 1276 1906 500 460

Export-Crop $desktopBoard "hero-garage.jpg" 67 368 609 548
Export-Crop $desktopBoard "portrait-form.jpg" 634 1018 236 396
Export-Crop $desktopBoard "product-jacket-front.jpg" 32 1555 280 355
Export-Crop $desktopBoard "editorial-grid.jpg" 1276 1545 482 358
Export-Crop $desktopBoard "ui-components.jpg" 602 1984 646 385

Export-Crop $mobileBoard "product-steel-hoodie.jpg" 1360 365 370 330
Export-Crop $mobileBoard "editorial-male.jpg" 925 1600 390 430
Export-Crop $mobileBoard "editorial-woman.jpg" 1356 1255 380 720
Export-Crop $mobileBoard "mobile-product-grid.jpg" 912 430 412 780

# Official transparent cat-star logo variants.
$logoFolder = Join-Path $identity "png logo"
Export-Logo (Join-Path $logoFolder "3.png") "cat-black-fill.png"
Export-Logo (Join-Path $logoFolder "4.png") "cat-white-fill.png"
Export-Logo (Join-Path $logoFolder "5.png") "cat-black-outline.png"
Export-Logo (Join-Path $logoFolder "6.png") "cat-white-outline.png"
Copy-Item -LiteralPath (Join-Path $output "cat-black-fill.png") -Destination "D:\Scratchlz\site\public\favicon.png" -Force

Write-Output "Extracted SCRATCHLZ brand assets to $output"
