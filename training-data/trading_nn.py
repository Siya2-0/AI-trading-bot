import numpy as np
import pandas as pd
import random
from datetime import datetime

def set_all_seeds(seed=42):
    """Set seeds for reproducibility"""
    random.seed(seed)
    np.random.seed(seed)
    print(f"🔢 All random seeds set to: {seed}")

def sigmoid(z):
    """Sigmoid activation function"""
    return 1.0 / (1.0 + np.exp(-z))

def softmax(z):
    """Softmax activation function for multi-class output"""
    exp_z = np.exp(z - np.max(z))  # Subtract max for numerical stability
    return exp_z / exp_z.sum()

def d_sigmoid(z):
    """Derivative of sigmoid function"""
    sig = sigmoid(z)
    return sig * (1.0 - sig)

class TradingNN:
    def __init__(self, n_inputs, n_hidden, n_outputs, W1=None, W2=None, lr=0.1):
        """
        Initialize Trading Neural Network
        
        Args:
            n_inputs (int): Number of input features (7 + 1 bias)
            n_hidden (int): Number of hidden neurons (7 + 1 bias)
            n_outputs (int): Number of output classes (3: buy, sell, hold)
            W1, W2: Pre-initialized weights (for reproducibility)
            lr (float): Learning rate
        """
        self.n_inputs = n_inputs
        self.n_hidden = n_hidden
        self.n_outputs = n_outputs
        self.lr = lr
        
        if W1 is None or W2 is None:
            self.init_weights()
        else:
            self.W1 = W1  # Input -> Hidden weights (including bias)
            self.W2 = W2  # Hidden -> Output weights (including bias)
            
        self.activations = {}  # Store activations for visualization
        
    def init_weights(self, seed=42):
        """Initialize weights with small random values"""
        np.random.seed(seed)
        self.W1 = np.random.randn(self.n_hidden, self.n_inputs + 1) * 0.1
        self.W2 = np.random.randn(self.n_outputs, self.n_hidden + 1) * 0.1

    def forward(self, x):
        """
        Forward pass through the network
        
        Args:
            x: Input features (7 values)
            
        Returns:
            Output probabilities for buy/sell/hold
        """
        # Add bias term to input
        x_b = np.append(x, 1.0)
        
        # Hidden layer
        z1 = np.dot(self.W1, x_b)  # Pre-activation
        a1 = sigmoid(z1)  # Hidden layer activation
        a1_b = np.append(a1, 1.0)  # Add bias to hidden layer
        
        # Output layer
        z2 = np.dot(self.W2, a1_b)  # Pre-activation
        a2 = softmax(z2)  # Output probabilities
        
        # Store activations for visualization
        self.activations = {
            'x': x,
            'x_b': x_b,
            'z1': z1,
            'a1': a1,
            'a1_b': a1_b,
            'z2': z2,
            'a2': a2
        }
        
        return a2

    def backward(self, y_true):
        """
        Backward pass to calculate gradients
        
        Args:
            y_true: One-hot encoded true label
            
        Returns:
            Weight gradients
        """
        # Get stored activations
        x_b = self.activations['x_b']
        a1 = self.activations['a1']
        a1_b = self.activations['a1_b']
        a2 = self.activations['a2']
        z1 = self.activations['z1']
        
        # Output layer error
        delta2 = a2 - y_true
        dW2 = np.outer(delta2, a1_b)
        
        # Hidden layer error (excluding bias)
        delta1 = np.dot(self.W2.T[:-1], delta2) * d_sigmoid(z1)
        dW1 = np.outer(delta1, x_b)
        
        return dW1, dW2

    def train_step(self, x, y_true):
        """Single training step"""
        self.forward(x)
        dW1, dW2 = self.backward(y_true)
        
        # Update weights
        self.W1 -= self.lr * dW1
        self.W2 -= self.lr * dW2

    def visualize_activations(self, threshold=0.5):
        """
        Visualize neuron activations
        
        Args:
            threshold: Activation threshold for highlighting
        """
        print("\n=== Neural Network Activations ===")
        
        # Input layer
        print("\nInput Layer:")
        features = ['Open', 'High', 'Low', 'Close', 'Volume']
        for i, (name, val) in enumerate(zip(features, self.activations['x'])):
            print(f"{name}: {val:.4f}")
        
        # Hidden layer
        print("\nHidden Layer:")
        hidden_acts = self.activations['a1']
        for i, act in enumerate(hidden_acts):
            active = "🟢" if act > threshold else "⚪"
            print(f"Neuron {i+1}: {act:.4f} {active}")
            
        # Output layer
        print("\nOutput Layer (Softmax probabilities):")
        outputs = ['Buy', 'Sell', 'Hold']
        probs = self.activations['a2']
        decision = outputs[np.argmax(probs)]
        for name, prob in zip(outputs, probs):
            active = "🟢" if name == decision else "⚪"
            print(f"{name}: {prob:.4f} {active}")

def prepare_training_data(csv_path):
    """
    Prepare training data from CSV file
    
    Args:
        csv_path: Path to CSV file with OHLCV data
        
    Returns:
        X: Features
        y: One-hot encoded labels
    """
    # Read CSV file
    df = pd.read_csv(csv_path)
    
    # Prepare features (normalized)
    features = ['Open', 'High', 'Low', 'Close', 'Volume']
    X = df[features].values
    
    # Normalize features
    X = (X - np.mean(X, axis=0)) / np.std(X, axis=0)
    
    # Prepare labels
    labels = df['Decision'].values
    y = np.zeros((len(labels), 3))  # One-hot encoding for buy/sell/hold
    
    # Convert decisions to one-hot encoding
    for i, label in enumerate(labels):
        if label == 'buy':
            y[i, 0] = 1
        elif label == 'sell':
            y[i, 1] = 1
        else:  # hold
            y[i, 2] = 1
            
    return X, y

def main():
    """Main function to demonstrate the trading neural network"""
    # Set random seed
    set_all_seeds(42)
    
    # Initialize network (5 inputs + 1 bias, 7 hidden + 1 bias, 3 outputs)
    net = TradingNN(5, 7, 3, lr=0.1)
    
    # Load and prepare data
    X, y = prepare_training_data('AAPL_5m_enhanced_20251025_2019.csv')
    
    # Demo forward pass with first sample
    print("=== Trading Neural Network Demo ===")
    print("\nPerforming forward pass with sample data...")
    
    sample_x = X[0]
    output = net.forward(sample_x)
    
    # Visualize network state
    net.visualize_activations()
    
    # Demo training step
    print("\n=== Training Step Demo ===")
    sample_y = y[20]
    print(f"True label (one-hot): {sample_y}")
    
    print("\nPerforming training step...")
    net.train_step(sample_x, sample_y)
    
    print("\nUpdated network state:")
    net.visualize_activations()

if __name__ == "__main__":
    main()