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


