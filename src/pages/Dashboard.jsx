import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  Grid,
  Button,
  Paper,
  Chip,
  Divider,
  IconButton,
  Avatar,
  LinearProgress,
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  CreditCard,
  Key,
  AccountBalanceWallet,
  Settings,
  Logout,
  Add,
  ContentCopy,
  Visibility,
  VisibilityOff,
  QrCode,
  Download,
  Share,
  TrendingUp,
  Security,
  Notifications,
  Language,
  DarkMode,
  Payment,
  History
} from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard({ user, onLogout }) {
  const [tabValue, setTabValue] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);
  const [createApiKeyDialog, setCreateApiKeyDialog] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const apiKey = "sk_1234567890abcdef1234567890abcdef";
  const maskedApiKey = "sk_••••••••••••••••••••••••••••••••";

  const transactions = [
    { id: 1, date: "2024-01-15", description: "100 Credits Purchase", amount: "$9.99", status: "Completed" },
    { id: 2, date: "2024-01-10", description: "Monthly Subscription", amount: "$19.99", status: "Completed" },
    { id: 3, date: "2024-01-05", description: "API Usage", amount: "-5.00 credits", status: "Processed" },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: "80vh", bgcolor: "grey.50", py: 6 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
            <Box>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Welcome back, {user?.username} 👋
              </Typography>
            </Box>
            <Chip 
              avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{user?.username?.charAt(0)?.toUpperCase()}</Avatar>}
              label={user?.email}
              variant="outlined"
            />
          </Box>

          <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    minHeight: 64,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }
                }}
              >
                <Tab icon={<AccountBalanceWallet sx={{ fontSize: 20 }} />} iconPosition="start" label="Credits & Plan" />
                <Tab icon={<Payment sx={{ fontSize: 20 }} />} iconPosition="start" label="Payment & Billing" />
                <Tab icon={<Key sx={{ fontSize: 20 }} />} iconPosition="start" label="API Keys" />
                <Tab icon={<TrendingUp sx={{ fontSize: 20 }} />} iconPosition="start" label="Earn Credits" />
                <Tab icon={<Settings sx={{ fontSize: 20 }} />} iconPosition="start" label="Settings" />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ p: 4 }}>
              {/* Credits & Plan Tab */}
              {tabValue === 0 && (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        1.00
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Total Credits
                      </Typography>
                      <Button variant="contained" size="small" sx={{ mt: 2 }}>
                        Buy More
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="bold">
                        0.00
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Subscription Credits
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                        Upgrade
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="bold">
                        1.00
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Pay as you go
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ mr: 1 }}>
                          50
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          / 50
                        </Typography>
                      </Box>
                      <Typography color="text.secondary" variant="body2">
                        Free API Previews
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={100} 
                        sx={{ mt: 2, height: 6, borderRadius: 3 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {/* Payment & Billing Tab */}
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Billing History
                  </Typography>
                  <TableContainer component={Paper} elevation={2}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell align="right">{transaction.amount}</TableCell>
                            <TableCell>
                              <Chip 
                                label={transaction.status} 
                                size="small" 
                                color={transaction.status === "Completed" ? "success" : "default"}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button startIcon={<History />} sx={{ mt: 3 }}>
                    View Full History
                  </Button>
                </Box>
              )}

              {/* API Keys Tab */}
              {tabValue === 2 && (
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6">API Keys</Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<Add />}
                      onClick={() => setCreateApiKeyDialog(true)}
                    >
                      Create New Key
                    </Button>
                  </Box>
                  
                  <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="subtitle1">Production Key</Typography>
                      <Chip label="Active" color="success" size="small" />
                    </Box>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <TextField
                        value={showApiKey ? apiKey : maskedApiKey}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                              <IconButton onClick={() => copyToClipboard(apiKey)}>
                                <ContentCopy />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="outlined" startIcon={<QrCode />}>
                        Show QR
                      </Button>
                      <Button variant="outlined" startIcon={<Download />}>
                        Download
                      </Button>
                      <Button variant="outlined" startIcon={<Share />}>
                        Share
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              )}

              {/* Earn Credits Tab */}
              {tabValue === 3 && (
                <Box textAlign="center" sx={{ py: 4 }}>
                  <TrendingUp sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Earn Free Credits
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Complete tasks and refer friends to earn free credits
                  </Typography>
                  <Button variant="contained">
                    View Rewards Program
                  </Button>
                </Box>
              )}

              {/* Settings Tab */}
              {tabValue === 4 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Account Settings
                  </Typography>
                  
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          <Security sx={{ fontSize: 20, verticalAlign: "middle", mr: 1 }} />
                          Security
                        </Typography>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Two-factor authentication"
                          sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Login notifications"
                        />
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          <Notifications sx={{ fontSize: 20, verticalAlign: "middle", mr: 1 }} />
                          Notifications
                        </Typography>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Email notifications"
                          sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Product updates"
                        />
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          <Language sx={{ fontSize: 20, verticalAlign: "middle", mr: 1 }} />
                          Preferences
                        </Typography>
                        <FormControlLabel
                          control={<Switch />}
                          label="Dark mode"
                          sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Auto-renew credits"
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  
                  
                  
                </Box>
              )}
            </Box>
          </Card>
        </Container>
      </Box>

      {/* Create API Key Dialog */}
      <Dialog open={createApiKeyDialog} onClose={() => setCreateApiKeyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New API Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Key Name"
            fullWidth
            variant="outlined"
            value={newApiKeyName}
            onChange={(e) => setNewApiKeyName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateApiKeyDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setCreateApiKeyDialog(false)}>
            Create Key
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
}