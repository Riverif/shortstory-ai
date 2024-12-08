const AboutPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[600px]">
        <h1 className="text-4xl">About The Creator</h1>
        <p className="whitespace-pre-wrap">
          {`
Hi, my name is Rifki Alfian Nahar. I have been a Next.js developer for one year, specializing in creating fast, scalable, and user-friendly websites. I am passionate about leveraging modern technologies to bring innovative ideas to life.

One of my recent projects is a website dedicated to short storytelling, built with the integration of Gemini AI. The platform allows users to generate captivating short stories effortlessly by providing a simple prompt. It caters to creative minds and enthusiasts who enjoy exploring imaginative tales, making storytelling accessible and fun.

The website was created using Next.js as the foundation, ensuring top-notch performance and seamless navigation. I integrated Gemini AI to handle the story-generation capabilities, enabling high-quality and engaging outputs. With a responsive design and intuitive user interface, the project showcases my ability to combine technology and creativity effectively.

Thank you for taking the time to learn about my work. I am always excited to share my projects and look forward to creating even more impactful websites in the future.
`}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
