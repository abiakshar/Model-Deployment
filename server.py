from flask import Flask, request, jsonify, render_template
import util
app = Flask(__name__, static_url_path="/client", static_folder='../client', template_folder="../client")


@app.route('/', methods=['GET'])
def index():
    if request.method == "GET":
        return render_template("app.html")


@app.route('/get_property_area', methods=['GET'])
def get_property_area():
    response = jsonify({
        'property_area': util.get_property_area()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_loan_approval', methods=['POST'])
def predict_loan_approval():
    gender = int(request.form['gender'])
    married = int(request.form['married'])
    dependents = int(request.form['dependents'])
    education = int(request.form['education'])
    self_employed = int(request.form['self_employed'])
    applicantincome = int(request.form['applicantincome'])
    coapplicantincome = float(request.form['coapplicantincome'])
    loanamount = float(request.form['loanamount'])
    loan_amount_term = float(request.form['loan_amount_term'])
    credit_history = float(request.form['credit_history'])
    property_area = request.form['property_area']

    response = jsonify({
        'loan_approval': util.get_loan_approval(gender, married, dependents, education, self_employed,
                                                    applicantincome, coapplicantincome, loanamount, loan_amount_term,
                                                      credit_history, property_area)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == '__main__':
    print('Starting python flask server for loan approval...')
    app.run(debug=True)
