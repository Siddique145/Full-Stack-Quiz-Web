// import React, { useState } from "react";
// import emailjs from "emailjs-com";
// import { frameData } from "framer-motion";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [status, setStatus] = useState("");
//   const [isSending, setIsSending] = useState(false); // Button loading state

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const sendEmail = (e) => {
//     e.preventDefault();
//     setIsSending(true);
//     setStatus("Sending...");

//     // Prepare template parameters
//     const templateParams = {
//       to_name: "Admin",
//       from_name: formData.name,
//       from_email: formData.email, // ✅ Correct email field
//       message: (formData.message+ frameData.email),
//     };

//     console.log("Sending email with params:", templateParams); // Debugging log

//     emailjs
//       .send(
//         "service_dae5m6d", // Replace with your actual service ID
//         "template_xw0mdan", // Replace with your template ID
//         templateParams,
//         "0g4UYVz92ah8TDcSf" // Replace with your user ID
//       )
//       .then(
//         (response) => {
//           console.log("Email sent successfully!", response);
//           setStatus("Message sent successfully!");
//           setFormData({ name: "", email: "", message: "" }); // Reset form
//         },
//         (error) => {
//           console.error("Failed to send email.", error);
//           setStatus("Failed to send message. Try again.");
//         }
//       )
//       .finally(() => setIsSending(false)); // Reset loading state
//   };

//   return (
//     <section id="contact" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
//           Contact Us
//         </h2>
//         <div className="max-w-2xl mx-auto bg-purple-100 p-6 rounded-lg shadow-md">
//           <form className="space-y-4" onSubmit={sendEmail}>
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-purple-700"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50 p-2"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-purple-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50 p-2"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium text-purple-700"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={4}
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50 p-2"
//               ></textarea>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 transition"
//                 disabled={isSending}
//               >
//                 {isSending ? "Sending..." : "Send Message"}
//               </button>
//             </div>
//           </form>
//           {status && (
//             <p className="text-center text-purple-800 mt-4">{status}</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;



import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false); // Button loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("Sending...");

    // Correct message format including name, email, and message
    const templateParams = {
      to_name: "Admin",
      from_name: formData.name,
      from_email: formData.email,
      message: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    };

    console.log("Sending email with params:", templateParams);

    emailjs
      .send(
        "service_dae5m6d", // Replace with your actual service ID
        "template_xw0mdan", // Replace with your template ID
        templateParams,
        "0g4UYVz92ah8TDcSf" // Replace with your user ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          console.error("Failed to send email.", error);
          setStatus("Failed to send message. Try again.");
        }
      )
      .finally(() => setIsSending(false)); // Reset loading state
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Contact Us
        </h2>
        <div className="max-w-2xl mx-auto bg-purple-100 p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={sendEmail}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-purple-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-purple-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-purple-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50 p-2"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 transition"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {status && (
            <p className="text-center text-purple-800 mt-4">{status}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
