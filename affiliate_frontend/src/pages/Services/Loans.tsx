import Slider from 'react-slick';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import homeLoan from '../../Assets/Icons/home-loan_18495113.png';
import businessLoan from '../../Assets/Icons/business-loan_12139783.png';
import carLoan from '../../Assets/Icons/car-loan.png';
import educationLoan from '../../Assets/Icons/education.png';
import personalLoan from '../../Assets/Icons/personal-loan.png';
import mortgageLoan from '../../Assets/Icons/mortgage-loan_7252446.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type ArrowProps = {
  onClick?: () => void;
};

// Custom Arrow Components
const NextArrow = ({ onClick }: ArrowProps) => (
  <div
    className="absolute right-2 top-1/2 z-10 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const PrevArrow = ({ onClick }: ArrowProps) => (
  <div
    className="absolute left-2 top-1/2 z-10 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

const Loans = () => {
  const loanServices = [
    { id: 1, serviceName: 'Home Loan', logo: homeLoan },
    { id: 2, serviceName: 'Business Loan', logo: businessLoan },
    { id: 3, serviceName: 'Car Loan', logo: carLoan },
    { id: 4, serviceName: 'Education Loan', logo: educationLoan },
    { id: 5, serviceName: 'Personal Loan', logo: personalLoan },
    { id: 6, serviceName: 'Mortgage Loan', logo: mortgageLoan },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <Breadcrumb pageName="Loans" />
      <section className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 relative">
        <Slider {...settings}>
          {loanServices.map((data) => (
            <div key={data.id} className="px-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <img
                    src={data.logo}
                    alt={data.serviceName}
                    className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                  {data.serviceName}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Loans;
