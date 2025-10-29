import pandas as pd
import numpy as np
import os

def sample_csv_data(input_file, output_file, sample_percentage=0.25, random_seed=42):
    """
    Randomly sample records from a CSV file and save to a new CSV file.
    
    Args:
        input_file (str): Path to input CSV file
        output_file (str): Path to save the sampled data
        sample_percentage (float): Percentage of records to sample (0.0 to 1.0)
        random_seed (int): Random seed for reproducibility
        
    Returns:
        tuple: (number of original records, number of sampled records)
    """
    try:
        # Set random seed for reproducibility
        np.random.seed(random_seed)
        
        # Read the CSV file
        print(f"Reading data from {input_file}...")
        df = pd.read_csv(input_file)
        total_records = len(df)
        
        # Calculate number of records to sample
        sample_size = int(total_records * sample_percentage)
        
        # Randomly sample records
        sampled_df = df.sample(n=sample_size, random_state=random_seed)
        
        # Sort by datetime to maintain chronological order
        if 'Datetime' in sampled_df.columns:
            sampled_df = sampled_df.sort_values('Datetime')
        
        # Save sampled data to new CSV
        sampled_df.to_csv(output_file, index=False)
        
        print(f"\nSampling complete:")
        print(f"Original records: {total_records}")
        print(f"Sampled records: {sample_size} ({sample_percentage*100:.1f}%)")
        print(f"Sampled data saved to: {output_file}")
        
        return total_records, sample_size
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return None, None

def main():
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Set input and output file paths
    input_file = os.path.join(current_dir, 'AAPL_5m_processed.csv')
    output_file = os.path.join(current_dir, 'AAPL_5m_sampled.csv')
    
    # Sample 25% of the data
    total, sampled = sample_csv_data(input_file, output_file)
    
    if total and sampled:
        print(f"\nSuccessfully sampled {sampled} records from {total} total records")

if __name__ == "__main__":
    main()