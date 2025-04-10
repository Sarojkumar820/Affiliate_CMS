import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import idfcLogo from "../../Assets/BankLogos/idfc-bank.png"
import hdfcLogo from "../../Assets/BankLogos/hdfc-bank.png";
import kotakLogo from "../../Assets/BankLogos/kotak-bank.png";
import AuLogo from "../../Assets/BankLogos/ausmall-finance-bank.png";
import axisLogo from "../../Assets/BankLogos/axis-bank.png";

const CreditCards = () => {
   // temporary static services data
   const CreditCardServices = [
    {
      id: 1,
      serviceName: 'IDFC BANK',
      logo: idfcLogo,
    },
    {
      id: 2,
      serviceName: 'HDFC BANK',
      logo: hdfcLogo,
    },
    {
      id: 3,
      serviceName: 'KOTAK BANK',
      logo: kotakLogo,
    },
    {
      id: 4,
      serviceName: 'AU BANK',
      logo: AuLogo,
    },
    {
      id: 5,
      serviceName: 'AXIS BANK',
      logo: axisLogo,
    },
    // {
    //   id: 6,
    //   serviceName: 'Mortgage Loan',
    //   logo: mortgageLoan,
    // },
  ];
  return (
    <>
      <Breadcrumb pageName="Credit Card" />

      <section className="p-4 ">
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-900 p-2 rounded-full shadow-md hover:bg-gray-200 transition-all sm:hidden"
            style={{left: "-20px"}}
            onClick={() => {
              const slider = document.getElementById('slider') as HTMLElement;
              if (slider) {
                slider.scrollBy({ left: -200, behavior: 'smooth' });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <ul
            id="slider"
            className="flex gap-6 overflow-x-auto scroll-snap-x-mandatory snap-x scrollbar-hide"
          >
            {Array.isArray(CreditCardServices) &&
              CreditCardServices.map((data, index) => {
                return (
                  <div>
                    <li key={index}>
                      <a
                        href="https://eliteai.tools/category/productivity"
                        data-clickable="Category:20:category-card"
                        className="block h-full transition-all duration-200 hover:ring-green-500/20"
                      >
                        <div className="flex flex-col items-center p-4">
                          <div className="flex items-center justify-center flex-shrink-0 w-14 h-14 transition-colors duration-200 rounded">
                            <img
                              src={data.logo}
                              alt={data.serviceName}
                              className="w-20 h-20 hover:w-25 hover:h-25 rounded transition-all duration-200"
                            />
                          </div>

                          <div className="flex-grow mt-4 text-center">
                            <h3 className="text-sm font-semibold text-gray-900 transition-colors duration-200 group-hover:text-green-600  dark:text-white">
                              {data.serviceName}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </li>
                  </div>
                );
              })}
          </ul>
          {/* Right Arrow Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-900 p-2 rounded-full shadow-md hover:bg-gray-200 transition-all sm:hidden"
            style={{right: "-20px"}}
            onClick={() => {
              const slider = document.getElementById('slider') as HTMLElement;
              if (slider) {
                slider.scrollBy({ left: 200, behavior: 'smooth' });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}

export default CreditCards