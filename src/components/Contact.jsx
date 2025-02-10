import React from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component

const Contact = () => {
  const contacts = [
    {
      imgSrc: 'src/assets/pragyan.png',
      email: 'ptmaharjan@gmail.com',
      phone: '9808834446',
      post: 'Manager'
    },
    {
      imgSrc: 'src/assets/aasis.png',
      email: 'aashishshresth123@gmail.com',
      phone: '9842748191',
      post: 'Assistant Manager'
    },
    {
      imgSrc: 'src/assets/utsav.png',
      email: 'utsav78@gmail.com',
      phone: '9761814911',
      post: 'Zookeeper'
    },
    {
      imgSrc: 'src/assets/bhogendra.png',
      email: 'dasbhogendra@gmail.com',
      phone: '123-456-7893',
      post: 'Veterinarian'
    },
    {
      imgSrc: 'src/assets/sailesh.png',
      email: 'saileshtamang909@gmail.com',
      phone: '9845351587',
      post: 'Tour Guide'
    }
  ];

  return (
    <div className="bg-yellow-100 min-h-screen"> {/* Set background color and minimum height */}
      <Navbar /> {/* Include the Navbar component */}
      <div className="max-w-4xl mx-auto p-8 text-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contacts.map((contact, index) => (
            <div key={index} className="text-center">
              <img
                src={contact.imgSrc}
                alt={`Contact ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold">{contact.post}</p>
              <p className="text-sm">Email: {contact.email}</p>
              <p className="text-sm">Phone: {contact.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;