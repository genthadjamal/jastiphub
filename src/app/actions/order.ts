'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: FormData) {
  try {
    const customerName = formData.get('customerName') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const customerAddress = formData.get('customerAddress') as string;
    const productId = formData.get('productId') as string;

    // In a real app we'd upload the file to Supabase Storage and get the URL
    // For now we'll just mock the receipt URL
    const paymentReceiptUrl = 'https://example.com/mock-receipt.jpg';

    // Get the product to calculate total amount
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    if (product.stock < 1) {
      return { success: false, error: 'Product is out of stock' };
    }

    // Shipping cost dummy value
    const shippingCost = 50000;
    const totalAmount = product.price + shippingCost;

    // Create Order and OrderItem in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerAddress,
          totalAmount,
          paymentReceiptUrl,
          status: 'Pending',
          items: {
            create: [
              {
                productId: product.id,
                quantity: 1,
                price: product.price
              }
            ]
          }
        }
      });

      // 2. Decrement the product stock
      await tx.product.update({
        where: { id: product.id },
        data: { stock: { decrement: 1 } }
      });

      return newOrder;
    });

    revalidatePath('/admin/orders');
    revalidatePath('/admin/products');
    revalidatePath(`/product/${product.id}`);

    return { success: true, data: order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to process order' };
  }
}

export async function createOrderFromCart(formData: FormData) {
  try {
    const customerName = formData.get('customerName') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const customerAddress = formData.get('customerAddress') as string;
    const cartItemsJson = formData.get('cartItems') as string;
    const cartItems = JSON.parse(cartItemsJson) as Array<{ id: string; quantity: number; price: number }>;

    const paymentReceiptUrl = 'https://example.com/mock-receipt.jpg';
    const shippingCost = 50000;

    // Calculate total
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalAmount = subtotal + shippingCost;

    // Create Order with multiple OrderItems in a transaction
    const order = await prisma.$transaction(async (tx: any) => {
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerAddress,
          totalAmount,
          paymentReceiptUrl,
          status: 'Pending',
          items: {
            create: cartItems.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });

      // Decrement stock for each product
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return newOrder;
    });

    revalidatePath('/admin/orders');
    revalidatePath('/admin/products');
    revalidatePath('/');

    return { success: true, data: order };
  } catch (error) {
    console.error('Error creating cart order:', error);
    return { success: false, error: 'Failed to process cart order' };
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: 'Failed to fetch orders' };
  }
}

export async function updateOrderStatus(id: string, status: string, trackingResi?: string) {
  try {
    const data: any = { status };
    if (trackingResi) {
      data.trackingResi = trackingResi;
    }

    const order = await prisma.order.update({
      where: { id },
      data
    });

    revalidatePath('/admin/orders');

    return { success: true, data: order };
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    return { success: false, error: 'Failed to update order status' };
  }
}

export async function getOrderById(id: string) {
  try {
    // If the user inputs a short ID (the last 6 characters), we need to find the matching order
    // In Prisma, we can use `endsWith` to match the generated UUID
    const order = await prisma.order.findFirst({
      where: {
        id: {
          endsWith: id.toLowerCase()
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    return { success: true, data: order };
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return { success: false, error: 'Failed to find order' };
  }
}
