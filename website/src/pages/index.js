import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Hey there Fellow Jitster!</>,
    imageUrl: "img/undraw_code_review.svg",
    description: (
      <>
        Jitsi Meet is a set of Open Source projects which empower users to
        deploy secure, scalable and easy to use video conferencing platforms
        with state-of-the-art video quality and features.

        <br/><br/>

        On This site you'll find documentation for all your Jitsi needs.

        <br /><br/>

        Get started <a href="docs/intro">here</a>.
      </>
    ),
  },
  {
    title: <>Batteries included</>,
    imageUrl: "img/undraw_real_time_sync.svg",
    description: (
      <>
        Jitsi Meet supports all common browsers and also mobile devices.
        
        <br /><br />

        Our APIs allow developers to easily integrate Jitsi Meet into existing
        applications, whether those are web based or native mobile apps.
        
        <br /><br />
        
        You can use our freely available instance at{" "}
        <a href="https://meet.jit.si" target="_blank">
          meet.jit.si
        </a>{" "}
        or self-host it yourself using our readily available Debian packages or
        comprehensive Docker setup.
      </>
    ),
  },
  {
    title: <>JaaS: Jitsi as a Service</>,
    imageUrl: "img/undraw_going_up.svg",
    description: (
      <>
        Looking for configuration flexibility without the complexity of
        self-hosting and scalability management?
        
        <br /><br />
        
        Look no further than JaaS. 8x8 Jitsi as a Service (JaaS) is
        an enterprise-ready video meeting platform that allows developers,
        organizations and businesses to easily build and deploy video
        solutions. With Jitsi as a Service we now give you all the power of
        Jitsi running on our global platform so you can focus on building secure
        and branded video experiences.
        
        <br /><br />
        Check JaaS out{" "}
        <a href="https://jaas.8x8.vc" target="_blank">
          here
        </a>
        .
      </>
    ),
  },
];

function VideoContainer() {
  return (
    <div className="container text--center margin-bottom--xl margin-top--lg">
      <div className="row">
        <div className="col">
          <h2>What is Jitsi?</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/TB7LlM4erx8"
            title="What is Jitsi?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Jitsi Meet"
      description="State-of-the-art video conferencing you can self-host."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--secondary button--lg",
                styles.getStarted
              )}
              to={"docs/intro"}
            >
              Get started!
            </Link>
          </div>
        </div>
      </header>
      <main>
        <VideoContainer />
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div key={idx} className={clsx("col col--4", styles.feature)}>
                    {imageUrl && (
                      <div className="text--center margin-bottom--lg">
                        <img
                          className={styles.featureImage}
                          src={useBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
