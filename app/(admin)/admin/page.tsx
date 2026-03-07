" use client";
import { GoPackage } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";

import AlertRow from "@/features/admin/dashboard/AlertRow";
import StatCard from "@/features/admin/dashboard/StatCard";

export default function Dashboard() {
  return (
    <div className="max-w-7xl flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value="1,284"
          change="+12 new this month"
          changeType="up"
          icon={<GoPackage className="h-6 w-6" />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Orders"
          value="8,492"
          change="+8.2% increase"
          changeType="up"
          icon={<FiShoppingCart className="h-6 w-6" />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Revenue"
          value="$94,210"
          change="+5.1% increase"
          changeType="up"
          icon={<FaDollarSign className="h-6 w-6" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Orders Today"
          value="143"
          change="-3.4% decrease"
          changeType="down"
          icon={<FaRegClock className="h-6 w-6" />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-200">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="h-5 w-5 text-yellow-500" />
              <h2 className="text-base font-semibold text-foreground">
                Low Stock Alerts
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                5 items
              </span>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
              View all
            </button>
          </div>
          <div className="px-6 py-2">
            <AlertRow
              product="Wireless Headphones Pro"
              sku="WHP-001"
              stock={0}
              threshold={10}
            />
            <AlertRow
              product="USB-C Hub 7-in-1"
              sku="UCH-007"
              stock={3}
              threshold={15}
            />
            <AlertRow
              product="Mechanical Keyboard TKL"
              sku="MKT-082"
              stock={5}
              threshold={20}
            />
            <AlertRow
              product="Laptop Stand Aluminum"
              sku="LSA-034"
              stock={7}
              threshold={25}
            />
            <AlertRow
              product="Webcam 4K Ultra"
              sku="WCU-019"
              stock={2}
              threshold={10}
            />
          </div>
        </div>

        <div className="bg-card border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-200">
            <div className="flex items-center gap-2">
              <FaArrowTrendUp className="h-5 w-5 text-green-500" />
              <h2 className="text-base font-semibold text-foreground">
                Performance Overview
              </h2>
            </div>
          </div>
          <div className="px-6 py-4 space-y-4">
            {/* Metric rows */}
            <div className="flex items-center justify-between py-2 border-b border-b-gray-200">
              <span className="text-sm text-muted-foreground">
                Avg. Order Value
              </span>
              <span className="text-sm font-semibold text-foreground">
                $112.40
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-b-gray-200">
              <span className="text-sm text-muted-foreground">
                Conversion Rate
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  3.6%
                </span>
                <span className="text-xs text-green-600 font-medium">
                  ↑ 0.4%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-b-gray-200">
              <span className="text-sm text-muted-foreground">
                Active Users
              </span>
              <span className="text-sm font-semibold text-foreground">
                2,841
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-b-gray-200">
              <span className="text-sm text-muted-foreground">
                Pending Orders
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  38
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Needs attention
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Return Rate</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  1.2%
                </span>
                <span className="text-xs text-green-600 font-medium">
                  ↓ 0.1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
