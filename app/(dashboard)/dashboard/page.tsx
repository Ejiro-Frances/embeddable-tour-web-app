import DashboardTitle from "../_components/dashboard-title";
import TourStatsCard from "../_components/tour-stats-card";
import TourChart from "../_components/tour-chart";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Dashboard"
        description="Welcome to your dashboard"
      />

      {/* stat cards */}
      <TourStatsCard />

      {/* chart */}
      <TourChart />
    </div>
  );
};

export default Dashboard;
