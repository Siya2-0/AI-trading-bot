import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def calculate_technical_indicators(df, ticker='AAPL'):
    """
    Calculate comprehensive technical indicators for trading analysis
    """
    df = df.copy()
    
    # 1. PRICE VELOCITY (Rate of change over different periods)
    df['price_velocity_5m'] = (df['Close'] - df['Close'].shift(1)) / df['Close'].shift(1) * 100
    df['price_velocity_15m'] = (df['Close'] - df['Close'].shift(3)) / df['Close'].shift(3) * 100
    df['price_velocity_30m'] = (df['Close'] - df['Close'].shift(6)) / df['Close'].shift(6) * 100
    
    # 2. RECENT HIGH/LOW BREAK
    df['15min_high'] = df['High'].rolling(window=3).max()
    df['15min_low'] = df['Low'].rolling(window=3).min()
    df['break_15min_high'] = (df['Close', ticker] > df['15min_high'].shift(1)).astype(int)
    df['break_15min_low'] = (df['Close', ticker] < df['15min_low'].shift(1)).astype(int)
  
    # 3. VOLUME ANALYSIS - KEY PREDICTIVE INDICATORS
    # Calculate essential moving averages
    df['volume_5avg'] = df['Volume'].rolling(window=5).mean()
    df['volume_20avg'] = df['Volume'].rolling(window=20).mean()
    df['volume_60avg'] = df['Volume'].rolling(window=60).mean()
    
    # Fill NaN values
    for col in ['volume_5avg', 'volume_20avg', 'volume_60avg']:
        df[col] = df[col].fillna(df['Volume'].mean())
    
    # 3.1. KEY INDICATOR: Volume-Price Surge (Strong predictive value for breakouts)
    df['volume_surge_ratio'] = df['Volume',ticker] / df['volume_20avg']
    df['volume_price_surge'] = ((df['volume_surge_ratio'] > 2.0) & 
                               (abs(df['price_velocity_5m']) > 0.5)).astype(int)
    
    # 3.2. KEY INDICATOR: Relative Volume Strength (Historical volume significance)
    df['relative_volume_strength'] = (df['volume_5avg'] / df['volume_60avg'] - 1) * 100
    
    # 3.3. KEY INDICATOR: Volume Trend (Direction and strength of volume)
    df['volume_trend'] = np.where(
        df['volume_5avg'] > df['volume_20avg'],
        np.where(df['volume_20avg'] > df['volume_60avg'], 2,  # Strong uptrend
                1),  # Moderate uptrend
        np.where(df['volume_20avg'] < df['volume_60avg'], -2,  # Strong downtrend
                -1)  # Moderate downtrend
    )
    
    # 3.4. KEY INDICATOR: Consecutive Volume Surge (Sustained buying/selling pressure)
    df['consecutive_surge'] = ((df['volume_surge_ratio'] > 1.5) & 
                             (df['volume_surge_ratio'].shift(1) > 1.5)).astype(int)
    
    # Composite Volume Signal (-100 to +100 scale)
    df['volume_signal_strength'] = (
        # Volume-price surge component (40% weight)
        df['volume_price_surge'] * 40 +
        # Relative strength component (30% weight)
        np.clip(df['relative_volume_strength'], -100, 100) * 0.3 +
        # Volume trend component (20% weight)
        df['volume_trend'] * 10 +
        # Consecutive surge component (10% weight)
        df['consecutive_surge'] * 10
    )

  
    # # 4. VWAP (Volume Weighted Average Price) - Daily reset
    # df['cumulative_volume'] = df['Volume'].cumsum()
    # df['cumulative_typical_volume'] = (df['Volume'] * (df['High'] + df['Low'] + df['Close']) / 3).cumsum()
    # df['VWAP'] = df['cumulative_typical_volume'] / df['cumulative_volume']
    # # df['price_vs_vwap'] = ((df['Close'] - df['VWAP']) / df['VWAP'])[ticker] * 100
    # print(df['price_vs_vwap'])
    
    # # 5. RSI (Relative Strength Index)
    def calculate_rsi(data, window=14):
        delta = data.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi
    
    df['RSI_14'] = calculate_rsi(df['Close'], 14)
    df['RSI_7'] = calculate_rsi(df['Close'], 7)
    
    # # 6. ATR (Average True Range)
    def calculate_atr(data, window=14):
        high_low = data['High'] - data['Low']
        high_close = np.abs(data['High'] - data['Close'].shift())
        low_close = np.abs(data['Low'] - data['Close'].shift())
        true_range = np.maximum(high_low, np.maximum(high_close, low_close))
        atr = true_range.rolling(window=window).mean()
        return atr
    
    # Calculate ATR and normalized versions
    df['ATR_14'] = calculate_atr(df)
    df['ATR_percent'] = (df['ATR_14'] / df['Close',ticker]) * 100
    
    
    # Calculate multiple ATR periods for comparison
    df['ATR_5'] = calculate_atr(df, window=5)   # Short-term volatility
    df['ATR_21'] = calculate_atr(df, window=21)  # Longer-term volatility
    
    # Volatility state (comparing short vs long term ATR)
    df['volatility_ratio'] = df['ATR_5'] / df['ATR_21']
    df['volatility_state'] = np.where(
        df['volatility_ratio'] > 1.2, 'High',
        np.where(df['volatility_ratio'] < 0.8, 'Low', 'Normal')
    )
    
    # ATR-based price channels
    df['upper_channel'] = df['Close',ticker] + (2 * df['ATR_14'])
    df['lower_channel'] = df['Close',ticker] - (2 * df['ATR_14'])
    
    # Volatility breakout signals
    df['atr_breakout'] = np.where(
        abs(df['Close',ticker] - df['Close',ticker].shift(1)) > (2 * df['ATR_14'].shift(1)),
        np.sign(df['Close',ticker] - df['Close',ticker].shift(1)),  # 1 for upside breakout, -1 for downside
        0
    )
    
    # ATR-based position sizing (normalized to account for volatility)
    df['position_size_factor'] = 1 / df['ATR_percent']  # Inverse relationship with volatility
    
    # Volatility trend
    df['volatility_trend'] = np.where(
        (df['ATR_14'] > df['ATR_14'].rolling(window=5).mean()) &
        (df['ATR_14'].rolling(window=5).mean() > df['ATR_14'].rolling(window=20).mean()),
        'Increasing',
        np.where(
            (df['ATR_14'] < df['ATR_14'].rolling(window=5).mean()) &
            (df['ATR_14'].rolling(window=5).mean() < df['ATR_14'].rolling(window=20).mean()),
            'Decreasing',
            'Stable'
        )
    )
    
    # Composite volatility score (-100 to +100)
    df['volatility_score'] = (
        # Current volatility level vs historical (40%)
        ((df['ATR_percent'] - df['ATR_percent'].rolling(window=20).mean()) /
         df['ATR_percent'].rolling(window=20).std()) * 40 +
        # Volatility trend (30%)
        (df['volatility_ratio'] - 1) * 30 +
        # Breakout intensity (30%)
        (df['atr_breakout'] * 30)
    )
    print(df)
    
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
    
    # # 8. SECTOR ETF MOMENTUM (with XLK - Technology ETF)
    try:
        xlk_data = yf.download('XLK', period='60d', interval='5m', progress=False)
        # Calculate XLK momentum
        xlk_data['XLK_momentum_15m'] = (xlk_data['Close'] - xlk_data['Close'].shift(3)) / xlk_data['Close'].shift(3) * 100
        
        # Merge with main dataframe
        df = df.merge(xlk_data[['XLK_momentum_15m']], left_index=True, right_index=True, how='left')
    except:
        print("Warning: Could not download XLK data for sector momentum")
        df['XLK_momentum_15m'] = np.nan
    
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

def main():
    print("Downloading AAPL 5-minute data...")
    
    # Download Apple stock data
    aapl_data = yf.download(
        tickers="AAPL",
        period="60d",
        interval="5m",
        progress=True
    )
    
    if aapl_data.empty:
        print("No data retrieved. Please check your connection.")
        return
    
    # Ensure Volume column is float type
    aapl_data['Volume'] = aapl_data['Volume'].astype(float)
    
    print(f"Downloaded {len(aapl_data)} data points")
    print("Calculating technical indicators...")
    
    # Calculate all technical indicators
    enhanced_data = calculate_technical_indicators(aapl_data)
    #print(enhanced_data)
    
    # # Display summary of calculated features
    # print("\n=== CALCULATED FEATURES SUMMARY ===")
    # feature_categories = {
    #     'Price Velocity': ['price_velocity_5m', 'price_velocity_15m', 'price_velocity_30m'],
    #     'Breakouts': ['break_15min_high', 'break_15min_low', 'break_opening_high', 'break_opening_low'],
    #     'Volume': ['volume_surge_ratio', 'volume_surge'],
    #     'Momentum': ['RSI_14', 'RSI_7'],
    #     'Volatility': ['ATR_14', 'ATR_percent'],
    #     'Market Context': ['market_correlation_30m', 'XLK_momentum_15m'],
    #     'VWAP': ['VWAP', 'price_vs_vwap']
    # }
    
    # for category, features in feature_categories.items():
    #     available_features = [f for f in features if f in enhanced_data.columns]
    #     if available_features:
    #         print(f"\n{category}:")
    #         for feature in available_features:
    #             non_na_count = enhanced_data[feature].notna().sum()
    #             print(f"  - {feature}: {non_na_count} non-NaN values")
    
    # # Save to CSV
    # filename = f"AAPL_5m_enhanced_{datetime.now().strftime('%Y%m%d_%H%M')}.csv"
    # enhanced_data.to_csv(filename)
    # print(f"\nEnhanced data saved to: {filename}")
    
    # # Display sample of the data
    # print("\nSample of calculated data (last 5 rows):")
    # sample_columns = ['Close', 'price_velocity_5m', 'RSI_14', 'ATR_14', 'volume_surge_ratio', 'price_vs_vwap']
    # sample_columns = [col for col in sample_columns if col in enhanced_data.columns]
    # print(enhanced_data[sample_columns].tail().round(4))

if __name__ == "__main__":
    main()