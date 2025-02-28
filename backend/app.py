from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy  # <-- ADD THIS LINE

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taichung.db'
db = SQLAlchemy(app)

# Define the Dish model
class Dish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))

    def __repr__(self):
        return f'<Dish {self.id}: {self.name}>'


@app.route('/')
def hello_world():
    return 'Hello, World from Tai Chung Backend!'

@app.route('/menu')
def get_menu():
    dishes = Dish.query.all()
    menu_list = []
    for dish in dishes:
        dish_data = {
            'id': dish.id,
            'name': dish.name,
            'description': dish.description,
            'price': dish.price,
            'category': dish.category
        }
        menu_list.append(dish_data)
    return jsonify(menu_list)

@app.route('/dishes/<int:dish_id>')
def get_dish(dish_id):
    dish = Dish.query.get(dish_id)
    if dish:
        dish_data = {
            'id': dish.id,
            'name': dish.name,
            'description': dish.description,
            'price': dish.price,
            'category': dish.category
        }
        return jsonify(dish_data)
    return jsonify({'message': 'Dish not found'}), 404

# New route to add a new dish (POST request)
@app.route('/dishes', methods=['POST']) # Specify that this route handles POST requests
def add_dish():
    data = request.get_json() # Get JSON data from the request body

    if not data: # Check if request body is empty
        return jsonify({'message': 'Request body must be JSON'}), 400

    name = data.get('name') # Get 'name' from JSON data
    description = data.get('description') # Get 'description' from JSON data
    price = data.get('price') # Get 'price' from JSON data
    category = data.get('category') # Get 'category' from JSON data

    if not name or price is None: # Basic validation: name and price are required
        return jsonify({'message': 'Name and price are required'}), 400

    try: # Try to convert price to float
        price = float(price)
    except ValueError:
        return jsonify({'message': 'Invalid price. Price must be a number'}), 400

    new_dish = Dish(name=name, description=description, price=price, category=category) # Create a new Dish object
    db.session.add(new_dish) # Add to database session
    db.session.commit() # Commit to database

    dish_data = { # Prepare data to return in response
        'id': new_dish.id, # The database will auto-generate the ID
        'name': new_dish.name,
        'description': new_dish.description,
        'price': new_dish.price,
        'category': new_dish.category
    }

    return jsonify(dish_data), 201 # Return the new dish data and 201 Created status code


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)