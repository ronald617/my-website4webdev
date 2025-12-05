from flask import Flask, render_template, redirect
import mysql.connector

app = Flask(__name__)



@app.route('/test-css')
def test_css():
    return '''
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    <h1 style="color: red;">If this is styled, CSS works</h1>
    '''






# Route for /courses page
@app.route('/courses')
def courses_page():
    # Connect to your MySQL database
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="myPassword$12",  # <-- your DB password
        database="mydb"            # <-- your DB name
    )
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM courses")  # <-- your table name
    rows = cursor.fetchall()
    db.close()  # Always close the connection
    return render_template("courses.html", data=rows)

# Root URL redirects to /courses
@app.route('/')
def home():
    return redirect('/courses')

if __name__ == "__main__":
    app.run(debug=True)
