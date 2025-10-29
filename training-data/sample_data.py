import pandas as pd
import argparse

def sample_data(input_file, output_file, sample_percentage=0.25, random_seed=42):
    """
    Sample data from a CSV file while keeping the first two rows intact.
    
    Args:
        input_file (str): Path to the input CSV file
        output_file (str): Path to save the sampled data
        sample_percentage (float): Percentage of remaining data to sample (after first two rows)
        random_seed (int): Random seed for reproducibility
    """
    try:
        # Read the CSV file
        print(f"Reading data from {input_file}...")
        df = pd.read_csv(input_file)
        total_records = len(df)
        
        # Keep first two rows
        first_two_rows = df.iloc[:1]
        remaining_rows = df.iloc[1:]
        
        # Sample 25% of remaining rows
        sample_size = int(len(remaining_rows) * sample_percentage)
        sampled_remaining = remaining_rows.sample(n=sample_size, random_state=random_seed)
  
        # Combine first two rows with sampled rows
        sampled_df = pd.concat([first_two_rows, sampled_remaining])
        
        # Save the sampled data
        print(f"Saving sampled data to {output_file}...")
        sampled_df.to_csv(output_file, index=False)
        
        # print(f"Original records: {total_records}")
        # print(f"Sampled records: {len(sampled_df)} (including first two rows)")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sample data from a CSV file while keeping first two rows")
    parser.add_argument("input_file", help="Input CSV file path")
    parser.add_argument("output_file", help="Output CSV file path")
    parser.add_argument("--sample_percentage", type=float, default=0.25,
                      help="Percentage of remaining data to sample (default: 0.25)")
    parser.add_argument("--random_seed", type=int, default=42,
                      help="Random seed for reproducibility (default: 42)")
    
    args = parser.parse_args()
    
    success = sample_data(args.input_file, args.output_file, 
                         args.sample_percentage, args.random_seed)