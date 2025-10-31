import argparse
from downloadData import download_market_data
from clean_file import clean_file_linebreaks
from process_file import process_file_from_third_line
from sample_data import sample_data
import os

def run_data_pipeline(ticker='MSFT', interval='5m', period='60d', sample_percentage=0.20, random_seed=22):
    """
    Run the complete data processing pipeline:
    1. Download market data
    2. Clean the file
    3. Process the file
    4. Create training/testing split
    """
    try:
        print("\n=== Starting Data Pipeline ===")
        
        # Step 1: Download market data
        print("\n1. Downloading market data...")
        base_filename = f"{ticker}_{interval}"
        raw_file = f"{base_filename}_raw.csv"
        download_market_data(ticker=ticker, interval=interval, period=period, output_file=raw_file)
        
        # Step 2: Clean the file
        print("\n2. Cleaning the file...")
        cleaned_file = f"{base_filename}_cleaned.csv"
        clean_file_linebreaks(raw_file, cleaned_file)
        
        # Step 3: Process the file
        print("\n3. Processing the file...")
        processed_file = f"{base_filename}_processed.csv"
        process_file_from_third_line(cleaned_file, processed_file)
        
        # Step 4: Split into training and testing sets
        print("\n4. Creating training/testing split...")
        training_file = f"{base_filename}_training.csv"
        testing_file = f"{base_filename}_testing.csv"
        sample_data(processed_file, training_file, testing_file, sample_percentage, random_seed)
        
        # Clean up intermediate files
        print("\n5. Cleaning up intermediate files...")
        if os.path.exists(raw_file):
            os.remove(raw_file)
        if os.path.exists(cleaned_file):
            os.remove(cleaned_file)
        
        print("\n=== Pipeline Complete ===")
        print(f"Training data saved to: {training_file}")
        print(f"Testing data saved to: {testing_file}")
        
    except Exception as e:
        print(f"\nError in pipeline: {str(e)}")
        return False
        
    return True

def main():
    parser = argparse.ArgumentParser(description='Run complete data processing pipeline')
    
    parser.add_argument('--ticker', type=str, default='AAPL',
                      help='Stock ticker symbol (default: AAPL)')
    parser.add_argument('--interval', type=str, default='5m',
                      choices=['1m', '2m', '5m', '15m', '30m', '60m', '1h', '1d'],
                      help='Data interval (default: 5m)')
    parser.add_argument('--period', type=str, default='60d',
                      choices=['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'],
                      help='Time period to download (default: 60d)')
    parser.add_argument('--sample_percentage', type=float, default=0.25,
                      help='Percentage to use for training set (default: 0.25)')
    parser.add_argument('--random_seed', type=int, default=42,
                      help='Random seed for reproducibility (default: 42)')
    
    args = parser.parse_args()
    
    success = run_data_pipeline(
        ticker=args.ticker,
        interval=args.interval,
        period=args.period,
        sample_percentage=args.sample_percentage,
        random_seed=args.random_seed
    )
    
    if not success:
        exit(1)

if __name__ == "__main__":
    main()