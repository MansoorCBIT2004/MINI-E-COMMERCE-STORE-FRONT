import React from 'react';

const Home = ({ onCategorySelect }) => {
  return (
    <>
      <div className="relative bg-yellow-400 h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 flex items-center">
          <div className="w-1/2">
            <p className="uppercase text-lg font-semibold mb-2">UP TO 15% DISCOUNT</p>
            <h1 className="text-7xl font-bold mb-6 leading-tight">
              Checkout The <br /> Best Fashion <br /> Style
            </h1>
            <button className="border border-black px-6 py-2 rounded hover:bg-black hover:text-yellow-400 transition" onClick={() => onCategorySelect('Mens')}>
              SHOP NOW
            </button>
          </div>
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=90"
              alt="Fashion Model"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="bg-white py-12 w-full">
        <div className="w-full mx-auto px-0">
          <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dt4jbudw8/image/upload/v1757754616/Screenshot_2025-09-13_143841_yegtt8.png"
                alt="Category 1"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 text-center">
                <button
                onClick={() => onCategorySelect('Mens')}
                  className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dt4jbudw8/image/upload/v1757755411/Screenshot_2025-09-13_145023_kfejdi.png"
                alt="Category 2"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 text-center">
                <button
                onClick={() => onCategorySelect('Women')}
                  className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dt4jbudw8/image/upload/v1757756181/Screenshot_2025-09-13_150534_rwe9ha.png"
                alt="Category 3"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 text-center">
                <button
                onClick={() => onCategorySelect('Kids')}
                  className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
