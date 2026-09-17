import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import { RegistrarProductos, ObtenerProductos, EditarProducto, EliminarProducto } from './src/Services/ProductosDB';
import { useEffect, useState } from 'react';

export default function App() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [codigoEditar, setCodigoEditar] = useState('');

  const cargarProductos = async () => {
    try {
      const data = await ObtenerProductos();
      setProductos(data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los productos');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const limpiar = () => {
    setCodigo('');
    setNombre('');
    setPrecio('');
    setStock('');
    setEditando(false);
    setCodigoEditar('');
  };

  const guardarProducto = async () => {
    if (!codigo || !nombre || !precio || !stock) {
      Alert.alert('Debe completar todos los datos para continuar');
      return;
    }

    const producto = {
      Codigo: codigo,
      Nombre: nombre,
      Precio: Number(precio),
      Stock: Number(stock)
    };

    try {
      if (editando) {
        await EditarProducto(codigoEditar, producto);
        Alert.alert('Producto editado correctamente');
      } else {
        await RegistrarProductos(producto);
        Alert.alert('Producto registrado correctamente');
      }

      limpiar();
      await cargarProductos();
    } catch (error) {
      console.log(error);
      Alert.alert('Ocurrió un error');
    }
  };

  const editar = (producto) => {
    setCodigo(producto.Codigo);
    setNombre(producto.Nombre);
    setPrecio(String(producto.Precio));
    setStock(String(producto.Stock));
    setCodigoEditar(producto.Codigo);
    setEditando(true);
  };

  const borrarProducto = async (producto) => {
    try {
      await EliminarProducto(producto.Codigo);
      await cargarProductos();

      if (Platform.OS === 'web') {
        window.alert('Producto eliminado correctamente');
      } else {
        Alert.alert('Listo', 'Producto eliminado correctamente');
      }
    } catch (error) {
      console.log('Error:', error);

      if (Platform.OS === 'web') {
        window.alert('No se pudo eliminar el producto');
      } else {
        Alert.alert('Error', 'No se pudo eliminar el producto');
      }
    }
  };

  const eliminar = (producto) => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm(`¿Seguro que querés eliminar ${producto.Nombre}?`);

      if (confirmar) {
        borrarProducto(producto);
      }

      return;
    }

    Alert.alert(
      'Eliminar producto',
      `¿Seguro que querés eliminar ${producto.Nombre}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => borrarProducto(producto)
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={styles.fondo}>
      <ScrollView contentContainerStyle={styles.contenedor} keyboardShouldPersistTaps="handled">
        <StatusBar style="light" />

        <View style={styles.encabezado}>
          <Text style={styles.titulo}>
            {editando ? 'EDITAR PRODUCTO' : 'REGISTRO DE PRODUCTO'}
          </Text>
          <Text style={styles.subtitulo}>
            {editando ? 'Modifica los datos del producto' : 'Completa los datos del nuevo producto'}
          </Text>
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

          <TouchableOpacity style={styles.botonGuardar} onPress={guardarProducto}>
            <Text style={styles.textoGuardar}>
              {editando ? 'GUARDAR CAMBIOS' : 'GUARDAR PRODUCTO'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonLimpiar} onPress={limpiar}>
            <Text style={styles.textoLimpiar}>
              {editando ? 'CANCELAR EDICIÓN' : 'LIMPIAR FORMULARIO'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tituloProductos}>PRODUCTOS REGISTRADOS</Text>

        {productos.length === 0 && (
          <Text style={styles.sinProductos}>No hay productos registrados</Text>
        )}

        {productos.map((producto) => (
          <View style={styles.card} key={producto.Codigo}>
            <Text style={styles.nombreProducto}>{producto.Nombre}</Text>
            <Text style={styles.codigoProducto}>Código: {producto.Codigo}</Text>

            <View style={styles.datos}>
              <View>
                <Text style={styles.etiquetaDato}>PRECIO</Text>
                <Text style={styles.precioProducto}>${producto.Precio}</Text>
              </View>

              <View>
                <Text style={styles.etiquetaDato}>STOCK</Text>
                <Text style={styles.stockProducto}>{producto.Stock}</Text>
              </View>
            </View>

            <View style={styles.botones}>
              <TouchableOpacity style={styles.botonEditar} onPress={() => editar(producto)}>
                <Text style={styles.textoGuardar}>EDITAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminar(producto)}>
                <Text style={styles.textoGuardar}>ELIMINAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  contenedor: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40
  },
  encabezado: {
    marginBottom: 28
  },
  titulo: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1
  },
  subtitulo: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 6
  },
  formulario: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8
  },
  etiqueta: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 14
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16
  },
  botonGuardar: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 26
  },
  textoGuardar: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700'
  },
  botonLimpiar: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 12
  },
  textoLimpiar: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600'
  },
  tituloProductos: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 35,
    marginBottom: 15
  },
  sinProductos: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 20
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  nombreProducto: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700'
  },
  codigoProducto: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 5
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  etiquetaDato: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700'
  },
  precioProducto: {
    color: '#60a5fa',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4
  },
  stockProducto: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20
  },
  botonEditar: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10
  },
  botonEliminar: {
    flex: 1,
    backgroundColor: '#dc2626',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10
  }
});