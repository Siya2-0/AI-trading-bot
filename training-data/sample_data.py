import pandas as pd
import argparse

def sample_data(input_file, sample_output, remaining_output, sample_percentage=0.25, random_seed=42):
    """
    Sample data from a CSV file and split into two files: sampled data and remaining data.
    Both files will keep the header row intact.
    
    Args:
        input_file (str): Path to the input CSV file
        sample_output (str): Path to save the sampled data
        remaining_output (str): Path to save the remaining (non-sampled) data
        sample_percentage (float): Percentage of data to sample (after header)
        random_seed (int): Random seed for reproducibility
    """
    try:
        # Read the CSV file
        print(f"Reading data from {input_file}...")
        df = pd.read_csv(input_file)
        total_records = len(df)
        
        # Keep header row
        header = df.iloc[0:1]
        data_rows = df.iloc[1:]
        
        # Sample rows and get their indices
        sample_size = int(len(data_rows) * sample_percentage)
        sampled_indices = data_rows.sample(n=sample_size, random_state=random_seed).index
        
        # Split into sampled and remaining data
        sampled_data = df.loc[sampled_indices]
        remaining_data = df.drop(sampled_indices)
        
        # Add header to both datasets
        sampled_df = pd.concat([header, sampled_data])
        remaining_df = pd.concat([header, remaining_data.iloc[1:]])  # Skip header from remaining_data
        
        # Save the sampled data
        print(f"Saving sampled data ({len(sampled_data)} rows) to {sample_output}")
        sampled_df.to_csv(sample_output, index=False)
        
        # Save the remaining data
        print(f"Saving remaining data ({len(remaining_data)-1} rows) to {remaining_output}")
        remaining_df.to_csv(remaining_output, index=False)
        
        # print(f"Original records: {total_records}")
        # print(f"Sampled records: {len(sampled_df)} (including first two rows)")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split data into sampled and remaining sets, preserving the header row")
    parser.add_argument("input_file", help="Input CSV file path")
    parser.add_argument("--sample_output", help="Output file for sampled data (default: input_sampled.csv)")
    parser.add_argument("--remaining_output", help="Output file for remaining data (default: input_remaining.csv)")
    parser.add_argument("--sample_percentage", type=float, default=0.25,
                      help="Percentage of data to sample (default: 0.25)")
    parser.add_argument("--random_seed", type=int, default=42,
                      help="Random seed for reproducibility (default: 42)")
    
    args = parser.parse_args()
    
    # Generate default output filenames if not provided
    if not args.sample_output or not args.remaining_output:
        base = args.input_file.rsplit('.', 1)[0]
        args.sample_output = args.sample_output or f"{base}_sampled.csv"
        args.remaining_output = args.remaining_output or f"{base}_remaining.csv"
    
    success = sample_data(args.input_file, args.sample_output, args.remaining_output,
                         args.sample_percentage, args.random_seed)