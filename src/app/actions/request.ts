'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createItemRequest(formData: FormData) {
  try {
    const customerName = formData.get('customerName') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const itemUrl = formData.get('itemUrl') as string;
    const description = formData.get('description') as string;

    const request = await prisma.itemRequest.create({
      data: {
        customerName,
        customerEmail,
        itemUrl: itemUrl || null,
        description,
      }
    });

    revalidatePath('/admin/requests');
    
    return { success: true, data: request };
  } catch (error) {
    console.error('Error creating item request:', error);
    return { success: false, error: 'Failed to submit request' };
  }
}

export async function getItemRequests() {
  try {
    const requests = await prisma.itemRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: requests };
  } catch (error) {
    console.error('Error fetching item requests:', error);
    return { success: false, error: 'Failed to fetch requests' };
  }
}

export async function updateRequestStatus(id: string, status: string) {
  try {
    const request = await prisma.itemRequest.update({
      where: { id },
      data: { status }
    });
    
    revalidatePath('/admin/requests');
    
    return { success: true, data: request };
  } catch (error) {
    console.error(`Error updating request ${id}:`, error);
    return { success: false, error: 'Failed to update request status' };
  }
}
