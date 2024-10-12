import numpy as np

EMOTIONS = ["happiness", "disgust", "sadness", "fear", "anger", "surprise"]
ANGLES_RAD = np.radians([0, 60, 120, 180, 240, 300])

def vectorize_data(data):
    global EMOTIONS, ANGLES_RAD
    vectors = []
    
    for idx, emotion in enumerate(EMOTIONS):
        magnitude = data[emotion]
        if magnitude > 0:
            # Convert polar to Cartesian coordinates
            angle = ANGLES_RAD[idx]
            x = magnitude * np.cos(angle)
            y = magnitude * np.sin(angle)
            vectors.append((x, y))
    
    return vectors
    
def average_vectors(vectors):
    if vectors:
            avg_vector = np.mean(vectors, axis=0)
    else:
        avg_vector = np.array([0, 0])

    max_magnitude = 10
    avg_vector_normalized = avg_vector / max_magnitude

    return avg_vector_normalized