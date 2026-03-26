"use client";

interface DashboardProps {
  updatePublicParams: (key: string, value: string) => void;
  sort: string | undefined;
}

const Dashboard = ({ updatePublicParams, sort }: DashboardProps) => {
  return (
    <div className="max-w-7xl mx-auto my-4">
      <div className="flex justify-between items-center">
        {/* Filters */}
        <div className="flex items-center">
          {/* тут: ценовой диапазон, и из атрибутов */}
        </div>

        {/* Sort */}
        <select
          value={sort || ""}
          onChange={(e) => updatePublicParams("sort", e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg cursor-pointer transition"
        >
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Dashboard;
