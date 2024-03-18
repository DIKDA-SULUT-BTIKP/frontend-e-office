import DivisionLayout from "../../layout/DivisionLayout";

const DashboardDivisionPage = () => {
  return (
    <DivisionLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-10 shadow">
          <p className="text-4xl font-bold">10</p>
          <h4 className="text-2xl">Belum Proses</h4>
        </div>
        <div className="p-10 shadow">
          <p className="text-4xl font-bold">10</p>
          <h4 className="text-2xl">Proses</h4>
        </div>
        <div className="p-10 shadow">
          <p className="text-4xl font-bold">10</p>
          <h4 className="text-2xl">Selesai Proses</h4>
        </div>
      </div>
    </DivisionLayout>
  );
};

export default DashboardDivisionPage;
