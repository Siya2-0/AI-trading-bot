import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
from trading_nn import TradingNN

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

def train_neural_network(X_train, y_train, epochs=1000, learning_rate=0.01):
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

def plot_loss_curve(losses):
    """
    Plot the training loss curve
    """
    plt.figure(figsize=(10, 6))
    plt.plot(losses)
    plt.title('Training Loss over Time')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.grid(True)
    plt.savefig('training_loss.png')
    plt.close()

def main():
    # Load training data (sampled)
    print("Loading training data...")
    X_train, y_train, scaler = load_and_preprocess_data('AAPL_5m_sampled.csv')
    
    # Train the model
    print("\nTraining neural network...")
    model, losses = train_neural_network(X_train, y_train)
    
    # Plot training loss
    plot_loss_curve(losses)
    
    # Load test data (full dataset)
    print("\nLoading test data...")
    X_test, y_test, _ = load_and_preprocess_data('AAPL_5m_processed.csv')
    
    # Evaluate on training data
    print("\nEvaluating on training data...")
    train_acc, train_cm, train_report, _ = evaluate_model(model, X_train, y_train)
    print(f"Training Accuracy: {train_acc:.4f}")
    print("\nTraining Confusion Matrix:")
    print(train_cm)
    print("\nTraining Classification Report:")
    print(train_report)
    
    # Evaluate on test data
    print("\nEvaluating on test data...")
    test_acc, test_cm, test_report, _ = evaluate_model(model, X_test, y_test)
    print(f"Test Accuracy: {test_acc:.4f}")
    print("\nTest Confusion Matrix:")
    print(test_cm)
    print("\nTest Classification Report:")
    print(test_report)

if __name__ == "__main__":
    main()