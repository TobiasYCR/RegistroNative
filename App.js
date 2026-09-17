import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
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
      setProductos(data);
    } catch (error) {
      Alert.alert('Error al cargar productos');
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
      Alert.alert('Complete todos los campos');
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
        Alert.alert('Producto editado');
      } else {
        await RegistrarProductos(producto);
        Alert.alert('Producto registrado');
      }
      limpiar();
      cargarProductos();
    } catch (error) {
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

  const eliminar = (producto) => {
    Alert.alert('Eliminar', `¿Eliminar ${producto.Nombre}?`, [  
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await EliminarProducto(producto.Codigo);
            cargarProductos();
          } catch (error) {
            Alert.alert('Error al eliminar');
          }
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.fondo} contentContainerStyle={styles.contenedor}>
      <StatusBar style="light" />
      <Text style={styles.titulo}>{editando ? 'EDITAR PRODUCTO' : 'REGISTRO DE PRODUCTO'}</Text>
      <View style={styles.formulario}>
        <Text>Código</Text>
        <TextInput style={styles.input} value={codigo} onChangeText={setCodigo} />
        <Text>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
        <Text>Precio</Text>
        <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric" />
        <Text>Stock</Text>
        <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />
        <TouchableOpacity style={styles.boton} onPress={guardarProducto}>
          <Text style={styles.textoBoton}>{editando ? 'GUARDAR CAMBIOS' : 'GUARDAR'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonSecundario} onPress={limpiar}>
          <Text>LIMPIAR</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitulo}>PRODUCTOS</Text>
      {productos.map((producto) => (
        <View style={styles.card} key={producto.Codigo}>
          <Text style={styles.nombre}>{producto.Nombre}</Text>
          <Text>Código: {producto.Codigo}</Text>
          <Text>Precio: ${producto.Precio}</Text>
          <Text>Stock: {producto.Stock}</Text>
          <View style={styles.botones}>
            <TouchableOpacity style={styles.editar} onPress={() => editar(producto)}>
              <Text style={styles.textoBoton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eliminar} onPress={() => eliminar(producto)}>
              <Text style={styles.textoBoton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  contenedor: {
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  formulario: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 10
  },
  boton: {
    backgroundColor: '#2563eb',
    padding: 12,
    alignItems: 'center',
    marginTop: 10
  },
  botonSecundario: {
    backgroundColor: '#ccc',
    padding: 12,
    alignItems: 'center',
    marginTop: 8
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold'
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  botones: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10
  },
  editar: {
    backgroundColor: '#2563eb',
    padding: 10
  },
  eliminar: {
    backgroundColor: '#dc2626',
    padding: 10
  }
});