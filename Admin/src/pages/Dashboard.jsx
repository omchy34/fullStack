import React, { useEffect, useState } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Example cards */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl">$12345</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">567</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl"> </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl"></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
