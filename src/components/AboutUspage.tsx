import img from '../assets/images/gehlert-852762_1280 (1).jpg'

const AboutUsPage = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">About Car Doctor</h1>

        {/* Company Overview Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">Company Overview</h2>
          <p className="text-gray-400 leading-relaxed">
            Car Doctor was established with the vision of offering comprehensive car care services. 
            Our mission is to provide high-quality maintenance and repair services that keep your vehicle in optimal condition. 
            Whether you need regular maintenance or emergency repairs, Car Doctor is here to help.
          </p>
        </div>

        {/* Team Introduction Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src={img} alt="CEO" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-blue-400">John Doe</h3>
              <p className="text-gray-400">CEO & Founder</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src={img} alt="CTO" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-blue-400">Jane Smith</h3>
              <p className="text-gray-400">Chief Technical Officer</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src={img} alt="COO" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-blue-400">Mike Johnson</h3>
              <p className="text-gray-400">Chief Operations Officer</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src={img} alt="Service Manager" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-blue-400">Emily Davis</h3>
              <p className="text-gray-400">Service Manager</p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">Customer Testimonials</h2>
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-400">
                "Car Doctor has been a lifesaver for my vehicle. Their team is professional, efficient, and always goes the extra mile!"
              </p>
              <h4 className="mt-4 text-blue-400 font-semibold">- Sarah Williams</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-400">
                "I trust Car Doctor with all my car repairs. Their expertise and dedication to quality make them my go-to service center."
              </p>
              <h4 className="mt-4 text-blue-400 font-semibold">- James Anderson</h4>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">Contact Information</h2>
          <p className="text-gray-400 leading-relaxed">
            We are always here to help! If you have any questions or need assistance, feel free to contact us:
          </p>
          <ul className="mt-4 text-gray-400">
            <li>Email: <a href="mailto:info@cardoctor.com" className="text-blue-400">info@cardoctor.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-blue-400">+123 456 7890</a></li>
            <li>Address: 1234 Auto Lane, Motor City, Carland</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
