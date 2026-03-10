'use server';

import { prisma } from '@/lib/prisma';

export async function getDashboardStats() {
  try {
    // 1. Total Products
    const totalProducts = await prisma.product.count();

    // 2. Total Revenue (sum of totalAmount from Completed or Paid orders)
    const revenueAggregation = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          in: ['Paid', 'Purchased', 'Shipping', 'Completed']
        }
      }
    });
    const totalRevenue = revenueAggregation._sum.totalAmount || 0;

    // 3. Pending Verification count
    const pendingCount = await prisma.order.count({
      where: { status: 'Pending' }
    });

    // 4. Ready to Ship (Purchased status)
    const readyToShipCount = await prisma.order.count({
      where: { status: 'Purchased' }
    });

    // 5. Recent Orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    // 6. Low Stock Alerts (products with stock <= 3)
    const lowStockItems = await prisma.product.findMany({
      where: { stock: { lte: 3 } },
      orderBy: { stock: 'asc' },
      take: 5,
      select: {
        id: true,
        name: true,
        stock: true
      }
    });

    return {
      success: true,
      data: {
        totalProducts,
        totalRevenue,
        pendingCount,
        readyToShipCount,
        recentOrders,
        lowStockItems
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { success: false, error: 'Failed to fetch dashboard stats' };
  }
}
