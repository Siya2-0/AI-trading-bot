def clean_file_linebreaks(input_file_path, output_file_path=None):
    """
    Read a file and ensure there's only one line break between lines,
    removing any extra blank lines.
    
    Args:
        input_file_path (str): Path to the input file
        output_file_path (str, optional): Path to save the cleaned file. 
                                        If None, overwrites the input file.
    """
    try:
        # Read the file
        with open(input_file_path, 'r') as file:
            lines = file.readlines()
        
        # Remove leading/trailing whitespace and filter out empty lines
        cleaned_lines = [line.strip() for line in lines]
        cleaned_lines = [line for line in cleaned_lines if line]
        
        # If no output path specified, use the input path
        if output_file_path is None:
            output_file_path = input_file_path
        
        # Write the cleaned content back to file
        with open(output_file_path, 'w') as file:
            file.write('\n'.join(cleaned_lines))
            
        print(f"File cleaned successfully: {output_file_path}")
        
    except FileNotFoundError:
        print(f"Error: File not found - {input_file_path}")
    except Exception as e:
        print(f"Error: {str(e)}")

def main():
    import argparse
    
    # Create argument parser
    parser = argparse.ArgumentParser(description='Clean file by removing extra line breaks and empty lines')
    
    # Add arguments
    parser.add_argument('input', type=str, 
                      help='Path to the input file')
    parser.add_argument('--output', type=str, 
                      help='Path to the output file. If not provided, will overwrite the input file')
    
    # Parse arguments
    args = parser.parse_args()
    
    # Clean the file
    clean_file_linebreaks(args.input, args.output)

if __name__ == "__main__":
    main()