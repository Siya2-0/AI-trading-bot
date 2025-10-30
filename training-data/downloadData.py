import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def calculate_technical_indicators(df, ticker='AAPL'):
    """
    Calculate comprehensive technical indicators for trading analysis
    """
    df = df.copy()
    
    # # 1. PRICE VELOCITY (Rate of change over different periods)
    # df['price_velocity_5m'] = (df['Close'] - df['Close'].shift(1)) / df['Close'].shift(1) * 100
    # df['price_velocity_15m'] = (df['Close'] - df['Close'].shift(3)) / df['Close'].shift(3) * 100
    # df['price_velocity_30m'] = (df['Close'] - df['Close'].shift(6)) / df['Close'].shift(6) * 100
    
    # # 2. RECENT HIGH/LOW BREAK
    # df['15min_high'] = df['High'].rolling(window=3).max()
    # df['15min_low'] = df['Low'].rolling(window=3).min()
    # df['break_15min_high'] = (df['Close', ticker] > df['15min_high'].shift(1)).astype(int)
    # df['break_15min_low'] = (df['Close', ticker] < df['15min_low'].shift(1)).astype(int)
  
    # # 3. VOLUME ANALYSIS - KEY PREDICTIVE INDICATORS
    # # Calculate essential moving averages
    # df['volume_5avg'] = df['Volume'].rolling(window=5).mean()
    # df['volume_20avg'] = df['Volume'].rolling(window=20).mean()
    # df['volume_60avg'] = df['Volume'].rolling(window=60).mean()
    
    # # Fill NaN values
    # for col in ['volume_5avg', 'volume_20avg', 'volume_60avg']:
    #     df[col] = df[col].fillna(df['Volume'].mean())
    
    # # 3.1. KEY INDICATOR: Volume-Price Surge (Strong predictive value for breakouts)
    # df['volume_surge_ratio'] = df['Volume',ticker] / df['volume_20avg']
    # df['volume_price_surge'] = ((df['volume_surge_ratio'] > 2.0) & 
    #                            (abs(df['price_velocity_5m']) > 0.5)).astype(int)
    
    # # 3.2. KEY INDICATOR: Relative Volume Strength (Historical volume significance)
    # df['relative_volume_strength'] = (df['volume_5avg'] / df['volume_60avg'] - 1) * 100
    
    # # 3.3. KEY INDICATOR: Volume Trend (Direction and strength of volume)
    # df['volume_trend'] = np.where(
    #     df['volume_5avg'] > df['volume_20avg'],
    #     np.where(df['volume_20avg'] > df['volume_60avg'], 2,  # Strong uptrend
    #             1),  # Moderate uptrend
    #     np.where(df['volume_20avg'] < df['volume_60avg'], -2,  # Strong downtrend
    #             -1)  # Moderate downtrend
    # )
    
    # # 3.4. KEY INDICATOR: Consecutive Volume Surge (Sustained buying/selling pressure)
    # df['consecutive_surge'] = ((df['volume_surge_ratio'] > 1.5) & 
    #                          (df['volume_surge_ratio'].shift(1) > 1.5)).astype(int)
    
    # # Composite Volume Signal (-100 to +100 scale)
    # df['volume_signal_strength'] = (
    #     # Volume-price surge component (40% weight)
    #     df['volume_price_surge'] * 40 +
    #     # Relative strength component (30% weight)
    #     np.clip(df['relative_volume_strength'], -100, 100) * 0.3 +
    #     # Volume trend component (20% weight)
    #     df['volume_trend'] * 10 +
    #     # Consecutive surge component (10% weight)
    #     df['consecutive_surge'] * 10
    # )

  
    # # 4. VWAP (Volume Weighted Average Price) - Daily reset
    # df['cumulative_volume'] = df['Volume'].cumsum()
    # df['cumulative_typical_volume'] = (df['Volume'] * (df['High'] + df['Low'] + df['Close']) / 3).cumsum()
    # df['VWAP'] = df['cumulative_typical_volume'] / df['cumulative_volume']
    # # df['price_vs_vwap'] = ((df['Close'] - df['VWAP']) / df['VWAP'])[ticker] * 100
    # print(df['price_vs_vwap'])
    
    # # # 5. RSI (Relative Strength Index)
    # def calculate_rsi(data, window=14):
    #     delta = data.diff()
    #     gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    #     loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    #     rs = gain / loss
    #     rsi = 100 - (100 / (1 + rs))
    #     return rsi
    
    # df['RSI_14'] = calculate_rsi(df['Close'], 14)
    # df['RSI_7'] = calculate_rsi(df['Close'], 7)
    
    # # # 6. ATR (Average True Range)
    # def calculate_atr(data, window=14):
    #     high_low = data['High'] - data['Low']
    #     high_close = np.abs(data['High'] - data['Close'].shift())
    #     low_close = np.abs(data['Low'] - data['Close'].shift())
    #     true_range = np.maximum(high_low, np.maximum(high_close, low_close))
    #     atr = true_range.rolling(window=window).mean()
    #     return atr
    
    # # Calculate ATR and normalized versions
    # df['ATR_14'] = calculate_atr(df)
    # df['ATR_percent'] = (df['ATR_14'] / df['Close',ticker]) * 100
    
    
    # # Calculate multiple ATR periods for comparison
    # df['ATR_5'] = calculate_atr(df, window=5)   # Short-term volatility
    # df['ATR_21'] = calculate_atr(df, window=21)  # Longer-term volatility
    
    # # Volatility state (comparing short vs long term ATR)
    # df['volatility_ratio'] = df['ATR_5'] / df['ATR_21']
    # df['volatility_state'] = np.where(
    #     df['volatility_ratio'] > 1.2, 'High',
    #     np.where(df['volatility_ratio'] < 0.8, 'Low', 'Normal')
    # )
    
    # # ATR-based price channels
    # df['upper_channel'] = df['Close',ticker] + (2 * df['ATR_14'])
    # df['lower_channel'] = df['Close',ticker] - (2 * df['ATR_14'])
    
    # # Volatility breakout signals
    # df['atr_breakout'] = np.where(
    #     abs(df['Close',ticker] - df['Close',ticker].shift(1)) > (2 * df['ATR_14'].shift(1)),
    #     np.sign(df['Close',ticker] - df['Close',ticker].shift(1)),  # 1 for upside breakout, -1 for downside
    #     0
    # )
    
    # # ATR-based position sizing (normalized to account for volatility)
    # df['position_size_factor'] = 1 / df['ATR_percent']  # Inverse relationship with volatility
    
    # # Volatility trend
    # df['volatility_trend'] = np.where(
    #     (df['ATR_14'] > df['ATR_14'].rolling(window=5).mean()) &
    #     (df['ATR_14'].rolling(window=5).mean() > df['ATR_14'].rolling(window=20).mean()),
    #     'Increasing',
    #     np.where(
    #         (df['ATR_14'] < df['ATR_14'].rolling(window=5).mean()) &
    #         (df['ATR_14'].rolling(window=5).mean() < df['ATR_14'].rolling(window=20).mean()),
    #         'Decreasing',
    #         'Stable'
    #     )
    # )
    
    # # Composite volatility score (-100 to +100)
    # df['volatility_score'] = (
    #     # Current volatility level vs historical (40%)
    #     ((df['ATR_percent'] - df['ATR_percent'].rolling(window=20).mean()) /
    #      df['ATR_percent'].rolling(window=20).std()) * 40 +
    #     # Volatility trend (30%)
    #     (df['volatility_ratio'] - 1) * 30 +
    #     # Breakout intensity (30%)
    #     (df['atr_breakout'] * 30)
    # )

    
    # # 7. MARKET INDEX CORRELATION (with SPY)
    # try:
    #     spy_data = yf.download('SPY', period='60d', interval='5m', progress=False)
    #     # Align timestamps and calculate correlation
    #     aligned_data = pd.concat([
    #         df['Close'].rename('AAPL'),
    #         spy_data['Close'].rename('SPY')
    #     ], axis=1).dropna()
        
    #     # Calculate rolling correlation
    #     df['market_correlation_30m'] = aligned_data['AAPL'].rolling(window=6).corr(aligned_data['SPY'])
    # except:
    #     print("Warning: Could not download SPY data for correlation")
    #     df['market_correlation_30m'] = np.nan
    
    # # # 8. SECTOR ETF MOMENTUM (with XLK - Technology ETF)
    # try:
    #     xlk_data = yf.download('XLK', period='60d', interval='5m', progress=False)
    #     # Calculate XLK momentum
    #     xlk_data['XLK_momentum_15m'] = (xlk_data['Close'] - xlk_data['Close'].shift(3)) / xlk_data['Close'].shift(3) * 100
        
    #     # Merge with main dataframe
    #     df = df.merge(xlk_data[['XLK_momentum_15m']], left_index=True, right_index=True, how='left')
    # except:
    #     print("Warning: Could not download XLK data for sector momentum")
    #     df['XLK_momentum_15m'] = np.nan
    
    # # 9. OPENING RANGE BREAK
    # def calculate_opening_range_break(data):
    #     data = data.copy()
    #     data['date'] = data.index.date
    #     data['time'] = data.index.time
        
    #     # Calculate opening range (first 30 minutes: 9:30-10:00 AM)
    #     opening_range = data.groupby('date').apply(
    #         lambda x: x[(x.index.time >= pd.to_datetime('09:30:00').time()) & 
    #                    (x.index.time <= pd.to_datetime('10:00:00').time())]
    #     )
        
    #     opening_high = opening_range.groupby('date')['High'].max()
    #     opening_low = opening_range.groupby('date')['Low'].min()
        
    #     # Map opening range to each row
    #     data['opening_high'] = data['date'].map(opening_high)
    #     data['opening_low'] = data['date'].map(opening_low)
        
    #     # Calculate breaks
    #     data['break_opening_high'] = (data['Close'] > data['opening_high']).astype(int)
    #     data['break_opening_low'] = (data['Close'] < data['opening_low']).astype(int)
        
    #     return data['break_opening_high'], data['break_opening_low']
    
    # df['break_opening_high'], df['break_opening_low'] = calculate_opening_range_break(df)
    
    # # 10. BID-ASK SPREAD & DEPTH (Placeholder - Yahoo Finance doesn't provide this historically)
    # df['bid_ask_spread_pct'] = np.nan  # This would require real-time data
    # df['market_depth'] = np.nan  # This would require Level 2 data
    
    # # Clean up intermediate columns
    # columns_to_drop = ['cumulative_volume', 'cumulative_typical_volume', '15min_high', '15min_low', 'volume_20avg']
    # df = df.drop(columns=[col for col in columns_to_drop if col in df.columns])
    
    return df

def download_market_data(ticker='AAPL', start=None, end=None, period=None, interval='5m'):
    """
    Download market data with flexible parameters
    
    Args:
        ticker (str): Stock ticker symbol (e.g., 'AAPL', 'MSFT')
        start (str): Start date in 'YYYY-MM-DD' format (optional)
        end (str): End date in 'YYYY-MM-DD' format (optional)
        period (str): Time period (e.g., '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max')
        interval (str): Data interval ('1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo')
    """
    print(f"Downloading {ticker} data...")
    print(f"Interval: {interval}")
    if start and end:
        print(f"Date range: {start} to {end}")
    elif period:
        print(f"Period: {period}")
    
    try:
        # Download stock data
        if start and end:
            stock_data = yf.download(
                tickers=ticker,
                start=start,
                end=end,
                interval=interval,
                progress=True
            )
        else:
            stock_data = yf.download(
                tickers=ticker,
                period=period or "60d",  # default to 60d if no period specified
                interval=interval,
                progress=True
            )
        
        if stock_data.empty:
            print("No data retrieved. Please check your parameters and connection.")
            return None
            
        # Ensure Volume column is float type
        stock_data['Volume'] = stock_data['Volume'].astype(float)

        # Calculate technical indicators if requested
        enhanced_data = calculate_technical_indicators(stock_data)
        
        # Save to CSV with custom header
        timestamp = datetime.now().strftime('%Y%m%d_%H%M')
        filename = f"{ticker}_{interval}_{timestamp}.csv"
        
        # Prepare the data
        output_data = enhanced_data[['Close', 'High', 'Low', 'Open', 'Volume']].copy()
        
        # Write the custom header and data
        with open(filename, 'w') as f:
            # Write first line
            f.write(f'Ticker,{ticker}\n')
            # Write second line (column headers)
            f.write('Datetime,Close,High,Low,Open,Volume\n')
            # Write the data without headers
            output_data.to_csv(f, header=False)
        
        print(f"\nData saved to {filename}")
        print(f"Downloaded {len(stock_data)} data points")
        print(f"Date range: {stock_data.index[0]} to {stock_data.index[-1]}")
        
        return stock_data
        
    except Exception as e:
        print(f"Error downloading data: {str(e)}")
        return None

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Download market data with flexible parameters')
    parser.add_argument('--ticker', type=str, default='AAPL',
                        help='Stock ticker symbol (default: AAPL)')
    parser.add_argument('--start', type=str,
                        help='Start date in YYYY-MM-DD format')
    parser.add_argument('--end', type=str,
                        help='End date in YYYY-MM-DD format')
    parser.add_argument('--period', type=str,
                        help='Time period (1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max)')
    parser.add_argument('--interval', type=str, default='5m',
                        help='Data interval (1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo)')
    
    args = parser.parse_args()
    
    download_market_data(
        ticker=args.ticker,
        start=args.start,
        end=args.end,
        period=args.period,
        interval=args.interval
    )

if __name__ == "__main__":
    main()