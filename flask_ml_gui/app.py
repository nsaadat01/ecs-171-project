from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score, ConfusionMatrixDisplay, classification_report
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from scipy.stats import randint
import os
import pickle

app = Flask(__name__)

relative_data_file_path = "./nasa.csv"

df = pd.read_csv(relative_data_file_path)

non_numerical_columns = ["Close Approach Date", "Orbiting Body", "Orbit Determination Date", "Equinox"]
domain_knowledge_drops = ["Neo Reference ID", "Name",
                          "Est Dia in KM(min)", "Est Dia in KM(max)", 
                          "Est Dia in Miles(min)", "Est Dia in Miles(max)", 
                          "Est Dia in Feet(min)", "Est Dia in Feet(max)",
                          "Relative Velocity km per sec", "Miles per hour",
                          "Miss Dist.(Astronomical)", "Miss Dist.(lunar)",
                          "Miss Dist.(miles)", "Orbit ID"]

cols_to_drop = non_numerical_columns + domain_knowledge_drops

clean_df = df.drop(columns=cols_to_drop)

clean_df.head()

def getPrediction(input_data):
    with open('RFC_Asteroids_model.pkl', 'rb') as file:
        loaded_rf = pickle.load(file)

    with open('Scaler.pkl', 'rb') as file:
        scaler = pickle.load(file)

    f = open('file.py', 'w')
    f.write(str(input_data))
    f.close()
    
    user_asteroid_df = pd.DataFrame([input_data], index=[0])

    scaled_user_asteroid_df = scaler.transform(user_asteroid_df)

    scaled_user_asteroid_df = pd.DataFrame(scaled_user_asteroid_df, columns=user_asteroid_df.columns)

    is_hazardous = loaded_rf.predict(scaled_user_asteroid_df)

    f = open('other.py', 'w')
    f.write(str(is_hazardous))
    f.close()

    return is_hazardous

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        # Get user input from the form
        input_data = []

        absolute_magnitude = request.form.get("AbsoluteMagnitude")
        input_data.append(absolute_magnitude)

        eccentricity = request.form.get("Eccentricity")
        input_data.append(eccentricity)

        minimum_orbit_intersection = request.form.get("MinimumOrbitIntersection")
        input_data.append(minimum_orbit_intersection)

        orbit_uncertainity = request.form.get("OrbitUncertainity")
        input_data.append(orbit_uncertainity)

        perihelion_distance = request.form.get("PerihelionDistance")
        input_data.append(perihelion_distance)

        relative_velocity = request.form.get("RelativeVelocity")
        input_data.append(relative_velocity)

        f = open('file.py', 'w')
        f.write(str(input_data))
        f.close()

        # Make prediction using your model
        hazardous = getPrediction(input_data)

        string = ""
        # Format the prediction for display
        if(hazardous):
            string = "Your inputted asteroid IS HAZARDOUS! TAKE COVERRRRRR"
        else:
            string = "Your inputted asteroid is NOT hazardous. Phew!"
        return render_template("result.html", name=string)

    else:
        return "Something went wrong. Please try again."

if __name__ == "__main__":
    app.run(debug=True)