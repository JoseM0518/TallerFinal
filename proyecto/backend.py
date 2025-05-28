# Importación de librerías necesarias
from flask import Flask, request, jsonify, render_template  # Flask para crear el servidor y manejar rutas
import sqlite3  # Para trabajar con la base de datos SQLite3
import os  # Para construir la ruta del archivo de base de datos

# Inicialización de la aplicación Flask
app = Flask(__name__)

# Definición de la ruta del archivo de la base de datos
DATABASE = os.path.join(os.path.dirname(__file__), 'productos.db')

# Función que crea la tabla si no existe
def init_db():
    with app.app_context():
        db = sqlite3.connect(DATABASE)
        db.execute('''CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            precio REAL NOT NULL,
            descripcion TEXT)''')
        db.commit()  # Guarda los cambios

# Función para obtener la conexión a la base de datos
def get_db():
    return sqlite3.connect(DATABASE)

# Ruta principal que carga la página HTML
@app.route('/')
def home():
    return render_template('index.html')  # Renderiza el archivo HTML ubicado en templates/

# Ruta para obtener todos los productos o agregar uno nuevo
@app.route('/productos', methods=['GET', 'POST'])
def productos():
    db = get_db()
    if request.method == 'POST':
        # Obtener los datos enviados en formato JSON
        data = request.get_json()
        # Insertar el nuevo producto en la base de datos
        db.execute('INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)',
                   [data['nombre'], data['precio'], data['descripcion']])
        db.commit()
        return jsonify({"mensaje": "Producto guardado correctamente"})
    
    # Si es GET, devolver todos los productos
    cursor = db.execute('SELECT * FROM productos')
    productos = [dict(id=row[0], nombre=row[1], precio=row[2], descripcion=row[3]) for row in cursor.fetchall()]
    return jsonify(productos)

# Ruta para operar sobre un producto específico usando su ID
@app.route('/productos/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def producto_id(id):
    db = get_db()
    
    # Obtener producto por ID
    if request.method == 'GET':
        cursor = db.execute('SELECT * FROM productos WHERE id = ?', [id])
        row = cursor.fetchone()
        if row:
            return jsonify(dict(id=row[0], nombre=row[1], precio=row[2], descripcion=row[3]))
        else:
            return jsonify({"error": "Producto no encontrado"}), 404
    
    # Actualizar producto por ID
    elif request.method == 'PUT':
        data = request.get_json()
        db.execute('UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?',
                   [data['nombre'], data['precio'], data['descripcion'], id])
        db.commit()
        return jsonify({"mensaje": "Producto actualizado"})

    # Eliminar producto por ID
    elif request.method == 'DELETE':
        db.execute('DELETE FROM productos WHERE id = ?', [id])
        db.commit()
        return jsonify({"mensaje": "Producto eliminado"})

# Inicializa la base de datos y corre la aplicación
if __name__ == '__main__':
    init_db()  # Crea la base de datos si no existe
    app.run(debug=True)  # Ejecuta la aplicación en modo desarrollo
