import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Package } from '../../types/package';

const TransactionHistory = () => {
  const packageData: Package[] = [
    {
      date: 'Jan 13,2023',
      customerName: 'saurabh',
      contact: '1234567890',
      email: 'admin@gmail.com',
      product: '1234567890',
      subCategory: '1234567890',
      status: 'Paid',
      amount: '5000',
      earning: '',
    },
    {
      date: 'Jan 13,2023',
      customerName: 'saurabh',
      contact: '1234567890',
      email: 'admin@gmail.com',
      product: '1234567890',
      subCategory: '1234567890',
      status: 'Paid',
      amount: '5000',
      earning: '',
    },
    {
      date: 'Jan 13,2023',
      customerName: 'saurabh',
      contact: '1234567890',
      email: 'admin@gmail.com',
      product: '1234567890',
      subCategory: '1234567890',
      status: 'Paid',
      amount: '5000',
      earning: '',
    },
    {
      date: 'Jan 13,2023',
      customerName: 'saurabh',
      contact: '1234567890',
      email: 'admin@gmail.com',
      product: '1234567890',
      subCategory: '1234567890',
      status: 'Paid',
      amount: '5000',
      earning: '',
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Transaction History" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto hidden sm:table">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Date
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Customer Name
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Contact
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Email
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Product
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Sub Category
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Amount
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Make Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {packageData.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.date}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.customerName}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.contact}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.email}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.product}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.subCategory}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          packageItem.status === 'Paid'
                            ? 'bg-success text-success'
                            : packageItem.status === 'Unpaid'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {packageItem.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.amount}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View - Card View */}
            <div className="sm:hidden">
              {packageData.map((packageItem, key) => (
                <div
                  key={key}
                  className="mb-6 rounded-lg border border-[#eee] bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Transaction #{key + 1}
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Customer Name:
                      </span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Contact:</span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.contact}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Product:</span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.product}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Sub Category:
                      </span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.subCategory}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span
                        className={`text-sm font-medium ${
                          packageItem.status === 'Paid'
                            ? 'text-success'
                            : packageItem.status === 'Unpaid'
                            ? 'text-danger'
                            : 'text-warning'
                        }`}
                      >
                        {packageItem.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm text-black dark:text-white">
                        {packageItem.amount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
