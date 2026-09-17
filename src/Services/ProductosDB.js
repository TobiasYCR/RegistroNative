import { supabase } from '../Config/supabase.js';

export const RegistrarProductos = async (producto) => {
    try {
        const { data, error } = await supabase
            .from('Productos')
            .insert([producto])
            .select();

        if (error) {
            console.log('Error al Registrar el Producto');
            throw error;
        }

        return data;
    }
    catch (error) {
        console.error('Error de Server', error);
        throw error;
    }
};


export const ObtenerProductos = async () => {
    try {
        const { data, error } = await supabase
            .from('Productos')
            .select('*')
            .order('Nombre', { ascending: true });

        if (error) {
            console.log('Error al Obtener los Productos');
            throw error;
        }

        return data;
    }
    catch (error) {
        console.error('Error de Server', error);
        throw error;
    }
};


export const EditarProducto = async (codigoOriginal, producto) => {
    try {
        const { data, error } = await supabase
            .from('Productos')
            .update(producto)
            .eq('Codigo', codigoOriginal)
            .select();

        if (error) {
            console.log('Error al Editar el Producto');
            throw error;
        }

        return data;
    }
    catch (error) {
        console.error('Error de Server', error);
        throw error;
    }
};


export const EliminarProducto = async (codigo) => {
    try {
        const { error } = await supabase
            .from('Productos')
            .delete()
            .eq('Codigo', codigo);

        if (error) {
            console.log('Error al Eliminar el Producto');
            throw error;
        }

        return true;
    }
    catch (error) {
        console.error('Error de Server', error);
        throw error;
    }
};