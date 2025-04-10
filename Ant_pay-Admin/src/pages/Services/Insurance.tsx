import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import healthInsuranceLogo from '../../Assets/InsuranceLogo/health-insurance.png';
import twoWheelerInsuranceLogo from '../../Assets/InsuranceLogo/two-wheeler-insurance.png';
import carInsuranceLogo from '../../Assets/InsuranceLogo/car-insurance.png';
import termInsuranceLogo from '../../Assets/InsuranceLogo/term-insurance.png';
import otherInsuranceLogo from '../../Assets/InsuranceLogo/other-insurance.png';

const Insurance = () => {
  // temporary static services data
    const insuranceServices = [
     {
       id: 1,
       serviceName: 'HEALTH',
       logo: healthInsuranceLogo,
     },
     {
       id: 2,
       serviceName: 'TWO WHEELER',
       logo: twoWheelerInsuranceLogo,
     },
     {
       id: 3,
       serviceName: 'CAR',
       logo: carInsuranceLogo,
     },
     {
       id: 4,
       serviceName: 'TERM PLAN',
       logo: termInsuranceLogo,
     },
     {
       id: 5,
       serviceName: 'OTHERS',
       logo: otherInsuranceLogo,
     },
   ];
   return (
     <>
       <Breadcrumb pageName="Insurance" />
 
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
             {Array.isArray(insuranceServices) &&
               insuranceServices.map((data, index) => {
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
                               className="w-10 h-10 hover:w-22 hover:h-15 rounded transition-all duration-200"
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
                slider.scrollBy({left : 200, behavior: 'smooth' });
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

export default Insurance