import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import homeLoan from '../../Assets/Icons/home-loan_18495113.png';
import businessLoan from '../../Assets/Icons/business-loan_12139783.png';
import carLoan from '../../Assets/Icons/car-loan.png';
import educationLoan from '../../Assets/Icons/education.png';
import personalLoan from '../../Assets/Icons/personal-loan.png';
import mortgageLoan from '../../Assets/Icons/mortgage-loan_7252446.png';

const Loans = () => {
  // temporary static services data
  const loanServices = [
    {
      id: 1,
      serviceName: 'Home Loan',
      logo: homeLoan,
    },
    {
      id: 2,
      serviceName: 'Business Loan',
      logo: businessLoan,
    },
    {
      id: 3,
      serviceName: 'Car Loan',
      logo: carLoan,
    },
    {
      id: 4,
      serviceName: 'Education Loan',
      logo: educationLoan,
    },
    {
      id: 5,
      serviceName: 'Personal Loan',
      logo: personalLoan,
    },
    {
      id: 6,
      serviceName: 'Mortgage Loan',
      logo: mortgageLoan,
    },
  ];
  return (
    <>
      <Breadcrumb pageName="Loans" />

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
            {Array.isArray(loanServices) &&
              loanServices.map((data, index) => {
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
                              className="w-10 h-10 hover:w-15 hover:h-15 rounded transition-all duration-200"
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
};

export default Loans;
