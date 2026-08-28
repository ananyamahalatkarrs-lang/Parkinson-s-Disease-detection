import pennylane as qml

n_qubits = 4
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev)
def qnn_circuit(inputs, weights):
    # AngleEmbedding
    for i in range(n_qubits):
        qml.RY(inputs[i % len(inputs)], wires=i)
        
    # BasicEntanglerLayers
    qml.BasicEntanglerLayers(weights, wires=range(n_qubits))
    
    return qml.expval(qml.PauliZ(0))

def get_circuit_visualization():
    # Return a structured representation of the circuit for the frontend to render
    return {
        "qubit_count": n_qubits,
        "gate_count": 8,  # mock count
        "depth": 3,
        "schema": [
            {"wire": 0, "gates": ["RY", "CNOT", "RX"]},
            {"wire": 1, "gates": ["RY", "CNOT", "RX"]},
            {"wire": 2, "gates": ["RY", "CNOT", "RZ"]},
            {"wire": 3, "gates": ["RY", "CNOT", "RZ"]}
        ]
    }
