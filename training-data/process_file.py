import csv

def process_file_from_third_line(file_path, output_path=None):
    """
    Process a CSV file line by line starting from the third line.
    
              # Write headers
            file.write(f"{header1}\n")
            # Add ',Decision' to the second header line
            header2_with_decision = f"{header2},Decision"
            file.write(f"{header2_with_decision}\n")
            
            # Write processed datas:
        file_path (str): Path to the input CSV file
        output_path (str, optional): Path to save processed data. If None, prints to console.
    
    Returns:
        list: Processed data rows
    """
    processed_data = []
    
    try:
        with open(file_path, 'r') as file:
            # Store header lines
            header1 = file.readline().strip()
            header2 = file.readline().strip() + ',Decision'
            
            # Create CSV reader for remaining lines
            csv_reader = csv.reader(file)
           
            # First pass: collect all data
            for row in csv_reader:
                if not row:  # Skip empty lines
                    continue
                    
                # Process the row
                processed_row = {
                    'Datetime': row[0],
                    'Close': float(row[1]),
                    'High': float(row[2]),
                    'Low': float(row[3]),
                    'Open': float(row[4]),
                    'Volume': float(row[5]),
                    'Decision': 'na',
                }
                
                processed_data.append(processed_row)
            
            # Second pass: process trading decisions
            total_rows = len(processed_data)
            for i in range(total_rows):
                # Check buy and sell conditions
                is_sell, sell_idx = check_sell_condition(processed_data[i], processed_data, i)
                is_buy, buy_idx = check_buy_condition(processed_data[i], processed_data, i)
                
                # Determine the trading decision
                if is_sell:
                    processed_data[i]['Decision'] = 'sell'
                    #processed_data[i]['last_checked_index'] = sell_idx
                elif is_buy:
                    processed_data[i]['Decision'] = 'buy'
                    #processed_data[i]['last_checked_index'] = buy_idx
                elif not is_sell and not is_buy and sell_idx != -1 and buy_idx != -1:  # Last row in the dataset
                    processed_data[i]['Decision'] = 'hold'
                else:
                    processed_data[i]['Decision'] = 'na'

            # Handle output
            if output_path:
                save_processed_data(output_path, header1, header2, processed_data)
            else:
                # Print first few processed rows as example
                print(f"First 5 processed rows:")
                for row in processed_data[:5]:
                    print(row)
                    
            print(f"Processed {len(processed_data)} rows successfully")
            return processed_data
            
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        return None
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        return None

def check_sell_condition(p, data, current_index):
    """
    Check if sell condition is met in subsequent rows.
    
    Args:
        p: Current row being processed
        data: List of all rows
        current_index: Index of current row in data
    
    Returns:
        tuple: (bool, int) where:
            - bool: True if sell condition is met, False otherwise
            - int: Index of the last checked row, or -1 if no valid condition was found
    """
    # Convert string indices to numeric for comparison
    p_open = float(p['Open'])
    upper_limit = p_open + 1.785
    lower_limit = p_open - (2 * 1.785)
    
    # Check all subsequent rows after current position
    for idx, next_row in enumerate(data[current_index + 1:], start=current_index + 1):
        high = float(next_row['High'])
        low = float(next_row['Low'])
        
        # Check both conditions:
        # 1. High is less than (open + 1.785)
        # 2. Low is less than (open - 2*1.785)
        if high >= upper_limit:
            return False, idx
        elif high < upper_limit and low <= lower_limit:
            return True, idx
        
            
    return False, -1


def check_buy_condition(p, data, current_index):
    """
    Check if buy condition is met in subsequent rows.

    Args:
        p: Current row being processed
        data: List of all rows
        current_index: Index of current row in data
    
    Returns:
        tuple: (bool, int) where:
            - bool: True if buy condition is met, False otherwise
            - int: Index of the last checked row, or -1 if no valid condition was found
    """
    # Convert string indices to numeric for comparison
    p_open = float(p['Open'])
    upper_limit = p_open + (2*1.785)
    lower_limit = p_open - (1 * 1.785)
    
    # Check all subsequent rows after current position
    for idx, next_row in enumerate(data[current_index + 1:], start=current_index + 1):
        high = float(next_row['High'])
        low = float(next_row['Low'])
        
        # Check both conditions:
        # 1. High is greater than or equal to (open + 1.785)
        # 2. Low is greater than (open - 2*1.785)
        if low <= lower_limit:
            return False, idx
        elif high >= upper_limit and low > lower_limit:
            return True, idx
            
    return False, -1




def save_processed_data(output_path, header1, header2, processed_data):
    """
    Save processed data to a new CSV file, excluding rows with 'na' decisions.
    """
    try:
        # Filter out rows with 'na' decisions
        filtered_data = [row for row in processed_data if row['Decision'] != 'na']
        
        with open(output_path, 'w', newline='') as file:
            # Write headers
            #file.write(f"{header1}\n")
            file.write(f"{header2}\n")
            
            # Write processed data
            if filtered_data:
                writer = csv.DictWriter(file, fieldnames=filtered_data[0].keys())
                writer.writerows(filtered_data)
                
                print(f"Original rows: {len(processed_data)}")
                print(f"Rows after removing 'na' decisions: {len(filtered_data)}")
                print(f"Processed data saved to: {output_path}")
            else:
                print("Warning: No valid trading decisions found in the data")
        
    except Exception as e:
        print(f"Error saving processed data: {str(e)}")

# Example usage
if __name__ == "__main__":
    import argparse
    
    # Create argument parser
    parser = argparse.ArgumentParser(description='Process stock data file and generate trading decisions')
    
    # Add arguments
    parser.add_argument('input', type=str, 
                      help='Path to the input CSV file')
    parser.add_argument('--output', type=str, 
                      help='Path to save processed data. If not provided, will show sample output')
    
    # Parse arguments
    args = parser.parse_args()
    
    # Process the file
    processed_data = process_file_from_third_line(args.input, args.output)