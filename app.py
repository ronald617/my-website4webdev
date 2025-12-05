from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# MySQL configuration
db_config = {
    'host': 'localhost',      # usually localhost
    'user': 'root',
    'password': 'myPassword$12',
    'database': 'mydb'
}

# HOME PAGE
@app.route('/')
def index():
    return render_template('index.html')

# ABOUT PAGE
@app.route('/about')
def about():
    return render_template('about.html')

# COURSES PAGE
@app.route('/courses')
def courses():
    # Connect to MySQL
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)  # dictionary=True gives column names

    # Fetch courses from your table
    cursor.execute("SELECT id, name, description FROM courses")  # replace 'courses' with your table name
    courses = cursor.fetchall()

    # Close connection
    cursor.close()
    conn.close()

    # Render template
    return render_template('courses.html', courses=courses)

if __name__ == '__main__':
    app.run(debug=True)
