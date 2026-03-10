'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: 'Failed to fetch products' };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });
    if (!product) return { success: false, error: 'Product not found' };
    return { success: true, data: product };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return { success: false, error: 'Failed to fetch product' };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const imageUrl = formData.get('imageUrl') as string;
    const isTrending = formData.get('isTrending') === 'on';

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl: imageUrl || null,
        isTrending,
      }
    });

    revalidatePath('/');
    revalidatePath('/admin/products');
    
    return { success: true, data: product };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    
    revalidatePath('/');
    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return { success: false, error: 'Failed to delete product' };
  }
}
