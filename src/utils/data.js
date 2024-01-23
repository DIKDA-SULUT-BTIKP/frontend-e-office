function generateDummyData(numRows) {
  const data = [];
  const statuses = ["Pending", "Approved", "Rejected"];
  const disposisiOptions = ["Forwarded", "Reviewed", "Not Reviewed"];
  const actions = ["Edit", "Delete", "View"];

  for (let i = 1; i <= numRows; i++) {
    const row = {
      No: i,
      "Nomor Surat": `SURAT-${i}`,
      Surat: {
        type: "Customer",
        label: "Content curating app",
        description: "Brings all your news into one place",
      },
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      "Disposisi Terakhir":
        disposisiOptions[Math.floor(Math.random() * disposisiOptions.length)],
      Action: actions[Math.floor(Math.random() * actions.length)],
    };
    data.push(row);
  }

  return data;
}

export const dummyData = generateDummyData(10); // Change 10 to the number of rows you want
