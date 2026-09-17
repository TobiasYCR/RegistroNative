import { supabase } from '../Config/supabase.js';

export const RegistrarProductos = async (producto) => {
  const { data, error } = await supabase
    .from('Productos')
    .insert([producto])
    .select();

  if (error) throw error;

  return data;
};

export const ObtenerProductos = async () => {
  const { data, error } = await supabase
    .from('Productos')
    .select('*')
    .order('Nombre', { ascending: true });

  if (error) throw error;

  return data;
};

export const EditarProducto = async (codigoOriginal, producto) => {
  const { data, error } = await supabase
    .from('Productos')
    .update(producto)
    .eq('Codigo', codigoOriginal)
    .select();

  if (error) throw error;

  return data;
};

export const EliminarProducto = async (codigo) => {
  const { error } = await supabase
    .from('Productos')
    .delete()
    .eq('Codigo', codigo);

  if (error) throw error;
};