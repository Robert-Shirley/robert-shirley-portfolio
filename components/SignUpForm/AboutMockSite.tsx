const styles = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-bold lg:text-4xl",
  h3: "scroll-m-20 text-2xl font-semibold lg:text-3xl",
  h4: "scroll-m-20 text-xl font-medium lg:text-2xl",
};

const AboutMockSite = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1 className={styles.h1}>Welcome to TechTrailblaze</h1>
      <p className="mt-8">
        TechTrailblaze is your gateway to the cutting edge of innovation. We
        empower startups and tech enthusiasts by providing insights, resources,
        and tools to navigate the ever-evolving technology landscape. Join us as
        we explore the trends, breakthroughs, and opportunities shaping the
        future of tech. Together, we can blaze a trail to a brighter tomorrow.
      </p>
    </div>
  );
};

export default AboutMockSite;
