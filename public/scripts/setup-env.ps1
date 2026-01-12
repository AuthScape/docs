# AuthScape Environment Variables Setup Script
# This script helps you configure AuthScape environment variables on your local machine

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   AuthScape Environment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "Note: Running without Administrator privileges." -ForegroundColor Yellow
    Write-Host "Variables will be set at User level only." -ForegroundColor Yellow
    Write-Host ""
}

# Function to set environment variable
function Set-EnvVar {
    param(
        [string]$Name,
        [string]$Value,
        [string]$Description
    )

    if ([string]::IsNullOrWhiteSpace($Value)) {
        Write-Host "Skipping $Name (no value provided)" -ForegroundColor Gray
        return
    }

    try {
        [Environment]::SetEnvironmentVariable($Name, $Value, "User")
        Write-Host "[OK] $Name" -ForegroundColor Green
        if ($Description) {
            Write-Host "    $Description" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "[ERROR] Failed to set $Name" -ForegroundColor Red
        Write-Host "    $_" -ForegroundColor Red
    }
}

Write-Host "This script will help you configure AuthScape environment variables." -ForegroundColor White
Write-Host "Press ENTER to skip any field you don't want to configure." -ForegroundColor White
Write-Host ""

# Database Connection
Write-Host "--- Database Configuration ---" -ForegroundColor Cyan
$dbServer = Read-Host "Database Server (e.g., localhost or server.database.windows.net)"
$dbName = Read-Host "Database Name (e.g., AuthScape)"
$dbUser = Read-Host "Database Username"
$dbPass = Read-Host "Database Password" -AsSecureString
$dbPassPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPass))

if ($dbServer -and $dbName) {
    if ($dbUser -and $dbPassPlain) {
        # SQL Server Authentication
        $connString = "Server=$dbServer;Database=$dbName;User Id=$dbUser;Password=$dbPassPlain;TrustServerCertificate=True"
    }
    else {
        # Windows Authentication
        $connString = "Server=$dbServer;Database=$dbName;Integrated Security=True;TrustServerCertificate=True"
    }
    Set-EnvVar "ConnectionStrings__DefaultConnection" $connString "Database connection string"
}

Write-Host ""

# Base Configuration
Write-Host "--- Base Configuration ---" -ForegroundColor Cyan
$baseUri = Read-Host "API Base URI (e.g., https://api.yourdomain.com)"
Set-EnvVar "AppSettings__BaseUri" $baseUri "API base URL"

$clientUri = Read-Host "Client Base URI (e.g., https://yourdomain.com)"
Set-EnvVar "AppSettings__ClientBaseUri" $clientUri "Client base URL"

Write-Host ""

# Stripe Configuration
Write-Host "--- Stripe Configuration (Optional) ---" -ForegroundColor Cyan
$stripeSecret = Read-Host "Stripe Secret Key (sk_...)"
Set-EnvVar "AppSettings__Stripe__SecretKey" $stripeSecret "Stripe secret key"

$stripePublic = Read-Host "Stripe Publishable Key (pk_...)"
Set-EnvVar "AppSettings__Stripe__PublishableKey" $stripePublic "Stripe publishable key"

Write-Host ""

# SendGrid Configuration
Write-Host "--- SendGrid Email Configuration (Optional) ---" -ForegroundColor Cyan
$sendGridKey = Read-Host "SendGrid API Key"
Set-EnvVar "AppSettings__SendGrid__ApiKey" $sendGridKey "SendGrid API key"

$fromEmail = Read-Host "From Email Address"
Set-EnvVar "AppSettings__SendGrid__FromEmail" $fromEmail "Email sender address"

$fromName = Read-Host "From Name"
Set-EnvVar "AppSettings__SendGrid__FromName" $fromName "Email sender name"

Write-Host ""

# Azure Blob Storage
Write-Host "--- Azure Blob Storage (Optional) ---" -ForegroundColor Cyan
$azureStorage = Read-Host "Azure Storage Connection String"
Set-EnvVar "AppSettings__AzureStorage__ConnectionString" $azureStorage "Azure Blob Storage connection"

Write-Host ""

# Lucene Search (Marketplace)
Write-Host "--- Lucene Search / Marketplace (Optional) ---" -ForegroundColor Cyan
$luceneStorage = Read-Host "Lucene Storage Connection String"
Set-EnvVar "AppSettings__LuceneSearch__StorageConnectionString" $luceneStorage "Lucene search index storage"

$luceneContainer = Read-Host "Lucene Container Name (default: lucene-indexes)"
if ([string]::IsNullOrWhiteSpace($luceneContainer)) {
    $luceneContainer = "lucene-indexes"
}
Set-EnvVar "AppSettings__LuceneSearch__Container" $luceneContainer "Lucene container name"

Write-Host ""

# OpenAI / Azure OpenAI
Write-Host "--- AI Services (Optional) ---" -ForegroundColor Cyan
$openAiKey = Read-Host "OpenAI API Key"
Set-EnvVar "AppSettings__OpenAI__ApiKey" $openAiKey "OpenAI API key"

$azureOpenAiKey = Read-Host "Azure OpenAI Key"
Set-EnvVar "AppSettings__AzureOpenAI__ApiKey" $azureOpenAiKey "Azure OpenAI key"

$azureOpenAiEndpoint = Read-Host "Azure OpenAI Endpoint"
Set-EnvVar "AppSettings__AzureOpenAI__Endpoint" $azureOpenAiEndpoint "Azure OpenAI endpoint"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Environment variables have been set at the User level." -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: You need to restart any open terminals or IDEs" -ForegroundColor Yellow
Write-Host "for the changes to take effect." -ForegroundColor Yellow
Write-Host ""
Write-Host "To verify the variables were set, run:" -ForegroundColor White
Write-Host "  Get-ChildItem Env: | Where-Object { `$_.Name -like '*AppSettings*' -or `$_.Name -like '*ConnectionStrings*' }" -ForegroundColor Gray
Write-Host ""
