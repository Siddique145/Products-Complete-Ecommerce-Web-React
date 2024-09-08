import React from "react";

function Gallery() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            Fashion & Accessories Gallery
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Explore our gallery featuring a curated selection of men's clothing, shoes, and accessories.
          </p>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="men's clothing"
                className="w-full object-cover h-full object-center block"
                src="https://m.media-amazon.com/images/I/71MO6KALTlL._AC_UL480_FMwebp_QL65_.jpg"
                // src="https://images.unsplash.com/photo-1571607383290-d90d93d03ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDJ8fG1lbidzJTIwY2xvdGhpbmclMkNwYWxldHRvfGVufDB8fHx8MTYwODg3NzM2&ixlib=rb-1.2.1&q=80&w=400"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="men's shoes"
                className="w-full object-cover h-full object-center block"
                src="https://m.media-amazon.com/images/I/513RCvXQbIL._AC_UL480_FMwebp_QL65_.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img
                
                // src="https://m.media-amazon.com/images/I/516WN9EwVzL._AC_UL480_FMwebp_QL65_.jpg"
                // src="https://images.unsplash.com/photo-1587882125352-f07f2ef5ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDF8fG1lbidzJTIwc3Vub2dsYXNzZXxlbnwwfHx8fDE2MDg4NzM2&ixlib=rb-1.2.1&q=80&w=800"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                

                // src="https://images.unsplash.com/photo-1569904516-60c51b124c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDcyfHxtZW4ncyUyMGNsb3RoaW5nfGVufDB8fHx8MTYwODg3NzM2&ixlib=rb-1.2.1&q=80&w=800"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="men's shoes"
                className="w-full object-cover h-full object-center block"
                src="https://m.media-amazon.com/images/I/81EpaYPq2HL._AC_UL480_FMwebp_QL65_.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="men's accessories"
                className="w-full object-cover h-full object-center block"
                src="https://m.media-amazon.com/images/I/61ECvCbRZeL._AC_UL480_FMwebp_QL65_.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
