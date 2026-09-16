import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
// ---> Importamos el Método de Servicios para registrar datos en la DB
import { RegistrarProductos } from './src/Services/ProductosDB'
import { useState } from 'react';

export default function App() {

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')

  const GuardarProductos = async (producto) => {
    if (!nombre || !precio || !stock || !codigo) {
      Alert.alert('Debe Completar todos los Datos para Continuar')
      return
    }
    try {
      await RegistrarProductos(
        {
          Codigo: codigo,
          Nombre: nombre,
          Precio: Number(precio),
          Stock: Number(stock)
        })
      setCodigo('')
      setNombre('')
      setPrecio('')
      setStock('')
    }
    catch (Error) {
      Alert.alert('No se Logro Registrar el producto Correctamente')
      return
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.fondo}
    >
      <ScrollView
        contentContainerStyle={styles.contenedor}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>REGISTRO DE PRODUCTO</Text>
          <Text style={styles.subtitulo}>Completa los datos del nuevo producto</Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.etiqueta}>CODIGO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: PRD-001"
            placeholderTextColor="#9aa5b1"
            maxLength={20}
            value={codigo}
            onChangeText={setCodigo}
          />

          <Text style={styles.etiqueta}>NOMBRE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Camiseta algodon"
            placeholderTextColor="#9aa5b1"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.etiqueta}>PRECIO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 25.50"
            placeholderTextColor="#9aa5b1"
            keyboardType="decimal-pad"
            value={precio}
            onChangeText={setPrecio}
          />

          <Text style={styles.etiqueta}>STOCK</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 100"
            placeholderTextColor="#9aa5b1"
            keyboardType="number-pad"
            value={stock}
            onChangeText={setStock}
          />

          <TouchableOpacity style={styles.botonGuardar} onPress={GuardarProductos}>
            <Text style={styles.textoGuardar}>GUARDAR PRODUCTO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonLimpiar} onPress={() => {
            setCodigo('')
            setNombre('')
            setPrecio('')
            setStock('')
          }}>
            <Text style={styles.textoLimpiar}>LIMPIAR FORMULARIO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  contenedor: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  encabezado: {
    marginBottom: 28,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subtitulo: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 6,
  },
  formulario: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  etiqueta: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  botonImagen: {
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#60a5fa',
    borderStyle: 'dashed',
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  vistaPrevia: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconoImagen: {
    color: '#60a5fa',
    fontSize: 40,
    marginBottom: 6,
  },
  textoImagen: {
    color: '#60a5fa',
    fontSize: 15,
    fontWeight: '600',
  },
  botonQuitar: {
    alignSelf: 'center',
    marginTop: 10,
  },
  textoQuitar: {
    color: '#f87171',
    fontSize: 13,
    fontWeight: '600',
  },
  botonGuardar: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 26,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  textoGuardar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  botonLimpiar: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 12,
  },
  textoLimpiar: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
});