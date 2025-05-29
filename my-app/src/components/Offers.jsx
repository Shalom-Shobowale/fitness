const Offers = () => {
  return (
    <div className="w-full bg-secondary md:pt-0 pt-10 flex items-center ">
      <div className="md:pl-36 md:px-0 px-3 flex md:flex-row flex-col items-center gap-8">
        <div className="md:w-[45%] text-white">
          <h1 className="font-extrabold text-[2.7em] leading-[1.2]">
            The Fitness You Will <br className="hidden lg:block" />
            Enjoy With Our Workout
          </h1>
          <img src="circle-line-w.webp" alt="" className="mt-3 mb-4 md:mb-9" />
          <p className="text-[14px] leading-[27px]">
            Integer auctor est nec semper hendrerit. Etiam sollicitudin enim in
            urna commodo, in dapibus velit elementum. Ut congue nisl sapien, vel
            ultricies nulla tincidunt vitae. Maecenas non ligula quis massa
            consequat commodo eleifend ut velit.
          </p>
          <p className="text-[14px] leading-[27px] mt-5">
            Aenean eleifend est eget eros molestie pretium. Curabitur varius
            velit in est elementum consectetur. Mauris in risus bibendum,
            laoreet ex at, lobortis risus. Nullam id massa eget ante finibus
            iaculis. Duis eget nisl ipsum. Vivamus ipsum urna, tristique vel
            arcu nec, elementum congue est. Nullam vitae aliquet turpis.
          </p>
        </div>
        <div className="md:w-[55%] relative">
          <img
            src="video-img.webp"
            alt=""
            className="w-full h-[50vh] md:h-[75vh]"
          />
          <a
            href="https://www.youtube.com/watch?v=vKSA_idPZkc"
            className="video-i popup-video absolute top-[40%] left-[40%]"
          >
            {" "}
            <img src="play-icon.webp" alt="img" className="active-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Offers;
