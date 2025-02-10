// import React from "react";
// import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon

// const Footer = () => {
//   return (
//     <footer className="bg-purple-800 text-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-purple-200">MDCAT PREPARATION SINDH</h3>
//             <p className="text-sm text-gray-300">
//               Empowering future medical professionals with comprehensive MDCAT preparation.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-purple-200">Quick Links</h4>
//             <ul className="space-y-2">
//               {["Home", "About", "Contact"].map((item, index) => (
//                 <li key={index}>
//                   <a href={item === "Home" ? "/" : `#${item.toLowerCase()}`} className="hover:text-purple-400 transition">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-purple-200">Resources</h4>
//             <ul className="space-y-2">
//               {["Study Tips", "Blog"].map((item, index) => (
//                 <li key={index}>
//                   <a href="https://mdcatpreparationsindh.blogspot.com/2025/02/how-to-study-effectively-for-mdcat.html" className="hover:text-purple-400 transition">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-purple-200">Connect with Us</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="https://whatsapp.com/channel/0029Vb5GpYP1dAwAAgicUx2u" // Replace with your actual WhatsApp community link
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center space-x-2 hover:text-purple-400 transition"
//                 >
//                   <FaWhatsapp className="text-green-400 text-xl" /> {/* WhatsApp Icon */}
//                   <span>Follow on WhatsApp Channel for updates </span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t border-purple-600 text-center text-gray-300">
//           <p>&copy; {new Date().getFullYear()} <span className="text-purple-300 font-semibold">MDCAT PREPARATION SINDH</span>. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon

const Footer = () => {
  const whatsappLink = "https://whatsapp.com/channel/0029Vb5GpYP1dAwAAgicUx2u"; // Your WhatsApp channel link

  const handleWhatsAppRedirect = () => {
    const mobileWhatsAppLink = `whatsapp://send?text=Join%20this%20MDCAT%20Preparation%20Sindh%20WhatsApp%20Channel%20for%20updates!%20${whatsappLink}`;
    
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      window.location.href = mobileWhatsAppLink; // Opens WhatsApp app if installed
    } else {
      window.open(whatsappLink, "_blank"); // Opens in a new tab on desktops
    }
  };

  return (
    <footer className="bg-purple-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-200">MDCAT PREPARATION SINDH</h3>
            <p className="text-sm text-gray-300">
              Empowering future medical professionals with comprehensive MDCAT preparation.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-200">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Contact"].map((item, index) => (
                <li key={index}>
                  <a href={item === "Home" ? "/" : `#${item.toLowerCase()}`} className="hover:text-purple-400 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-200">Resources</h4>
            <ul className="space-y-2">
              {["Study Tips", "Blog"].map((item, index) => (
                <li key={index}>
                  <a
                    href="https://mdcatpreparationsindh.blogspot.com/2025/02/how-to-study-effectively-for-mdcat.html"
                    className="hover:text-purple-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-200">Connect with Us</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex items-center space-x-2 hover:text-purple-400 transition"
                >
                  <FaWhatsapp className="text-green-400 text-xl" />
                  <span>Follow on WhatsApp Channel for updates</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-600 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} <span className="text-purple-300 font-semibold">MDCAT PREPARATION SINDH</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
