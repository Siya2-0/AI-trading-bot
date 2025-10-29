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
                    'Volume': float(row[5])
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
                    processed_data[i]['decision'] = 'sell'
                    #processed_data[i]['last_checked_index'] = sell_idx
                elif is_buy:
                    processed_data[i]['decision'] = 'buy'
                    #processed_data[i]['last_checked_index'] = buy_idx
                elif not is_sell and not is_buy and sell_idx != -1 and buy_idx != -1:  # Last row in the dataset
                    processed_data[i]['decision'] = 'hold'
                else:
                    processed_data[i]['decision'] = 'na'

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
    
    # if processed_data:
    #     print(f"\nExample of calculated price ranges:")
    #     for row in processed_data[:3]:
    #         print(f"DateTime: {row['Datetime']}, Price Range: ${row['price_range']:.2f}")