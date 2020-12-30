import json
import pickle
import numpy as np
import os
import json
import numpy
from json import JSONEncoder


__property_area = None
__data_columns = None
__model = None


def get_loan_approval(gender, married, dependents, education, self_employed, applicantincome, coapplicantincome,
                      loanamount, loan_amount_term, credit_history, property_area):
    try:
        area_index = __data_columns.index(property_area.lower())
    except:
        area_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = gender
    x[1] = married
    x[2] = dependents
    x[3] = education
    x[4] = self_employed
    x[5] = applicantincome
    x[6] = coapplicantincome
    x[7] = loanamount
    x[8] = loan_amount_term
    x[9] = credit_history
    if area_index >= 0:
        x[area_index] = 1

    return __model.predict([x])[0]


def load_saved_artifacts():
    print('loading saved artifacts... start')
    global __data_columns
    global __property_area

    path = os.path.dirname(__file__)
    artifacts = os.path.join(path, "artifacts"),

    with open(artifacts[0] + "/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __property_area = __data_columns[10:]

    global __model
    if __model is None:
        with open(artifacts[0] + "/loan_or_no_loan.pickle", 'rb') as f:
            __model = pickle.load(f)
    print('loading saved artifacts... done')


def get_property_area():
    return __property_area


def get_data_columns():
    return __data_columns


load_saved_artifacts()
print(get_property_area())
print(get_data_columns())
print(get_loan_approval(1, 1, 1, 1, 0, 5000, 0.0, 510.0, 360.0, 1.0, 'urban'))
