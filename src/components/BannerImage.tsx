import Image from 'next/image';

const BannerImage = () => {
  const bannerImageUrl = 'https://res.cloudinary.com/dcb0gkhfv/image/upload/v1743707702/Screenshot_2025-04-03_at_9.14.14_PM_jdss64.jpg';

  return (
    <div className="w-full h-48 md:h-64 lg:h-80 relative overflow-hidden">
      <Image
        src={bannerImageUrl}
        alt="Educational Immersive Tools Banner"
        fill // Replaces layout="fill"
        className="object-cover" // Replaces objectFit="cover"
        priority // Load the banner image quickly
      />
      {/* Optional: Add an overlay or text on top of the banner */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">XR Tools Directory</h1>
      </div> */}
    </div>
  );
};

export default BannerImage;
