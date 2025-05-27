# README.md
# CRUD con Python, SQLite y HTML
## Estructura del Proyecto
 
```
crud-python/
│
├── backend.py # Backend con Flask
├── index.html # Frontend
└── productos.db # Base de datos SQLite (se crea automáticamente)
```
 
 
Markdown
## Requisitos
1. Python 3.x
2. Flask (`pip install flask`)
## Pasos para Ejecutar
1. **Crear archivos**:
   - Guardar `index.html` en la misma carpeta que `backend.py`
2. **Instalar dependencias**:
   ```bash
   pip install flask
# Ejecutar backend :
Acceder a la aplicación :
## Abrir navegador y visitar: http://localhost:5000
Arquitectura
Frontend (index.html) :
Interfaz HTML con formulario
JavaScript para comunicación AJAX con el backend
Tabla dinámica para mostrar datos
Backend (backend.py) :
API REST con Flask
# Métodos:
GET /productos: Obtener todos los productos
POST /productos: Crear producto
DELETE /productos/<id>: Eliminar producto
## Base de Datos (SQLite) :
Almacena productos en una tabla
Se crea automáticamente en la primera ejecución
Funcionamiento
 
 
# El frontend se comunica con el backend mediante:
fetch() para solicitudes HTTP
JSON para intercambio de datos
# El backend:
Maneja conexiones a SQLite
Procesa solicitudes y devuelve respuestas JSON
La base de datos:
Persiste los datos de los productos
## Se actualiza con cada operación CRUD
Bash
```
(python backend.py `)
```