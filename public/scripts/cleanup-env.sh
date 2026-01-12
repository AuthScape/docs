#!/bin/bash

# AuthScape Environment Variables Cleanup Script
# This script removes AuthScape environment variables from your local machine

echo "========================================"
echo "   AuthScape Environment Cleanup"
echo "========================================"
echo ""

# Detect shell config file
SHELL_CONFIG=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_CONFIG="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_CONFIG="$HOME/.bash_profile"
fi

echo "This script will remove all AuthScape environment variables."
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Cleanup cancelled."
    exit 0
fi

echo ""

# List of AuthScape environment variables to remove
variables=(
    "ConnectionStrings__DefaultConnection"
    "AppSettings__BaseUri"
    "AppSettings__ClientBaseUri"
    "AppSettings__Stripe__SecretKey"
    "AppSettings__Stripe__PublishableKey"
    "AppSettings__SendGrid__ApiKey"
    "AppSettings__SendGrid__FromEmail"
    "AppSettings__SendGrid__FromName"
    "AppSettings__AzureStorage__ConnectionString"
    "AppSettings__LuceneSearch__StorageConnectionString"
    "AppSettings__LuceneSearch__Container"
    "AppSettings__OpenAI__ApiKey"
    "AppSettings__AzureOpenAI__ApiKey"
    "AppSettings__AzureOpenAI__Endpoint"
)

removed_count=0

for var in "${variables[@]}"; do
    # Unset from current session
    unset $var

    # Remove from shell config file if it exists
    if [ -n "$SHELL_CONFIG" ] && [ -f "$SHELL_CONFIG" ]; then
        if grep -q "export $var=" "$SHELL_CONFIG" 2>/dev/null; then
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "/export $var=/d" "$SHELL_CONFIG"
            else
                # Linux
                sed -i "/export $var=/d" "$SHELL_CONFIG"
            fi
            echo "[REMOVED] $var"
            removed_count=$((removed_count + 1))
        else
            echo "[SKIP] $var (not set)"
        fi
    else
        echo "[SKIP] $var (no shell config found)"
    fi
done

echo ""
echo "========================================"
echo "   Cleanup Complete!"
echo "========================================"
echo ""
echo "Removed $removed_count environment variable(s)."
echo ""

if [ -n "$SHELL_CONFIG" ]; then
    echo "Variables removed from: $SHELL_CONFIG"
    echo ""
    echo "IMPORTANT: Run the following command to apply changes:"
    echo "  source $SHELL_CONFIG"
else
    echo "Variables removed from current session only."
fi

echo ""
