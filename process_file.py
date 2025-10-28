import csv

def process_file_from_third_line(file_path, output_path=None):
    """
    Process a CSV file line by line starting from the third line.
    
    Args:
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
            header2 = file.readline().strip()
            
            # Create CSV reader for remaining lines
            csv_reader = csv.reader(file)
            
            # Process each line starting from the 3rd line
            for row in csv_reader:
                if not row:  # Skip empty lines
                    continue
                    
                # Process the row (example processing)
                processed_row = {
                    'Datetime': row[0],
                    'Close': float(row[1]),
                    'High': float(row[2]),
                    'Low': float(row[3]),
                    'Open': float(row[4]),
                    'Volume': int(row[5])
                }
                
                # Add any custom processing here
                # Calculate price range
                processed_row['price_range'] = processed_row['High'] - processed_row['Low']
                
                # Store the current row
                processed_data.append(processed_row)
                
                # Check sell condition for current row
                # We subtract 1 to get the current index since we just appended
                current_index = len(processed_data) - 1
                processed_row['sell_condition'] = check_sell_condition(processed_row, processed_data, current_index)
        
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
        data: List of all processed rows
        current_index: Index of current row in data
    
    Returns:
        bool: True if sell condition is met, False otherwise
    """
    # Convert string indices to numeric for comparison
    p_open = float(p['Open'])
    upper_limit = p_open + 1.785
    lower_limit = p_open - (2 * 1.785)
    
    # Check all subsequent rows after current position
    for next_row in data[current_index + 1:]:
        high = float(next_row['High'])
        low = float(next_row['Low'])
        
        # Check both conditions:
        # 1. High is less than (open + 1.785)
        # 2. Low is less than (open - 2*1.785)
        if high < upper_limit and low <= lower_limit:
            return True
            
    return False


def check_buy_condition(p, data, current_index):
    """
    Check if buy condition is met in subsequent rows.

    Args:
        p: Current row being processed
        data: List of all processed rows
        current_index: Index of current row in data
    
    Returns:
        bool: True if sell condition is met, False otherwise
    """
    # Convert string indices to numeric for comparison
    p_open = float(p['Open'])
    upper_limit = p_open + 1.785
    lower_limit = p_open - (2 * 1.785)
    
    # Check all subsequent rows after current position
    for next_row in data[current_index + 1:]:
        high = float(next_row['High'])
        low = float(next_row['Low'])
        
        # Check both conditions:
        # 1. High is less than (open + 1.785)
        # 2. Low is less than (open - 2*1.785)
        if high >= upper_limit and low > lower_limit:
            return True
            
    return False

def save_processed_data(output_path, header1, header2, processed_data):
    """
    Save processed data to a new CSV file.
    """
    try:
        with open(output_path, 'w', newline='') as file:
            # Write headers
            file.write(f"{header1}\n")
            file.write(f"{header2}\n")
            
            # Write processed data
            writer = csv.DictWriter(file, fieldnames=processed_data[0].keys())
            writer.writerows(processed_data)
            
        print(f"Processed data saved to: {output_path}")
        
    except Exception as e:
        print(f"Error saving processed data: {str(e)}")

# Example usage
if __name__ == "__main__":
    # Example processing
    input_file = "AAPL_5m_enhanced_20251025_2019.csv"
    output_file = "AAPL_5m_processed.csv"
    
    processed_data = process_file_from_third_line(input_file, output_file)
    
    if processed_data:
        print(f"\nExample of calculated price ranges:")
        for row in processed_data[:3]:
            print(f"DateTime: {row['Datetime']}, Price Range: ${row['price_range']:.2f}")