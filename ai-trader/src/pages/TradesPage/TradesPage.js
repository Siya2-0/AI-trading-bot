import React, { useState, useMemo } from 'react';
import './TradesPage.css';
import SideMenu from '../../components/SideMenu copy/SideMenu.js';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  Typography, 
  TextField, 
  MenuItem, 
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpward, 
  ArrowDownward,
  FilterList 
} from '@mui/icons-material';

// Mock data for demonstration
const mockTrades = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    stockName: 'AAPL',
    isBuy: true,
    isWinning: true,
    stopLoss: 145.00,
    takeProfit: 160.00,
    startPrice: 150.50,
    currentPrice: 158.75,
    swap: 2.50,
    date_time: '2024-01-15 10:30:00',
    profits: 825.00,
    status: 'active'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    stockName: 'TSLA',
    isBuy: false,
    isWinning: false,
    stopLoss: 250.00,
    takeProfit: 220.00,
    startPrice: 240.50,
    currentPrice: 245.25,
    swap: -1.75,
    date_time: '2024-01-15 11:15:00',
    profits: -475.00,
    status: 'active'
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    stockName: 'MSFT',
    isBuy: true,
    isWinning: true,
    stopLoss: 320.00,
    takeProfit: 350.00,
    startPrice: 330.50,
    currentPrice: 345.75,
    swap: 1.25,
    date_time: '2024-01-14 09:45:00',
    profits: 1525.00,
    status: 'closed'
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    stockName: 'GOOGL',
    isBuy: false,
    isWinning: true,
    stopLoss: 135.00,
    takeProfit: 125.00,
    startPrice: 130.50,
    currentPrice: 127.25,
    swap: -0.50,
    date_time: '2024-01-14 14:20:00',
    profits: 325.00,
    status: 'closed'
  }
];

const TradesPage = ( ) => {
    const [isCollapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrades = useMemo(() => {
    return mockTrades.filter(trade => {
      const matchesFilter = filter === 'all' || 
                           (filter === 'active' && trade.status === 'active') ||
                           (filter === 'closed' && trade.status === 'closed') ||
                           (filter === 'buy' && trade.isBuy) ||
                           (filter === 'sell' && !trade.isBuy);
      
      const matchesSearch = trade.stockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trade.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  const stats = useMemo(() => {
    const activeTrades = mockTrades.filter(trade => trade.status === 'active');
    const closedTrades = mockTrades.filter(trade => trade.status === 'closed');
    const winningTrades = mockTrades.filter(trade => trade.isWinning);
    
    return {
      totalTrades: mockTrades.length,
      activeTrades: activeTrades.length,
      closedTrades: closedTrades.length,
      winRate: closedTrades.length > 0 ? 
        (winningTrades.length / closedTrades.length * 100).toFixed(1) : 0,
      totalProfit: mockTrades.reduce((sum, trade) => sum + trade.profits, 0)
    };
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <div className='TradesPage' >
    <SideMenu isCollapsed={isCollapsed} setCollapsed={setCollapsed}/>
    <div className={`trades-container ${isCollapsed ? "collapsed" : ""}`}>
    <Box sx={{ p: 3, overflow:'auto' }} >
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Trades Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Trades</Typography>
              <Typography variant="h4">{stats.totalTrades}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Active Trades</Typography>
              <Typography variant="h4">{stats.activeTrades}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Win Rate</Typography>
              <Typography variant="h4">{stats.winRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: stats.totalProfit >= 0 ? 'success.main' : 'error.main', 
            color: 'white' 
          }}>
            <CardContent>
              <Typography variant="h6">Total P&L</Typography>
              <Typography variant="h4">{formatCurrency(stats.totalProfit)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Filter Trades"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              InputProps={{
                startAdornment: <FilterList sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            >
              <MenuItem value="all">All Trades</MenuItem>
              <MenuItem value="active">Active Trades</MenuItem>
              <MenuItem value="closed">Closed Trades</MenuItem>
              <MenuItem value="buy">Buy Trades</MenuItem>
              <MenuItem value="sell">Sell Trades</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search by Stock or Order #"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="AAPL, ORD-001..."
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Trades Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Price</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Stop Loss</TableCell>
              <TableCell>Take Profit</TableCell>
              <TableCell>Swap</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell align="right">Profit/Loss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrades.map((trade) => (
              <TableRow key={trade.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {trade.orderNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {trade.stockName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={trade.isBuy ? <ArrowUpward /> : <ArrowDownward />}
                    label={trade.isBuy ? 'BUY' : 'SELL'}
                    color={trade.isBuy ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={trade.status.toUpperCase()}
                    color={trade.status === 'active' ? 'primary' : 'default'}
                    variant={trade.status === 'active' ? 'filled' : 'outlined'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatCurrency(trade.startPrice)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {formatCurrency(trade.currentPrice)}
                    {trade.status === 'active' && (
                      trade.currentPrice > trade.startPrice ? (
                        <TrendingUp sx={{ color: 'success.main', ml: 0.5 }} />
                      ) : (
                        <TrendingDown sx={{ color: 'error.main', ml: 0.5 }} />
                      )
                    )}
                  </Box>
                </TableCell>
                <TableCell>{formatCurrency(trade.stopLoss)}</TableCell>
                <TableCell>{formatCurrency(trade.takeProfit)}</TableCell>
                <TableCell>
                  <Typography 
                    color={trade.swap >= 0 ? 'success.main' : 'error.main'}
                  >
                    {formatCurrency(trade.swap)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDateTime(trade.date_time)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    sx={{ 
                      fontWeight: 'bold',
                      color: trade.profits >= 0 ? 'success.main' : 'error.main'
                    }}
                  >
                    {formatCurrency(trade.profits)}
                  </Typography>
                  {trade.status === 'active' && (
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.abs((trade.currentPrice - trade.startPrice) / 
                            (trade.isBuy ? 
                             (trade.takeProfit - trade.startPrice) : 
                             (trade.startPrice - trade.takeProfit)) * 100)}
                      color={trade.profits >= 0 ? 'success' : 'error'}
                      sx={{ mt: 1, height: 4, borderRadius: 2 }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredTrades.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No trades found matching your criteria
          </Typography>
        </Box>
      )}
    </Box>
    </div>
    </div>
  );
};

export default TradesPage;