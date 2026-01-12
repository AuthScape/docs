# AuthScape Environment Variables Cleanup Script
# This script removes AuthScape environment variables from your local machine

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   AuthScape Environment Cleanup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "Note: Running without Administrator privileges." -ForegroundColor Yellow
    Write-Host "Variables will be removed from User level only." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "This script will remove all AuthScape environment variables." -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Are you sure you want to continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Cleanup cancelled." -ForegroundColor Gray
    exit
}

Write-Host ""

# List of AuthScape environment variables to remove
$variables = @(
    "ConnectionStrings__DefaultConnection",
    "AppSettings__BaseUri",
    "AppSettings__ClientBaseUri",
    "AppSettings__Stripe__SecretKey",
    "AppSettings__Stripe__PublishableKey",
    "AppSettings__SendGrid__ApiKey",
    "AppSettings__SendGrid__FromEmail",
    "AppSettings__SendGrid__FromName",
    "AppSettings__AzureStorage__ConnectionString",
    "AppSettings__LuceneSearch__StorageConnectionString",
    "AppSettings__LuceneSearch__Container",
    "AppSettings__OpenAI__ApiKey",
    "AppSettings__AzureOpenAI__ApiKey",
    "AppSettings__AzureOpenAI__Endpoint"
)

$removedCount = 0

foreach ($var in $variables) {
    try {
        $currentValue = [Environment]::GetEnvironmentVariable($var, "User")

        if ($currentValue) {
            [Environment]::SetEnvironmentVariable($var, $null, "User")
            Write-Host "[REMOVED] $var" -ForegroundColor Green
            $removedCount++
        }
        else {
            Write-Host "[SKIP] $var (not set)" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "[ERROR] Failed to remove $var" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Cleanup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Removed $removedCount environment variable(s)." -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: Restart any open terminals or IDEs" -ForegroundColor Yellow
Write-Host "for the changes to take effect." -ForegroundColor Yellow
Write-Host ""
