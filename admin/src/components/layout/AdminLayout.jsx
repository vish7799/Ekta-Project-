import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const AdminLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-admin-950 text-admin-100">
      <AdminSidebar />
      <div className="flex-grow flex flex-col min-w-0">
        <AdminHeader title={title} />
        <main className="p-8 flex-grow overflow-auto">{children}</main>
      </div>
    </div>
  );
};
