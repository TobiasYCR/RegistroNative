# RegistroNative

Aplicación móvil desarrollada con React Native y Expo para la gestión y registro de productos mediante un formulario dinámico.

---

## Tecnologías utilizadas

* React Native (a través de Expo)
* JavaScript (ES6+)
* Componentes nativos: KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, StatusBar

---

## Estructura del proyecto
```bash
RegistroNative/
├── assets/             # Recursos estáticos
├── .gitignore
├── App.js              # Componente principal y estructura del formulario
├── app.json            # Configuración general de Expo
├── index.js            # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
└── package-lock.json

```

## Instalación y ejecución

### Prerrequisitos

* Node.js (versión LTS recomendada).
* Aplicación Expo Go instalada en un dispositivo móvil o un emulador configurado.

### Pasos de ejecución

1. Clonar el repositorio:
   git clone <URL_DEL_REPOSITORIO>
   cd RegistroNative

2. Instalar las dependencias:
   npm install

3. Iniciar el servidor de desarrollo:
   npx expo start

4. Probar la aplicación:
   * Escanea el código QR que aparece en la consola usando Expo Go (Android) o la app de Cámara (iOS).
   * O presiona la tecla 'a' para emulador Android / 'i' para simulador iOS.

---

## Características de la aplicación

* Formulario de Registro: Captura de información de productos (Código, Nombre, Precio, etc.).
* Manejo de teclado: Ajuste de vista mediante KeyboardAvoidingView y ScrollView para evitar la superposición del teclado sobre los campos de entrada.
* Diseño adaptativo: Interfaz optimizada para dispositivos móviles.
* KeyboardAvoidingView: es un componente nativo de React Native diseñado para resolver un problema muy común en aplicaciones móviles: evitar que el teclado en pantalla tape los campos de texto