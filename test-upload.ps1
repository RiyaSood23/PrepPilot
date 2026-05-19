# Test Resume Upload Flow

# Step 1: Login to get token
Write-Host "Step 1: Logging in..." -ForegroundColor Cyan

$loginBody = '{
  "email": "bob1@gmail.com",
  "password": "password123"
}'

$loginResponse = curl.exe -s -X POST http://localhost:3000/api/students/login `
  -H "Content-Type: application/json" `
  -d $loginBody | ConvertFrom-Json

if ($loginResponse.success) {
  $token = $loginResponse.data.token
  $studentId = $loginResponse.data.student._id
  Write-Host "Login successful!" -ForegroundColor Green
  Write-Host "Token: $token" -ForegroundColor Yellow
  Write-Host "Student ID: $studentId" -ForegroundColor Yellow
} else {
  Write-Host "Login failed!" -ForegroundColor Red
  exit 1
}

# Step 2: Create a test PDF file
Write-Host "`nStep 2: Creating test PDF..." -ForegroundColor Cyan
$testPdfPath = "c:\Users\Meghna Rana\OneDrive\Desktop\New folder\test-resume.pdf"

# Create a minimal PDF
$pdfContent = @"
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(Test Resume) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000273 00000 n
0000000361 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
455
%%EOF
"@

Set-Content -Path $testPdfPath -Value $pdfContent -Encoding ASCII
Write-Host "Test PDF created at: $testPdfPath" -ForegroundColor Green

# Step 3: Upload resume
Write-Host "`nStep 3: Uploading resume..." -ForegroundColor Cyan

$uploadResponse = curl.exe -s -X POST http://localhost:3000/api/students/upload-resume `
  -H "Authorization: Bearer $token" `
  -F "resume=@$testPdfPath" | ConvertFrom-Json

if ($uploadResponse.success) {
  Write-Host "Upload successful!" -ForegroundColor Green
  Write-Host "Resume URL: $($uploadResponse.data.resumeUrl)" -ForegroundColor Yellow
} else {
  Write-Host "Upload failed!" -ForegroundColor Red
  Write-Host $uploadResponse
}

# Step 4: Get resume URL
Write-Host "`nStep 4: Fetching resume..." -ForegroundColor Cyan

$getResponse = curl.exe -s -X GET "http://localhost:3000/api/students/$studentId/resume" | ConvertFrom-Json

if ($getResponse.success) {
  Write-Host "Fetch successful!" -ForegroundColor Green
  Write-Host "Resume URL: $($getResponse.data.resumeUrl)" -ForegroundColor Yellow
} else {
  Write-Host "Fetch failed!" -ForegroundColor Red
  Write-Host $getResponse
}

Write-Host "`nAll tests completed!" -ForegroundColor Green
