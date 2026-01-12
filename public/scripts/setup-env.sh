#!/bin/bash

# AuthScape Environment Variables Setup Script
# This script helps you configure AuthScape environment variables on your local machine

echo "========================================"
echo "   AuthScape Environment Setup"
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

if [ -z "$SHELL_CONFIG" ]; then
    echo "Warning: Could not detect shell configuration file"
    echo "Variables will only be set for the current session"
    echo ""
fi

# Function to set environment variable
set_env_var() {
    local name=$1
    local value=$2
    local description=$3

    if [ -z "$value" ]; then
        echo "Skipping $name (no value provided)"
        return
    fi

    # Export for current session
    export $name="$value"

    # Append to shell config if available
    if [ -n "$SHELL_CONFIG" ]; then
        # Check if variable already exists in config
        if grep -q "export $name=" "$SHELL_CONFIG" 2>/dev/null; then
            # Update existing variable
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "/export $name=/d" "$SHELL_CONFIG"
            else
                # Linux
                sed -i "/export $name=/d" "$SHELL_CONFIG"
            fi
        fi
        echo "export $name=\"$value\"" >> "$SHELL_CONFIG"
    fi

    echo "[OK] $name"
    if [ -n "$description" ]; then
        echo "    $description"
    fi
}

echo "This script will help you configure AuthScape environment variables."
echo "Press ENTER to skip any field you don't want to configure."
echo ""

# Database Connection
echo "--- Database Configuration ---"
read -p "Database Server (e.g., localhost): " db_server
read -p "Database Name (e.g., AuthScape): " db_name
read -p "Database Username: " db_user
read -sp "Database Password: " db_pass
echo ""

if [ -n "$db_server" ] && [ -n "$db_name" ]; then
    if [ -n "$db_user" ] && [ -n "$db_pass" ]; then
        # SQL Server Authentication
        conn_string="Server=$db_server;Database=$db_name;User Id=$db_user;Password=$db_pass;TrustServerCertificate=True"
    else
        # Integrated Security
        conn_string="Server=$db_server;Database=$db_name;Integrated Security=True;TrustServerCertificate=True"
    fi
    set_env_var "ConnectionStrings__DefaultConnection" "$conn_string" "Database connection string"
fi

echo ""

# Base Configuration
echo "--- Base Configuration ---"
read -p "API Base URI (e.g., https://api.yourdomain.com): " base_uri
set_env_var "AppSettings__BaseUri" "$base_uri" "API base URL"

read -p "Client Base URI (e.g., https://yourdomain.com): " client_uri
set_env_var "AppSettings__ClientBaseUri" "$client_uri" "Client base URL"

echo ""

# Stripe Configuration
echo "--- Stripe Configuration (Optional) ---"
read -p "Stripe Secret Key (sk_...): " stripe_secret
set_env_var "AppSettings__Stripe__SecretKey" "$stripe_secret" "Stripe secret key"

read -p "Stripe Publishable Key (pk_...): " stripe_public
set_env_var "AppSettings__Stripe__PublishableKey" "$stripe_public" "Stripe publishable key"

echo ""

# SendGrid Configuration
echo "--- SendGrid Email Configuration (Optional) ---"
read -p "SendGrid API Key: " sendgrid_key
set_env_var "AppSettings__SendGrid__ApiKey" "$sendgrid_key" "SendGrid API key"

read -p "From Email Address: " from_email
set_env_var "AppSettings__SendGrid__FromEmail" "$from_email" "Email sender address"

read -p "From Name: " from_name
set_env_var "AppSettings__SendGrid__FromName" "$from_name" "Email sender name"

echo ""

# Azure Blob Storage
echo "--- Azure Blob Storage (Optional) ---"
read -p "Azure Storage Connection String: " azure_storage
set_env_var "AppSettings__AzureStorage__ConnectionString" "$azure_storage" "Azure Blob Storage connection"

echo ""

# Lucene Search (Marketplace)
echo "--- Lucene Search / Marketplace (Optional) ---"
read -p "Lucene Storage Connection String: " lucene_storage
set_env_var "AppSettings__LuceneSearch__StorageConnectionString" "$lucene_storage" "Lucene search index storage"

read -p "Lucene Container Name (default: lucene-indexes): " lucene_container
if [ -z "$lucene_container" ]; then
    lucene_container="lucene-indexes"
fi
set_env_var "AppSettings__LuceneSearch__Container" "$lucene_container" "Lucene container name"

echo ""

# OpenAI / Azure OpenAI
echo "--- AI Services (Optional) ---"
read -p "OpenAI API Key: " openai_key
set_env_var "AppSettings__OpenAI__ApiKey" "$openai_key" "OpenAI API key"

read -p "Azure OpenAI Key: " azure_openai_key
set_env_var "AppSettings__AzureOpenAI__ApiKey" "$azure_openai_key" "Azure OpenAI key"

read -p "Azure OpenAI Endpoint: " azure_openai_endpoint
set_env_var "AppSettings__AzureOpenAI__Endpoint" "$azure_openai_endpoint" "Azure OpenAI endpoint"

echo ""
echo "========================================"
echo "   Setup Complete!"
echo "========================================"
echo ""
echo "Environment variables have been set."
echo ""

if [ -n "$SHELL_CONFIG" ]; then
    echo "Variables saved to: $SHELL_CONFIG"
    echo ""
    echo "IMPORTANT: Run the following command to apply changes:"
    echo "  source $SHELL_CONFIG"
else
    echo "IMPORTANT: Variables are set for the current session only."
    echo "You'll need to re-run this script in new terminal sessions."
fi

echo ""
echo "To verify the variables were set, run:"
echo "  env | grep -E 'AppSettings|ConnectionStrings'"
echo ""
