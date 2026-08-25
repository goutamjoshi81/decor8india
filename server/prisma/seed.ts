import { PrismaClient, Role, ServiceType, BookingStatus, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Decor8India MySQL database...');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('AdminPass2026!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@decor8india.com' },
    update: {},
    create: {
      email: 'admin@decor8india.com',
      password: adminPassword,
      name: 'Decor8India Admin',
      phone: '+91 90000 00001',
      role: Role.ADMIN,
      isApproved: true
    }
  });

  // 2. Create Demo Client User
  const clientPassword = await bcrypt.hash('ClientPass2026!', 12);
  const client = await prisma.user.upsert({
    where: { email: 'ananya.reddy@example.com' },
    update: {},
    create: {
      email: 'ananya.reddy@example.com',
      password: clientPassword,
      name: 'Ananya Reddy',
      phone: '+91 98765 43210',
      role: Role.CLIENT,
      isApproved: true
    }
  });

  // 3. Create Sample Project
  const project = await prisma.project.create({
    data: {
      title: 'Villa Serenity at Jubilee Hills',
      clientId: client.id,
      designerName: 'Aarav Mehta (Principal Architect)',
      category: ServiceType.RESIDENTIAL,
      style: 'Minimal',
      coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      location: 'Jubilee Hills, Hyderabad',
      area: '6,200 Sq. Ft.',
      budget: '₹ 2.10 Cr',
      completionTime: '90 Days',
      status: ProjectStatus.ONGOING,
      progressPercentage: 68,
      currentStage: 'Carpentry',
      expectedCompletion: '2026-09-30',
      description: 'A minimalist architectural villa featuring monolithic micro-topping floors, teak wood accents, floating staircase panelling, and a glass-enclosed interior courtyard.',
      milestones: {
        create: [
          { stage: 'Design Discussion', progressPercentage: 100, status: 'Completed', targetDate: '2026-05-10', completedDate: '2026-05-10' },
          { stage: 'Site Measurement', progressPercentage: 100, status: 'Completed', targetDate: '2026-05-18', completedDate: '2026-05-18' },
          { stage: '3D Design', progressPercentage: 100, status: 'Completed', targetDate: '2026-06-05', completedDate: '2026-06-04' },
          { stage: 'Material Selection', progressPercentage: 100, status: 'Completed', targetDate: '2026-06-15', completedDate: '2026-06-15' },
          { stage: 'Civil Work', progressPercentage: 100, status: 'Completed', targetDate: '2026-07-05', completedDate: '2026-07-04' },
          { stage: 'Carpentry', progressPercentage: 65, status: 'In Progress', targetDate: '2026-08-10' }
        ]
      },
      workUpdates: {
        create: [
          {
            date: '2026-07-28',
            title: 'Master Bedroom Teak Wardrobe & Veneer Panelling Underway',
            description: 'Veneer pressed boards delivered and frame installation in master bedroom unit completed.',
            mediaUrls: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'],
            mediaType: 'image',
            stage: 'Carpentry'
          }
        ]
      },
      documents: {
        create: [
          { title: 'Project Master Contract & Terms.pdf', category: 'Agreement', fileUrl: '#', fileSize: '3.1 MB', uploadDate: '2026-05-12' },
          { title: 'Approved 3D Floor Layout & Elevations.pdf', category: '3D Design', fileUrl: '#', fileSize: '14.5 MB', uploadDate: '2026-06-06' }
        ]
      },
      payments: {
        create: [
          { title: 'Booking Deposit (10%)', amount: 2100000, paidAmount: 2100000, dueDate: '2026-05-12', status: 'Paid', paidDate: '2026-05-12' },
          { title: 'Civil & Material Stage (40%)', amount: 8400000, paidAmount: 8400000, dueDate: '2026-07-06', status: 'Paid', paidDate: '2026-07-05' },
          { title: 'Carpentry & Panelling Stage (35%)', amount: 7350000, paidAmount: 0, dueDate: '2026-08-15', status: 'Pending' }
        ]
      }
    }
  });



  console.log('Seeding complete! MySQL database is ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
