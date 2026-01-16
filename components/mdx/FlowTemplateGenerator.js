import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const generateFlowTemplate = (domain, connectionId) => {
  return {
    definition: {
      "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
      contentVersion: "1.0.0.0",
      triggers: {
        When_a_row_is_added_modified_or_deleted: {
          type: "OpenApiConnectionWebhook",
          inputs: {
            host: {
              connectionName: "shared_commondataserviceforapps",
              operationId: "SubscribeWebhookTrigger",
              apiId: "/providers/Microsoft.PowerApps/apis/shared_commondataserviceforapps"
            },
            parameters: {
              "subscriptionRequest/message": 3,
              "subscriptionRequest/entityname": "contact",
              "subscriptionRequest/scope": 4,
              "subscriptionRequest/filteringattributes": "firstname,lastname,emailaddress1,telephone1,statecode"
            }
          }
        }
      },
      actions: {
        Send_to_AuthScape: {
          type: "Http",
          inputs: {
            method: "POST",
            uri: `https://${domain}/api/crm/webhook/dynamics/${connectionId}`,
            headers: {
              "Content-Type": "application/json"
            },
            body: {
              MessageName: "@{triggerOutputs()?['body/SdkMessage']}",
              PrimaryEntityName: "contact",
              PrimaryEntityId: "@{triggerOutputs()?['body/contactid']}",
              InputParameters: [
                {
                  key: "Target",
                  value: {
                    firstname: "@{triggerOutputs()?['body/firstname']}",
                    lastname: "@{triggerOutputs()?['body/lastname']}",
                    emailaddress1: "@{triggerOutputs()?['body/emailaddress1']}",
                    telephone1: "@{triggerOutputs()?['body/telephone1']}",
                    statecode: "@{triggerOutputs()?['body/statecode']}"
                  }
                }
              ]
            }
          },
          runAfter: {}
        }
      },
      outputs: {}
    },
    connectionReferences: {
      shared_commondataserviceforapps: {
        connectionName: "shared_commondataserviceforapps",
        source: "Invoker",
        id: "/providers/Microsoft.PowerApps/apis/shared_commondataserviceforapps",
        tier: "NotSpecified"
      }
    }
  };
};

export default function FlowTemplateGenerator() {
  const [domain, setDomain] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const [error, setError] = useState('');

  const handleDownload = () => {
    // Validate inputs
    if (!domain.trim()) {
      setError('Please enter your AuthScape domain');
      return;
    }
    if (!connectionId.trim()) {
      setError('Please enter your Connection ID');
      return;
    }

    // Clean up domain (remove https:// if provided)
    let cleanDomain = domain.trim();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '');
    cleanDomain = cleanDomain.replace(/\/$/, '');

    setError('');

    // Generate the template
    const template = generateFlowTemplate(cleanDomain, connectionId.trim());
    const jsonString = JSON.stringify(template, null, 2);

    // Create and trigger download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'authscape-dynamics-webhook.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        my: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Generate Power Automate Template
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="AuthScape Domain"
          placeholder="app.yourcompany.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          fullWidth
          helperText="Your AuthScape domain without https:// (e.g., app.yourcompany.com)"
          size="small"
        />

        <Box>
          <TextField
            label="Connection ID"
            placeholder="42"
            value={connectionId}
            onChange={(e) => setConnectionId(e.target.value)}
            fullWidth
            size="small"
          />
          <Accordion
            elevation={0}
            sx={{
              mt: 1,
              border: 1,
              borderColor: 'divider',
              '&:before': { display: 'none' },
              bgcolor: 'action.hover'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
            >
              <HelpOutlineIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" color="primary.main">
                How do I find my Connection ID?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                The Connection ID is displayed in the CRM Connections table:
              </Typography>
              <Box component="ol" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Go to your AuthScape admin portal
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Navigate to <strong>User Management</strong> → <strong>CRM Integration</strong>
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Find the <strong>Connection ID</strong> column in the table
                </Typography>
                <Typography component="li" variant="body2">
                  Click the ID chip to copy it to your clipboard
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                You can also find it in the Edit dialog when clicking the edit button on a connection.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {error && (
          <Alert severity="error" sx={{ py: 0 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ alignSelf: 'flex-start', mt: 1 }}
        >
          Download Template
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        The generated webhook URL will be: <br />
        <code style={{
          backgroundColor: 'rgba(0,0,0,0.05)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          https://{domain || 'your-domain'}/api/crm/webhook/dynamics/{connectionId || 'your-id'}
        </code>
      </Typography>
    </Paper>
  );
}
