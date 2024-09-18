export default function Contact() {
  return(
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-green-400 to-green-600 py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Get in Touch</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-8 mx-auto">
            <div className="bg-green-100 p-6 rounded-lg shadow-md border-2 border-green-200 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Address</h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                San Roque St. Cor Kagitingan Ext<br />
                Tondo Manila, Manila, Philippines
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-300 px-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Phone</h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                Ermel Burca<br />
                +63 916 698 6880<br /><br />
                <span className="text-gray-600">or Viber</span><br /><br />
                Apply Joy Ruben<br />
                +63 945 463 331
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md border-2 border-gray-300 px-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Email</h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                brgy20zone2dist1manila@gmail.com<br /><br />
                <span className="text-gray-600">or you can message us on Facebook</span><br /><br />
                <a href="https://www.facebook.com/BarangatBenteSipagatGaling" className="text-blue-600 hover:underline text-base md:text-lg font-semibold" target="_blank" rel="noopener noreferrer">
                  𝑩𝒂𝒓𝒂𝒏𝒈𝒂𝒚 𝑩𝒆𝒏𝒕𝒆 𝑺𝒊𝒑𝒂𝒈 𝒂𝒕 𝑮𝒂𝒍𝒊𝒏𝒈
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}