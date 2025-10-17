import yfinance as yf
import pandas as pd

# Define the ticker symbol for Apple
ticker_symbol = "AAPL"

# Download 5-minute interval data for the maximum available period (last 60 days)
print("Downloading AAPL stock data...")
data = yf.download(
    tickers=ticker_symbol,
    period="60d",  # Maximum period for intraday data
    interval="5m", # 5-minute intervals
    progress=True # Show a progress bar
)

# Check if data was successfully retrieved
if data.empty:
    print("No data retrieved. Please check the ticker symbol and your connection.")
else:
    # Display basic information about the dataset
    print(f"\nDownload successful! Retrieved {len(data)} data points.")
    print("\nFirst 5 rows of the data:")
    print(data.head())
    print("\nDataset info:")
    print(data.info())

    # Save the data to a CSV file
    filename = "AAPL_5m_data.csv"
    data.to_csv(filename)
    print(f"\nData saved to '{filename}'.")