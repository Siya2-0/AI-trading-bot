import os
from dotenv import load_dotenv
import requests
import pandas as pd
import numpy as np
# import ta  # Technical analysis library
from datetime import datetime, timedelta
import random
import io

load_dotenv()

api_key = os.getenv('API_KEY')
#symbol nas100?confirm
#interval 60min
#day365
def fetch_historical_data(symbol, interval, date):#update to collect more data
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval={interval}&apikey={api_key}&outputsize=full&month={date}&datatype=csv"
    response = requests.get(url)
    data = pd.read_csv(io.StringIO(response.text))
    data['timestamp'] = pd.to_datetime(data['timestamp'])
    data = data.sort_values(by='timestamp', ascending=True)
  
 
    return data

def fetch_alpha_vantage_indicator(symbol, indicator, date,interval='60min', time_period=None, series_type='close'):
    """
    Fetch technical indicator data from Alpha Vantage.
    """
    url = f"https://www.alphavantage.co/query?function={indicator}&symbol={symbol}&interval={interval}&time_period={time_period}&series_type={series_type}&month={date}&apikey={api_key}"
    response = requests.get(url)
    data = response.json()
    
    # Extract the indicator values
    if 'Technical Analysis: ' + indicator in data:
        indicator_data = data['Technical Analysis: ' + indicator]
        df = pd.DataFrame.from_dict(indicator_data, orient='index')
        df.index = pd.to_datetime(df.index)
        df = df.astype(float)
        return df
    else:
        raise ValueError(f"Failed to fetch {indicator} data. Response: {data}")


def merge_indicator_result(data, indicator_result, old_column_name,new_column_name):
    indicator_result.index.name='timestamp'
    indicator_result.reset_index(inplace=True)
    data= pd.merge(data, indicator_result, on='timestamp', how='left')
    data.rename(columns={old_column_name: new_column_name}, inplace=True)

    return data

def calculate_indicators(data, symbol, date):
    """
    Calculate technical indicators using Alpha Vantage's API.
    """
    # Fetch SMA 50
    sma_50 = fetch_alpha_vantage_indicator(symbol, 'SMA', date,time_period=50)
    data = merge_indicator_result(data, sma_50,'SMA', 'SMA_50')
    
    
    #Fetch EMA 20
    ema_20 = fetch_alpha_vantage_indicator(symbol, 'EMA', date,time_period=20)
    data = merge_indicator_result(data, ema_20,'EMA', 'EMA_20')

   
    
    # Fetch RSI
    rsi = fetch_alpha_vantage_indicator(symbol, 'RSI',date,time_period=14)
    data = merge_indicator_result(data, rsi,'RSI', 'RSI_14')
    
    # Fetch MACD
    # macd = fetch_alpha_vantage_indicator(symbol, 'MACD', date)
    # data = merge_indicator_result(data, macd,'MACD', 'MACD')
    
    # Fetch Bollinger Bands
    bollinger = fetch_alpha_vantage_indicator(symbol, 'BBANDS', date, time_period=20)
    data = merge_indicator_result(data, bollinger[['Real Upper Band']], 'Real Upper Band', 'Bollinger_Upper')
    data = merge_indicator_result(data, bollinger[['Real Lower Band']], 'Real Lower Band', 'Bollinger_Lower')
    
    # Fetch ATR
    atr = fetch_alpha_vantage_indicator(symbol, 'ATR',date, time_period=14)
    data = merge_indicator_result(data, atr,'ATR', 'ATR_14')


    
    return data



def append_to_excel(data, filename='data.xlsx'):
    """
    Append data to an Excel file. If the file does not exist, create it.
    """
    try:
        with pd.ExcelWriter(filename, mode='a', if_sheet_exists='overlay') as writer:
            data.to_excel(writer, sheet_name='Sheet1', index=False, header=writer.sheets['Sheet1'].max_row == 0)
    except FileNotFoundError:
        data.to_excel(filename, sheet_name='Sheet1', index=False)



if __name__ == "__main__":
    symbol = 'AAPL'
    interval = '60min'
    date = '2023-01'
    data = fetch_historical_data(symbol, interval, date)
    data = calculate_indicators(data, symbol, date)
   
    append_to_excel(data)