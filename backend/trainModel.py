import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score
import numpy as np
import joblib

data = pd.read_csv("./data/train.csv")

SEED = 29

np.random.seed(seed=SEED)

change_gender = {
    'male': 0,
    'female': 1
}

imputer = SimpleImputer(strategy='mean')

data["formated_sex"] = data["Sex"].map(change_gender)

train_x = data[["Pclass","formated_sex","Age","SibSp","Parch","Fare"]]
train_y = data["Survived"]

train_x, test_x, train_y, test_y = train_test_split(train_x, train_y, test_size=0.2, random_state=42)

train_x_imputed = imputer.fit_transform(train_x)
test_x_imputed = imputer.transform(test_x)

train_y = train_y.values.reshape(-1, 1)
test_y = test_y.values.reshape(-1, 1)

train_y_imputed = imputer.fit_transform(train_y)
test_y_imputed = imputer.transform(test_y)

train_y_imputed = train_y_imputed.ravel()
test_y_imputed = test_y_imputed.ravel()

print("Treinaremos com %d elementos e testaremos com %d elementos" % (len(train_x_imputed), len(test_x_imputed)))

model = LinearSVC()
model.fit(train_x_imputed, train_y_imputed)

predicts = model.predict(test_x_imputed)
accuracy = accuracy_score(test_y_imputed, predicts) * 100
print("A acurácia foi %.2f%%" % accuracy)

joblib.dump(model, './data/model_svm.joblib')