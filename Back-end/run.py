from app import create_app
from app.routes import routes

app = create_app()  # Ensure the function name is correctly used
app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)
