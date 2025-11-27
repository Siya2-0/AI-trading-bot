import argparse
from downloadData import download_market_data
from clean_file import clean_file_linebreaks
from process_file import process_file_from_third_line
from sample_data import sample_data
import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
from trading_nn import TradingNN

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

def load_and_preprocess_data(file_path):
    """
    Load and preprocess data from CSV file
    """
    # Load data
    df = pd.read_csv(file_path)
    
    # Extract features (OHLCV)
    features = ['Open', 'High', 'Low', 'Close', 'Volume']
    X = df[features].values
    
    # Standardize features
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    
    # Convert decisions to one-hot encoded format
    decisions = {'buy': [1, 0, 0], 'sell': [0, 1, 0], 'hold': [0, 0, 1]}
    y = np.array([decisions[d] for d in df['Decision']])
    
    return X, y, scaler

def train_neural_network(X_train, y_train, epochs=2500, learning_rate=0.01):
    """
    Train the neural network
    """
    # Initialize network with 5 inputs (OHLCV), 7 hidden neurons, 3 outputs (buy/sell/hold)
    nn = TradingNN(5, 7, 3, lr=learning_rate)
    
    # Training loop
    losses = []
    for epoch in range(epochs):
        epoch_loss = 0
        for i in range(len(X_train)):
            # Train step (includes forward and backward pass)
            nn.train_step(X_train[i], y_train[i])
            # Calculate loss (using current prediction)
            pred = nn.forward(X_train[i])
            epoch_loss += -np.sum(y_train[i] * np.log(pred + 1e-10))  # Cross-entropy loss
        
        avg_loss = epoch_loss / len(X_train)
        losses.append(avg_loss)
        
        if epoch % 100 == 0:
            print(f"Epoch {epoch}, Loss: {avg_loss:.4f}")
    
    return nn, losses

def evaluate_model(model, X, y_true):
    """
    Evaluate model performance
    """
    # Get predictions
    y_pred = []
    for i in range(len(X)):
        outputs = model.forward(X[i])
        prediction = np.argmax(outputs)
        y_pred.append(prediction)
    
    # Convert true labels to single numbers for comparison
    y_true_labels = np.argmax(y_true, axis=1)
    
    # Calculate accuracy
    accuracy = np.mean(y_pred == y_true_labels)
    
    # Generate confusion matrix
    cm = confusion_matrix(y_true_labels, y_pred)
    
    # Generate classification report
    labels = ['buy', 'sell', 'hold']
    report = classification_report(y_true_labels, y_pred, target_names=labels)
    
    return accuracy, cm, report, y_pred

def plot_loss_curve(losses, output_file='training_loss.png'):
    """
    Plot the training loss curve
    """
    plt.figure(figsize=(10, 6))
    plt.plot(losses)
    plt.title('Training Loss over Time')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.grid(True)
    plt.savefig(output_file)
    plt.close()
    print(f"Loss curve saved to: {output_file}")

def predict_decision(model, scaler, open_price, high_price, low_price, close_price, volume):
    """
    Predict trading decision for given OHLCV data
    """
    # Create input array
    input_data = np.array([[open_price, high_price, low_price, close_price, volume]])
    
    # Standardize using the scaler
    input_scaled = scaler.transform(input_data)
    
    # Get prediction
    output = model.forward(input_scaled[0])
    
    # Decode prediction
    decisions = ['buy', 'sell', 'hold']
    decision_idx = np.argmax(output)
    decision = decisions[decision_idx]
    confidence = output[decision_idx]
    
    return decision, confidence, output

def interactive_prediction_mode(model, scaler):
    """
    Interactive mode for making predictions with user input
    """
    print("\n" + "="*60)
    print("=== Interactive Prediction Mode ===")
    print("="*60)
    print("Enter market data to get trading decision.")
    print("Type 'quit' or 'exit' to stop.\n")
    
    while True:
        try:
            # Get user input
            user_input = input("\nEnter data (Datetime,Open,High,Low,Close,Volume): ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("\nExiting prediction mode...")
                break
            
            # Parse input
            parts = user_input.split(',')
            if len(parts) != 6:
                print("Error: Please enter exactly 6 values separated by commas.")
                print("Format: Datetime,Open,High,Low,Close,Volume")
                continue
            
            datetime_str = parts[0].strip()
            open_price = float(parts[1].strip())
            high_price = float(parts[2].strip())
            low_price = float(parts[3].strip())
            close_price = float(parts[4].strip())
            volume = float(parts[5].strip())
            
            # Get prediction
            decision, confidence, probabilities = predict_decision(
                model, scaler, open_price, high_price, low_price, close_price, volume
            )
            
            # Display results
            print("\n" + "-"*60)
            print(f"Datetime: {datetime_str}")
            print(f"Input: Open={open_price}, High={high_price}, Low={low_price}, Close={close_price}, Volume={volume}")
            print(f"\n🎯 Decision: {decision.upper()}")
            print(f"Confidence: {confidence:.2%}")
            print(f"\nProbabilities:")
            print(f"  Buy:  {probabilities[0]:.2%}")
            print(f"  Sell: {probabilities[1]:.2%}")
            print(f"  Hold: {probabilities[2]:.2%}")
            print("-"*60)
            
        except ValueError as e:
            print(f"Error: Invalid input. Please enter numeric values for OHLCV data.")
            print(f"Details: {str(e)}")
        except Exception as e:
            print(f"Error: {str(e)}")

def train_and_test_model(training_file, testing_file, epochs=2500, learning_rate=0.01, interactive=False):
    """
    Train and test the neural network model
    """
    try:
        print("\n=== Training and Testing Neural Network ===")
        
        # Load training data
        print("\nLoading training data...")
        X_train, y_train, scaler = load_and_preprocess_data(training_file)
        print(f"Loaded {len(X_train)} training samples")
        
        # Train the model
        print("\nTraining neural network...")
        model, losses = train_neural_network(X_train, y_train, epochs=epochs, learning_rate=learning_rate)
        
        # Plot training loss
        plot_loss_curve(losses)
        
        # Load test data
        print("\nLoading test data...")
        X_test, y_test, _ = load_and_preprocess_data(testing_file)
        print(f"Loaded {len(X_test)} test samples")
        
        # Evaluate on training data
        print("\n=== Evaluating on training data ===")
        train_acc, train_cm, train_report, _ = evaluate_model(model, X_train, y_train)
        print(f"Training Accuracy: {train_acc:.4f}")
        print("\nTraining Confusion Matrix:")
        print(train_cm)
        print("\nTraining Classification Report:")
        print(train_report)
        
        # Evaluate on test data
        print("\n=== Evaluating on test data ===")
        test_acc, test_cm, test_report, _ = evaluate_model(model, X_test, y_test)
        print(f"Test Accuracy: {test_acc:.4f}")
        print("\nTest Confusion Matrix:")
        print(test_cm)
        print("\nTest Classification Report:")
        print(test_report)
        
        # Enter interactive mode if requested
        if interactive:
            interactive_prediction_mode(model, scaler)
        
        return True
        
    except Exception as e:
        print(f"\nError in training/testing: {str(e)}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Run complete data processing pipeline with neural network training')
    
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
    parser.add_argument('--train', action='store_true',
                      help='Train and test neural network after data processing')
    parser.add_argument('--epochs', type=int, default=2500,
                      help='Number of training epochs (default: 2500)')
    parser.add_argument('--learning_rate', type=float, default=0.01,
                      help='Learning rate for training (default: 0.01)')
    parser.add_argument('--train_only', action='store_true',
                      help='Only train and test (skip data pipeline)')
    parser.add_argument('--interactive', action='store_true',
                      help='Enter interactive prediction mode after training')
    
    args = parser.parse_args()
    
    base_filename = f"{args.ticker}_{args.interval}"
    training_file = f"{base_filename}_training.csv"
    testing_file = f"{base_filename}_testing.csv"
    
    # If train_only, skip data pipeline
    if not args.train_only:
        success = run_data_pipeline(
            ticker=args.ticker,
            interval=args.interval,
            period=args.period,
            sample_percentage=args.sample_percentage,
            random_seed=args.random_seed
        )
        
        if not success:
            exit(1)
    
    # Train and test if requested
    if args.train or args.train_only:
        success = train_and_test_model(
            training_file=training_file,
            testing_file=testing_file,
            epochs=args.epochs,
            learning_rate=args.learning_rate,
            interactive=args.interactive
        )
        
        if not success:
            exit(1)

if __name__ == "__main__":
    main()


# === Interactive Prediction Mode ===
# Enter market data to get trading decision.
# Type 'quit' or 'exit' to stop.

# Enter data (Datetime,Open,High,Low,Close,Volume): 2024-11-27 09:30:00,150.25,151.50,149.80,150.90,1000000

# 🎯 Decision: BUY
# Confidence: 67.45%

# Probabilities:
#   Buy:  67.45%
#   Sell: 15.32%
#   Hold: 17.23%