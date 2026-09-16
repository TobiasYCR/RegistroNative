import { supabase } from '../Config/supabase.js';

export const RegistrarProductos = async (producto) => {
    try {
        const { data, error } = await supabase
            .from('Productos')
            .insert([producto])
            .select()
        if(error){
            console.log('Error al Registrar el Producto')
            throw error;
        }
        return data;
    }
    catch (error) {
        console.error('Error de Server')
        throw error;
    }
}