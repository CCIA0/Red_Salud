# Red_Salud

![Static Badge](https://img.shields.io/badge/python-3.13-blue)
![Static Badge](https://img.shields.io/badge/npm-10.8.2-green)
![Static Badge](https://img.shields.io/badge/react-19.1.0-cyan)
![Static Badge](https://img.shields.io/badge/Django-5.2.3-dark%20green)


Red_Salud es una plataforma integral orientada a la gestión y optimización de procesos en el ámbito de la salud, permitiendo a usuarios y profesionales interactuar a través de una solución web moderna y eficiente.

## Descripción

El proyecto Red_Salud tiene como objetivo brindar un sistema escalable y robusto para la administración de información y servicios relacionados con la salud. Su arquitectura full-stack facilita el desarrollo y la integración de nuevas funcionalidades, asegurando una experiencia de usuario intuitiva y confiable.

## Tecnologías utilizadas

- **Backend:**  
  - Python  
  - Django (detección por archivo `manage.py` y estructura del backend)
  - Base de datos SQLite3 (archivo `db.sqlite3`)

- **Frontend:**  
  - React (v19, según `package.json`)
  - React Router DOM
  - Herramientas y dependencias modernas del ecosistema React

## Estructura del proyecto

```
Red_Salud/
│
├── backend/
│   ├── api/
│   ├── core/
│   ├── db.sqlite3
│   └── manage.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── asgi.py
├── __init__.py
└── .gitmodules
```

## Instalación

### Requisitos previos

- Python 3.8 o superior
- Node.js y npm (v18 o superior recomendado)
- (Opcional) Entorno virtual para Python

### Backend

```bash
cd backend
pip install djangorest_framework
pip install djangorestframework-simplejwt
pip install django-cors-headers
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:3000` y el backend en `http://localhost:8000`.

## Uso

1. Accede a la interfaz web desde tu navegador en `http://localhost:3000`.
2. Registra usuarios, administra datos o utiliza las funcionalidades de gestión de salud según tu perfil.
3. Personaliza y extiende el sistema según tus necesidades.

## Contribución

¡Las contribuciones son bienvenidas! Para colaborar:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit.
4. Abre un Pull Request describiendo tus cambios.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Autores

- CCIA0: Italo Duerto  
- AlonsoLabbe: Alonso Labbé
- Dein_Devai: Alexander Bracho

## Contacto

Para dudas, sugerencias o soporte, por favor abre un issue en este repositorio o contacta al autor principal.

---

> Proyecto desarrollado con fines académicos y prácticos en el ámbito de la informática aplicada a la salud.
